import * as React from "react"
import {
    reduxForm,
    getFormValues as getFormValuesRedux,
    SubmissionError,
} from 'redux-form'
import _ from 'lodash'
import { processAPIerrorResponseToFormErrors } from '../../modules/http'
import { ifDeepDiff, deepDiff } from '../javascript'
import * as moment from 'moment'
import { startSubmit, stopSubmit } from 'redux-form'
import config from "../../config";

const TIMEOUT = 1000

export const isFullOfUndefined = (obj) => {
    const length1 = Object.keys(obj)
        .map((key) => obj[key])
        .filter((value) => value === undefined).length
    const length2 = Object.keys(obj).map((key) => obj[key]).length

    return length1 === length2 && length1 > 0
}

interface AutoSaveFormProps {
    data: object;
    component(): any;
    container(): any;
    save(name: string, value: string, dispatch: () => any, props: object): any;
    dispatch(cb: (formName: string) => any): any;
    handleSubmit(callback: () => any): any;
    componentDidMount();
    componentWillUnmount();
    initialValues: object;
    initialize(initialValues: object) : any;
    initialized: boolean;
    formName: string;
}

interface AutoSaveFormState {
    pendingRequests: number;
    requestsToPerform: number;
}

export class AutoSaveForm extends React.Component<AutoSaveFormProps, AutoSaveFormState> {
    timeouts: {}

    errors: {}

    handlers: {}

    autoSaveDisabled: boolean = false

    state = {
        pendingRequests: 0,
        requestsToPerform: 0,
    }

    constructor(props) {
        super(props)

        this.isRequestInProgress = this.isRequestInProgress.bind(this)
    }

    enableAutoSave() {
        this.autoSaveDisabled = false
    }

    disableAutoSave() {
        this.autoSaveDisabled = true
    }

    componentDidMount() {
        const {
            componentDidMount,
            initialValues,
            initialize,
            initialized,
        } = this.props
        const _self = this

        if (_.isFunction(componentDidMount)) {
            componentDidMount({
                subject: {
                    onUnlock: (cb) => (_self.handlers['onUnlock'] = cb),
                    onLock: (cb) => (_self.handlers['onLock'] = cb),
                },
            })
        }

        if (!initialized) {
            this.disableAutoSave()
            initialize(initialValues)
            this.enableAutoSave()
        }
    }

