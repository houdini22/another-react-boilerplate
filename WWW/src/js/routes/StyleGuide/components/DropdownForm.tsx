import * as React from 'react'
import { Field } from 'redux-form'
import { Col, FormField, Row, Tabs } from '../../../components'

class DropdownForm extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <form>
                <Field name="updateCount" type="hidden" component={FormField} inputOnly />
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
                                        name="triggerSize"
                                        label="triggerSize"
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
                                        name="triggerColor"
                                        label="triggerColor"
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
                                        name="trigger"
                                        label="trigger"
                                        type="select"
                                        options={[
                                            {
                                                label: 'click',
                                                value: 'click',
                                            },
                                            {
                                                label: 'hover',
                                                value: 'hover',
                                            },
                                        ]}
                                        component={FormField}
                                    />
                                </Col>
                                <Col xs={12}>
                                    <Field
                                        name="component"
                                        label="component"
                                        type="select"
                                        options={[
                                            {
                                                label: 'Button',
                                                value: 'Button',
                                            },
                                            {
                                                label: 'Label',
                                                value: 'Label',
                                            },
                                            {
                                                label: 'Badge',
                                                value: 'Badge',
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
                                                label: 'left',
                                                value: 'left',
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
                                    <Field name="disableOutsideClick" label="disableOutsideClick" type="checkbox" component={FormField} />
                                </Col>
                            </Row>
                        </Tabs.Content>
                    </Tabs.Tab>
                    <Tabs.Tab name="state">
                        <Tabs.Trigger>State</Tabs.Trigger>
                        <Tabs.Content>
                            <Row>
                                <Col xs={12} />
                            </Row>
                        </Tabs.Content>
                    </Tabs.Tab>
                </Tabs.Container>
            </form>
        )
    }
}

export { DropdownForm }
export default { DropdownForm }
