import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames/bind'
import { PageContent } from '../../../layouts/PageLayout/components/index'
import { Button, Col, Row, Tabs } from '../../../components/index'
import styles from '../../../../assets/scss/_helpers.scss'
import styles2 from '../../../../assets/scss/components/_builder.scss'
import { ColPropsFormContainer } from '../forms/ColPropsFormContainer'
import { connect } from 'react-redux'
import { submit } from 'redux-form'
import { FORM_NAME } from '../forms/ColPropsFormContainer'
import { DropTarget } from 'react-dnd'

const cx = classNames.bind({ ...styles, ...styles2 })

class BaseRowComponent extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        const {
            component: Component,
            components,
            renderComponents,
            props,
            addComponent,
            myKey,
            removeComponent,
            dispatch,
        } = this.props

        return (
            <></>
            /*<ModalManager>
                {({ openModal }) => (
                    <Row
                        {...props}
                        builder
                        onClick={(e) => {
                            e.stopPropagation()

                            openModal({
                                title: <div>Add Column</div>,
                                body: ({ close }) => (
                                    <div>
                                        <ColPropsFormContainer
                                            component={props}
                                            addComponent={addComponent}
                                            close={close}
                                            myKey={myKey}
                                        />
                                    </div>
                                ),
                                footer: ({ close }) => [
                                    <Button
                                        color="danger"
                                        onClick={() => {
                                            removeComponent(myKey)
                                            close()
                                        }}
                                        key="danger"
                                    >
                                        Remove Row
                                    </Button>,
                                    <Button
                                        color="success"
                                        onClick={() => {
                                            dispatch(submit(FORM_NAME))
                                        }}
                                        key="success"
                                    >
                                        Add Column
                                    </Button>,
                                ],
                            })

                            return false
                        }}
                    >
                        {renderComponents(components)}
                    </Row>
                )}
            </ModalManager>*/
        )
    }
}

BaseRowComponent.propTypes = {
    component: PropTypes.node.isRequired,
    children: PropTypes.array.isRequired,
    myKey: PropTypes.string.isRequired,
    props: PropTypes.object.isRequired,
    addComponent: PropTypes.func.isRequired,
}

const colTarget = {
    canDrop(props) {
        return true
    },

    drop(props, a2, a3) {
        console.log(props, a2, a3)
    },
}

function collect(connect, monitor) {
    return {
        connectDropTarget: connect.dropTarget(),
        isOver: monitor.isOver(),
        canDrop: monitor.canDrop(),
    }
}

const BaseSingleColComponent = ({ connectDropTarget, ...props }) => {
    return connectDropTarget(
        <span>
            <Col {...props} />
        </span>,
    )
}

const SingleColComponent = DropTarget(
    'NAVIGATION_LINK',
    colTarget,
    collect,
)(BaseSingleColComponent)

class BaseBuilderColComponent extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        const {
            components,
            renderComponents,
            props,
            editComponent,
            myKey,
            removeComponent,
            dispatch,
            name,
        } = this.props

        return (
            <ModalManager>
                {({ openModal }) => (
                    <SingleColComponent
                        {...props}
                        onClick={(e) => {
                            e.stopPropagation()

                            openModal({
                                title: <div>Column</div>,
                                body: ({ close }) => (
                                    <Tabs.Container>
                                        <Tabs.Tab name="properties">
                                            <Tabs.Trigger>
                                                Properties
                                            </Tabs.Trigger>
                                            <Tabs.Content>
                                                {({ changeTab }) => (
                                                    <div>
                                                        <ColPropsFormContainer
                                                            component={props}
                                                            editComponent={
                                                                editComponent
                                                            }
                                                            close={close}
                                                            myKey={myKey}
                                                        />
                                                    </div>
                                                )}
                                            </Tabs.Content>
                                        </Tabs.Tab>
                                    </Tabs.Container>
                                ),
                                footer: ({ close }) => [
                                    <Button
                                        color="danger"
                                        onClick={() => {
                                            removeComponent(myKey)
                                            close()
                                        }}
                                    >
                                        Remove column
                                    </Button>,
                                    <Button
                                        color="success"
                                        onClick={() => {
                                            dispatch(submit(FORM_NAME))
                                        }}
                                    >
                                        Edit Column
                                    </Button>,
                                ],
                            })

                            return false
                        }}
                    >
                        {renderComponents(components)}
                    </SingleColComponent>
                )}
            </ModalManager>
        )
    }
}

