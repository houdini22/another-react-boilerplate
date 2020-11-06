import React from 'react'
import { Row, Col, Card, Button } from '../components/index'
import _ from 'lodash'
import Copy from 'copy-to-clipboard'

const createPresentationTab = (
  options,
  presentation,
  code,
  { colSize = 12, copy = true } = {},
) => {
  return (
    <Card
      header={<h1>Presentation</h1>}
      headerActions={[
        <Button
          color="primary"
          onClick={() => {
            Copy(code)
          }}
        >
          Copy Code
        </Button>,
      ]}
      color="default"
    >
      <div className="text-center" style={{ padding: '10px' }}>
        {presentation}
      </div>
      <Row>
        <Col xs={12}>
          <pre>{code}</pre>
        </Col>
      </Row>
    </Card>
  )
}

const createSimplePresentation = (
  header,
  presentation,
  code,
  { colSize = 12, copy = true } = {},
) => {
  return (
    <Col xs={colSize} className="presentation-tab-simple">
      <div>
        <h3>{header}</h3>
      </div>
      <div className="presentation-tab-simple__presentation">
        <div>
          <div>{presentation}</div>
        </div>
      </div>
    </Col>
  )
}

const generateCode = (componentName, options, content = '') => {
  let result = `<${componentName}`
  Object.keys(options).forEach((key) => {
    if (key !== 'updateCount' && options[key]) {
      if (_.isString(options[key])) {
        result += ` ${key}='${options[key]}'`
      } else if (_.isBoolean(options[key])) {
        result += ` ${key}`
      }
    }
  })
  result += `>${content}</${componentName}>`
  return result
}

export { createPresentationTab, generateCode, createSimplePresentation }
