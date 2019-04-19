import React from 'react'
import { Field } from 'redux-form'
import { Col, FormField, Row, Tabs } from '../../../components/index'

class AccordionForm extends React.Component {
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
          <Col xs={12}>
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
                        name="type"
                        label="type"
                        type="select"
                        options={[
                          {
                            label: 'boxed',
                            value: 'boxed',
                          },
                          {
                            label: 'minimal',
                            value: 'minimal',
                          },
                        ]}
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
                        name="separated"
                        label="separated"
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

AccordionForm.propTypes = {}

export { AccordionForm }
export default { AccordionForm }
