import React from 'react'
import { Field } from 'redux-form'
import { Col, FormField, Row, Tabs } from '../../../components/index'

class PageHeaderForm extends React.Component {
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
                <Row>
                    <Col xs={6}>
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
                                                name="breadcrumbs"
                                                label="breadcrumbs"
                                                type="checkbox"
                                                component={FormField}
                                            />
                                        </Col>
                                        <Col xs={12}>
                                            <Field
                                                name="actions"
                                                label="actions"
                                                type="checkbox"
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

PageHeaderForm.propTypes = {}

export { PageHeaderForm }
export default { PageHeaderForm }
