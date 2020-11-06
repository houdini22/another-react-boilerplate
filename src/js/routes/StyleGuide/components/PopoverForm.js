import React from 'react'
import { Field } from 'redux-form'
import { Col, FormField, Row, Tabs } from '../../../components/index'

class PopoverForm extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        const { colSize1 } = this.props

        return (
            <form>
                <Field
                    name="updateCount"
                    type="hidden"
                    component={FormField}
                    inputOnly
                />
                <Row>
                    <Col xs={12}>
                        <Tabs.Container
                            color="default"
                            left
                            solid
                            header="Options"
                        >
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
                                                name="outline"
                                                label="outline"
                                                type="checkbox"
                                                component={FormField}
                                            />
                                        </Col>
                                        <Col xs={12}>
                                            <Field
                                                name="pixelsWidth"
                                                label="pixelsWidth"
                                                type="text"
                                                component={FormField}
                                            />
                                        </Col>
                                        <Col xs={12}>
                                            <Field
                                                name="clean"
                                                label="clean"
                                                type="checkbox"
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
                                                        label: 'right-top',
                                                        value: 'right-top',
                                                    },
                                                    {
                                                        label: 'left-top',
                                                        value: 'left-top',
                                                    },
                                                    {
                                                        label: 'right-center',
                                                        value: 'right-center',
                                                    },
                                                    {
                                                        label: 'left-center',
                                                        value: 'left-center',
                                                    },
                                                ]}
                                                component={FormField}
                                            />
                                        </Col>
                                        <Col xs={12}>
                                            <Field
                                                name="disableOutsideClick"
                                                label="disableOutsideClick"
                                                type="checkbox"
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
                                    </Row>
                                </Tabs.Content>
                            </Tabs.Tab>
                        </Tabs.Container>
                    </Col>
                </Row>
            </form>
        )
    }
}

PopoverForm.propTypes = {}

export { PopoverForm }
export default { PopoverForm }
