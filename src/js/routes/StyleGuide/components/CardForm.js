import React from 'react'
import { Field } from 'redux-form'
import { Col, FormField, Row, Tabs } from '../../../components/index'

class CardForm extends React.Component {
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
                    name="header"
                    label="Header"
                    type="checkbox"
                    component={FormField}
                  />
                </Col>
                <Col xs={12}>
                  <Field
                    name="withCloseIcon"
                    label="With Close Icon"
                    type="checkbox"
                    component={FormField}
                  />
                </Col>
                <Col xs={12}>
                  <Field
                    name="withMinimizeIcon"
                    label="With Minimize Icon"
                    type="checkbox"
                    component={FormField}
                  />
                </Col>
                <Col xs={12}>
                  <Field
                    name="headerActions"
                    label="Header Actions"
                    type="checkbox"
                    component={FormField}
                  />
                </Col>
                <Col xs={12}>
                  <Field
                    name="noBorderTop"
                    label="No Border Top"
                    type="checkbox"
                    component={FormField}
                  />
                </Col>
                <Col xs={12}>
                  <Field
                    name="footer"
                    label="footer"
                    type="checkbox"
                    component={FormField}
                  />
                </Col>
                <Col xs={12}>
                  <Field
                    name="footerType"
                    label="Footer Type"
                    type="select"
                    placeholder
                    options={[
                      { label: 'transparent', value: 'transparent' },
                      { label: 'bordered', value: 'bordered' },
                      { label: 'solid', value: 'solid' },
                      { label: 'colored', value: 'colored' },
                    ]}
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

CardForm.propTypes = {}

export { CardForm }
export default { CardForm }
