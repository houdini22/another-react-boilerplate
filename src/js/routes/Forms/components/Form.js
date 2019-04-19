import React from 'react'
import { Field } from 'redux-form'
import { Card, Col, FormField, Header, Row } from '../../../components/index'

class Form extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { data, isRequestInProgress } = this.props

    return (
      <Row>
        <Col xs={6}>
          <Card header={<h1>Form</h1>}>
            <form>
              <Field
                name="text_1"
                placeholder="Placeholder"
                label="Label for text_1"
                type="text"
                component={FormField}
                loading={isRequestInProgress('text_1')}
              />
              <Field
                name="number_1"
                placeholder="0"
                label="Label for number_1"
                type="number"
                component={FormField}
                loading={isRequestInProgress('number_1')}
              />
              <Field
                name="select_1"
                label="select_1"
                type="select"
                component={FormField}
                options={[
                  {
                    label: 'label1',
                    value: 'value1',
                  },
                  {
                    label: 'label2',
                    value: 'value2',
                  },
                ]}
                loading={isRequestInProgress('select_1')}
                placeholder
              />
              <Field
                name="checkbox_1"
                label="Label for checkbox_1"
                type="checkbox"
                component={FormField}
                loading={isRequestInProgress('checkbox_1')}
              />
              <Field
                name="checkbox_2"
                label="Label for checkbox_2"
                type="checkbox"
                disabled
                component={FormField}
                loading={isRequestInProgress('checkbox_2')}
              />
              <Field
                name="checkbox_3"
                label="Label for checkbox_3"
                type="checkbox"
                disabled
                component={FormField}
                loading={isRequestInProgress('checkbox_3')}
              />
              <Field
                name="radio_1"
                label="Label for radio_1"
                type="radio"
                component={FormField}
                loading={isRequestInProgress('radio_1')}
              />
              <Field
                name="radio_2"
                label="Label for radio_2"
                type="radio"
                disabled
                component={FormField}
                loading={isRequestInProgress('radio_2')}
              />
              <Field
                name="radio_3"
                label="Label for radio_3"
                type="radio"
                disabled
                component={FormField}
                loading={isRequestInProgress('radio_3')}
              />
              <Field
                name="textarea_1"
                label="Label for textarea_1"
                type="textarea"
                placeholder="Placeholder..."
                component={FormField}
                loading={isRequestInProgress('textarea_1')}
              />
            </form>
          </Card>
        </Col>
        <Col xs={6}>
          <Card header={<h1>Values</h1>}>
            <pre>
              {Object.keys(data).map(key => {
                return (
                  <p key={key}>
                    `{key}` = {String(data[key])}
                  </p>
                )
              })}
            </pre>
          </Card>
        </Col>
      </Row>
    )
  }
}

Form.propTypes = {}

export { Form }
export default { Form }