BaseBuilderColComponent.propTypes = {
    component: PropTypes.node.isRequired,
    children: PropTypes.array.isRequired,
    myKey: PropTypes.string.isRequired,
    props: PropTypes.object.isRequired,
    addComponent: PropTypes.func.isRequired,
}

const RowComponent = connect()(BaseRowComponent)
const ColComponent = connect()(BaseBuilderColComponent)

export class BuilderView extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            components: [],
        }
    }

    editComponent(key, values) {
        const { components } = this.state

        const findArr = (components) => {
            let found
            for (let i = 0; i < components.length; i++) {
                const c = components[i]
                if (c.key === key) {
                    return components
                }
                found = findArr(c.components)
            }

            return found
        }

        let arr = findArr(components)

        const found = arr.find((c) => c.key === key)
        found.props = values

        this.setState({ components })
    }

    removeComponent(key) {
        const { components } = this.state

        const findArr = (components) => {
            let found
            for (let i = 0; i < components.length; i++) {
                const c = components[i]
                if (c.key === key) {
                    return components
                }
                found = findArr(c.components)
            }

            return found
        }

        let arr = findArr(components)

        const foundKey = arr.findIndex((c) => c.key === key)
        arr.splice(foundKey, 1)

        this.setState({ components })
    }

    addComponent(type, parentKey = null, props) {
        const { components } = this.state
        const component = {}

        const findArr = (components, parentKey) => {
            let found
            for (let i = 0; i < components.length; i++) {
                const c = components[i]
                if (c.key === parentKey) {
                    return c
                }
                found = findArr(c.components, parentKey)
            }

            return found
        }

        let arr
        if (parentKey === null) {
            arr = components
        } else {
            arr = findArr(components, parentKey).components
        }

        switch (type) {
            case 'row':
                component.key = `row-${arr.length}`
                component.name = 'Row'
                component.props = props
                component.components = []

                arr.push(component)

                break

            case 'col':
                component.key = `col-${arr.length}`
                component.name = 'Col'
                component.props = props
                component.components = []

                arr.push(component)

                break
        }

        this.setState({ components })
    }

    renderComponents(components = []) {
        return components.map(({ props, key, components, name }) => {
            switch (name) {
                case 'Row':
                    return (
                        <RowComponent
                            props={props}
                            myKey={key}
                            addComponent={this.addComponent.bind(this)}
                            editComponent={this.editComponent.bind(this)}
                            components={components}
                            renderComponents={this.renderComponents.bind(this)}
                            removeComponent={this.removeComponent.bind(this)}
                            name={name}
                        />
                    )

                case 'Col':
                    return (
                        <ColComponent
                            props={props}
                            myKey={key}
                            addComponent={this.addComponent.bind(this)}
                            editComponent={this.editComponent.bind(this)}
                            components={components}
                            renderComponents={this.renderComponents.bind(this)}
                            removeComponent={this.removeComponent.bind(this)}
                            name={name}
                        />
                    )
            }
        })
    }

    render() {
        const { components } = this.state

        return (
            <PageContent className={cx('builder')}>
                {this.renderComponents(components)}
                <div className={cx('text-center')}>
                    <Button
                        onClick={() => this.addComponent('row')}
                        style={{ marginTop: 30 }}
                    >
                        Add Row
                    </Button>
                </div>
            </PageContent>
        )
    }
}

export default BuilderView
