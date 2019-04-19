import React from 'react'
import { Field } from 'redux-form'
import { Col, FormField, Row, Button } from '../../../components/index'

const options = [
  {
    value: '1',
    label: '1',
  },
  {
    value: '2',
    label: '2',
  },
  {
    value: '3',
    label: '3',
  },
  {
    value: '4',
    label: '4',
  },
  {
    value: '5',
    label: '5',
  },
  {
    value: '6',
    label: '6',
  },
  {
    value: '7',
    label: '7',
  },
  {
    value: '8',
    label: '8',
  },
  {
    value: '9',
    label: '9',
  },
  {
    value: '10',
    label: '10',
  },
  {
    value: '11',
    label: '11',
  },
  {
    value: '12',
    label: '12',
  },
]

class ColPropsForm extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <form>
        <Row>
          <Col xs={12}>
            <Field
              name="xs"
              label="xs"
              type="select"
              options={options}
              component={FormField}
            />
          </Col>
          <Col xs={12}>
            <Field
              name="sm"
              label="sm"
              type="select"
              options={options}
              component={FormField}
            />
          </Col>
          <Col xs={12}>
            <Field
              name="md"
              label="md"
              type="select"
              options={options}
              component={FormField}
            />
          </Col>
          <Col xs={12}>
            <Field
              name="lg"
              label="lg"
              type="select"
              options={options}
              component={FormField}
            />
          </Col>
        </Row>
      </form>
    )
  }
}

ColPropsForm.propTypes = {}

export { ColPropsForm }
export default { ColPropsForm }
