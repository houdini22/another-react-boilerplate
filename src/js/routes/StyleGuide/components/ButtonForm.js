import React from 'react'
import { Field } from 'redux-form'
import { Col, FormField, Row, Tabs } from '../../../components/index'

class ButtonForm extends React.Component {
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
                                        ]}
                                        component={FormField}
                                    />
                                </Col>
                                <Col xs={12}>
                                    <Field
                                        name="outline"
                                        label="outline"
                                        type="checkbox"
                                        component={FormField}
                                    />
                                </Col>
                                <Col xs={12}>
                                    <Field
                                        name="block"
                                        label="block"
                                        type="checkbox"
                                        component={FormField}
                                    />
                                </Col>
                                <Col xs={12}>
                                    <Field
                                        name="rounded"
                                        label="rounded"
                                        type="checkbox"
                                        component={FormField}
                                    />
                                </Col>
                                <Col xs={12}>
                                    <Field
                                        name="roundless"
                                        label="roundless"
                                        type="checkbox"
                                        component={FormField}
                                    />
                                </Col>
                                <Col xs={12}>
                                    <Field
                                        name="borderless"
                                        label="borderless"
                                        type="checkbox"
                                        component={FormField}
                                    />
                                </Col>
                                <Col xs={12}>
                                    <Field
                                        name="icon"
                                        label="icon"
                                        type="checkbox"
                                        component={FormField}
                                    />
                                </Col>
                                <Col xs={12}>
                                    <Field
                                        name="iconOnly"
                                        label="iconOnly"
                                        type="checkbox"
                                        component={FormField}
                                    />
                                </Col>
                            </Row>
                        </Tabs.Content>
                    </Tabs.Tab>
                    <Tabs.Tab name="state">
                        <Tabs.Trigger>State</Tabs.Trigger>
                        <Tabs.Content>
                            <Row>
                                <Col xs={12}>
                                    <Field
                                        name="disabled"
                                        label="disabled"
                                        type="checkbox"
                                        component={FormField}
                                    />
                                </Col>
                                <Col xs={12}>
                                    <Field
                                        name="isLoading"
                                        label="isLoading"
                                        type="checkbox"
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

ButtonForm.propTypes = {}

export { ButtonForm }
export default { ButtonForm }
