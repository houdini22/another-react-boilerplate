import React from 'react'
import { Field } from 'redux-form'
import { Col, FormField, Row, Tabs } from '../../../components/index'

class LabelForm extends React.Component {
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
                                <Col xs={6}>
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
                                        label="Size"
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
                                        name="href"
                                        label="Href"
                                        type="text"
                                        component={FormField}
                                    />
                                </Col>
                                <Col xs={12}>
                                    <Field
                                        name="rounded"
                                        label="Rounded"
                                        type="checkbox"
                                        component={FormField}
                                    />
                                </Col>
                                <Col xs={12}>
                                    <Field
                                        name="roundless"
                                        label="Roundless"
                                        type="checkbox"
                                        component={FormField}
                                    />
                                </Col>
                                <Col xs={12}>
                                    <Field
                                        name="block"
                                        label="Block"
                                        type="checkbox"
                                        component={FormField}
                                    />
                                </Col>
                                <Col xs={12}>
                                    <Field
                                        name="striped"
                                        label="Striped"
                                        type="checkbox"
                                        component={FormField}
                                    />
                                </Col>
                                <Col xs={12}>
                                    <Field
                                        name="outline"
                                        label="Outline"
                                        type="checkbox"
                                        component={FormField}
                                    />
                                </Col>
                                <Col xs={12}>
                                    <Field
                                        name="arrow"
                                        label="Arrow"
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
                                        name="isLoading"
                                        label="Is Loading"
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

LabelForm.propTypes = {}

export { LabelForm }
export default { LabelForm }
