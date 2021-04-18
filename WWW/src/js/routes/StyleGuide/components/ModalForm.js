import React from 'react'
import { Field } from 'redux-form'
import { Col, FormField, Row, Tabs } from '../../../components/index'

class ModalForm extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <form>
                <Field
                    name="updateCount"
                    type="hidden"
                    component={FormField}
                    inputOnly
                />
                <Tabs.Container color="default" left solid header="Options">
                    <Tabs.Tab name="presentation">
                        <Tabs.Trigger>Presentation</Tabs.Trigger>
                        <Tabs.Content>
                            <Row>
                                <Col xs={12}>
                                    <Field
                                        name="color"
                                        label="color"
                                        type="select"
                                        options={[
                                            {
                                                label: 'default',
                                                value: 'default',
                                            },
                                            {
                                                label: 'primary',
                                                value: 'primary',
                                            },
                                            {
                                                label: 'secondary',
                                                value: 'secondary',
                                            },
                                            {
                                                label: 'info',
                                                value: 'info',
                                            },
                                            {
                                                label: 'danger',
                                                value: 'danger',
                                            },
                                            {
                                                label: 'warning',
                                                value: 'warning',
                                            },
                                            {
                                                label: 'success',
                                                value: 'success',
                                            },
                                        ]}
                                        component={FormField}
                                    />
                                </Col>
                                <Col xs={12}>
                                    <Field
                                        name="size"
                                        label="size"
                                        type="select"
                                        options={[
                                            {
                                                label: 'sm',
                                                value: 'sm',
                                            },
                                            {
                                                label: 'md',
                                                value: 'md',
                                            },
                                            {
                                                label: 'lg',
                                                value: 'lg',
                                            },
                                            {
                                                label: 'full',
                                                value: 'full',
                                            },
                                        ]}
                                        component={FormField}
                                    />
                                </Col>
                                <Col xs={12}>
                                    <Field
                                        name="placement"
                                        label="placement"
                                        type="select"
                                        options={[
                                            {
                                                label: 'default',
                                                value: '',
                                            },
                                            {
                                                label: 'center',
                                                value: 'center',
                                            },
                                            {
                                                label: 'bottom',
                                                value: 'bottom',
                                            },
                                            {
                                                label: 'right',
                                                value: 'right',
                                            },
                                        ]}
                                        component={FormField}
                                    />
                                </Col>
                                <Col xs={12}>
                                    <Field
                                        name="animation"
                                        label="animation"
                                        type="select"
                                        options={[
                                            {
                                                label: 'none',
                                                value: '',
                                            },
                                            {
                                                label: 'sweet-show',
                                                value: 'sweet-show',
                                            },
                                            {
                                                label: 'bounce-in-top',
                                                value: 'bounce-in-top',
                                            },
                                            {
                                                label: 'fade-in',
                                                value: 'fade-in',
                                            },
                                        ]}
                                        component={FormField}
                                    />
                                </Col>
                            </Row>
                        </Tabs.Content>
                    </Tabs.Tab>
                </Tabs.Container>
            </form>
        )
    }
}

ModalForm.propTypes = {}

export { ModalForm }
export default { ModalForm }
