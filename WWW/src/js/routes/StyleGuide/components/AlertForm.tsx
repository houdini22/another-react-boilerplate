import * as React from 'react'
import { Field } from 'redux-form'
import { Col, FormField, Row, Tabs } from '../../../components'

class AlertForm extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        const {
            options: { withIcon },
            colSize1,
        } = this.props

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
                                    <Field name="outline" label="outline" type="checkbox" component={FormField} />
                                </Col>
                                <Col xs={12}>
                                    <Field name="rounded" label="rounded" type="checkbox" component={FormField} />
                                </Col>
                                <Col xs={12}>
                                    <Field name="closeIcon" label="closeIcon" type="checkbox" component={FormField} />
                                </Col>
                                <Col xs={12}>
                                    <Field name="withIcon" label="withIcon" type="checkbox" component={FormField} />
                                </Col>
                                {withIcon && [
                                    <Col xs={12}>
                                        <Field name="iconHighlighted" label="iconHighlighted" type="checkbox" component={FormField} />
                                    </Col>,
                                    <Col xs={12}>
                                        <Field name="withIconArrow" label="withIconArrow" type="checkbox" component={FormField} />
                                    </Col>,
                                ]}
                            </Row>
                        </Tabs.Content>
                    </Tabs.Tab>
                </Tabs.Container>
            </form>
        )
    }
}

export { AlertForm }
export default { AlertForm }
