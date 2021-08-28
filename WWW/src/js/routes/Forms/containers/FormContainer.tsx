import * as React from 'react'
import { compose } from 'redux'
import { formValueSelector } from 'redux-form'
import { connect } from 'react-redux'
import { Form as FormComponent } from '../components/Form'
import {
    AutoSaveForm,
    getFormValues,
    prepareAutoSaveForm,
} from '../../../utils/forms/auto-save'
import { http } from '../../../modules/http'

export const FORM_NAME = 'sample-form'

interface FormComponentContainerProps {
    component(): any
}

// here is Form container, it has redux-form props from `reduxForm` factory and it separates API class from
// FormComponent presentation
class FormComponentContainer extends React.Component<FormComponentContainerProps> {
    someMethod(prop) {
        // has redux-forms and own props
    }

    render() {
        const { component: ChildComponent, ...props } = this.props // presentation component - form with FormFields

        return (
            <ChildComponent
                {...props}
                someMethod={this.someMethod.bind(this)}
            />
        )
    }
}

const FormContainer = compose(
    connect((state, props) => {
        const selector = formValueSelector(FORM_NAME)
        const data = getFormValues(FORM_NAME, state)

        return {
            initialValues: {
                text_1: null,
                number_1: null,
                select_1: null,
                checkbox_1: null,
                checkbox_2: null,
                checkbox_3: true,
                radio_1: null,
                radio_2: null,
                radio_3: true,
                textarea_1: null,
            },
            data, // required for autosave
        }
    }),
    prepareAutoSaveForm(FormComponent, {
        name: FORM_NAME,
        save: (name, value, dispatch, props) => {
            // resolved with success and pass data
            // rejected with failure and reject data
            return new Promise((resolve, reject) => {
                http.post('/dummy-url', { [name]: value })
                    .then((response) => {
                        resolve(response['data'])
                    })
                    .catch((error) => {
                        reject(error)
                    })
            })
        },
        container: FormComponentContainer, // container with API logic
    }),
)(AutoSaveForm)

export { FormContainer }
export default { FormContainer }