    componentWillUnmount() {
        const { componentWillUnmount } = this.props

        if (_.isFunction(componentWillUnmount)) {
            componentWillUnmount()
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        // will execute on change every field
        const { initialValues, initialize, initialized } = this.props

        if (!initialized) {
            initialize(initialValues)
            return
        }

        const { data: prevData } = prevProps
        const { data: currentData } = this.props

        if (!_.isEmpty(prevData) && !_.isEmpty(currentData)) {
            // data received... (prevProps['data'] can be undefined at initialization)

            if (
                ifDeepDiff(prevData, currentData) &&
                !isFullOfUndefined(prevData)
            ) {
                // form values changed
                const diff = deepDiff(prevData, currentData)

                const newValues = Object.keys(diff).map((key) => {
                    const name = key
                    let value = currentData[key]
                    if (value instanceof moment) {
                        value = value.format(config.apiDateTimeFormat)
                    }

                    delete this.errors[name] // delete validation error since field is updated and the error may not occure

                    return {
                        name,
                        value,
                    }
                })

                this.handleSave(newValues) // save data
            }
        }

        if (
            prevState['requestsToPerform'] !== this.state['requestsToPerform']
        ) {
            if (this.state['requestsToPerform'] === 0) {
                if (_.isFunction(this.handlers['onUnlock'])) {
                    this.handlers['onUnlock']()
                }
            } else {
                if (_.isFunction(this.handlers['onLock'])) {
                    this.handlers['onLock']()
                }
            }
        }
    }

    isRequestInProgress(fieldName) {
        return (
            this.timeouts[fieldName] &&
            this.timeouts[fieldName]['requestInProgress']
        )
    }

    handleSave(newValues, increaseGlobal = true) {
        const { save, dispatch, handleSubmit } = this.props

        if (this.autoSaveDisabled) {
            return
        }

        newValues.forEach(({ name, value }) => {
            let timeout = null
            const newData = {} // one instance in memory (requestInProgress)

            const createTimeout = (increaseLocal) => {
                if (increaseGlobal === true && increaseLocal === true) {
                    this.setState(({ requestsToPerform }) => {
                        return { requestsToPerform: requestsToPerform + 1 }
                    })
                }

                return new Promise((resolve) => {
                    timeout = setTimeout(() => {
                        dispatch(startSubmit(this.props.formName))
                        newData['requestInProgress'] = true // boom

                        this.setState(({ pendingRequests }) => {
                            return { pendingRequests: pendingRequests + 1 }
                        })

                        save(name, value, dispatch, this.props).then(
                            (response) => {
                                // save from `createReduxForm` method
                                dispatch(stopSubmit(this.props.formName))
                                resolve(response)
                            },
                            ({
                                response: { data: { alerts = [] } = {} } = {},
                            } = {}) => {
                                // its a hack for triggering validation errors - handleSubmit is called when the errors occur
                                handleSubmit(() => {
                                    const errors = processAPIerrorResponseToFormErrors(
                                        alerts,
                                    )

                                    if (!_.isEmpty(errors)) {
                                        // save errors for preventing removing errors when next error is triggered
                                        Object.keys(errors).map((fieldName) => {
                                            this.errors[fieldName] =
                                                errors[fieldName]
                                        })
                                    } else {
                                        this.errors[name] = 'Server error.'
                                    }

                                    dispatch(stopSubmit(this.props.formName))
                                    throw new SubmissionError(this.errors) // throw saved errors validation
                                })()
                                dispatch(stopSubmit(this.props.formName))
                                resolve(alerts)
                            },
                        )
                    }, TIMEOUT)
                }).then(() => {
                    this.setState(({ pendingRequests }) => {
                        return { pendingRequests: pendingRequests - 1 }
                    })

                    let onEnd = null
                    if (this.timeouts[name]['onEnd']) {
                        onEnd = this.timeouts[name]['onEnd']
                    }

                    delete this.timeouts[name]

                    if (onEnd) {
                        onEnd() // again
                    } else {
                        this.setState(({ requestsToPerform }) => {
                            return { requestsToPerform: requestsToPerform - 1 }
                        })
                    }
                })
            }

            if (this.timeouts[name]) {
                if (this.timeouts[name]['requestInProgress']) {
                    this.timeouts[name]['onEnd'] = () => {
                        // override onEnd (next) function with currentValues
                        this.handleSave([{ name, value }], false)
                    }
                } else {
                    clearTimeout(this.timeouts[name]['timeout'])
                    delete this.timeouts[name]

                    newData['promise'] = createTimeout(false)
                    newData['timeout'] = timeout

                    this.timeouts[name] = newData
                }
            } else {
                newData['promise'] = createTimeout(true)
                newData['timeout'] = timeout

                this.timeouts[name] = newData
            }
        })
    }

    render() {
        const {
            component: FormComponent,
            container: FormComponentContainer,
        } = this.props

        // it has container with APIClient logic
        if (FormComponentContainer) {
            return (
                <FormComponentContainer
                    {...this.props}
                    component={FormComponent}
                    isRequestInProgress={this.isRequestInProgress}
                />
            )
        }

        // only presentation component
        return (
            <FormComponent
                {...this.props}
                isRequestInProgress={this.isRequestInProgress}
            />
        )
    }
}

/**
 *
 * @param component
 * @param name
 * @param save
 * @param change
 * @param container
 * @param enableReinitialize
 * @returns {*}
 */
export const prepareAutoSaveForm = (
    component,
    { name, save, change, container, enableReinitialize = false } = {},
) => {
    const props = {
        save,
        onChange: change,
        enableReinitialize,
        component,
        container,
        submit: () => null,
    }

    if (name) {
        props['form'] = name
    }

    return reduxForm(props)
}

// helper to get form data
export const getFormValues = (formName, state) => {
    return getFormValuesRedux(formName)(state) || {}
}
