import * as React from 'react'
import { Row, Col, Card, Button } from '../components'
import _ from 'lodash'
import * as Copy from 'copy-to-clipboard'

const createPresentationTab = (options, presentation, code, { colSize = 12, copy = true } = {}) => {
    return (
        <Card
            header={<h1>Presentation</h1>}
            headerActions={[
                <Button
                    color="primary"
                    onClick={() => {
                        Copy(code)
                    }}
                    key={'copy_code'}
                >
                    Copy Code
                </Button>,
            ]}
            color="default"
            className={'presentation-tab'}
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

const generateCode = (componentName, options, content = '') => {
    let result = `<${componentName}`
    Object.keys(options).forEach((key) => {
        if (key !== 'updateCount' && options[key]) {
            if (_.isString(options[key])) {
                result += `\n\t${key}='${options[key]}'`
            } else if (_.isBoolean(options[key])) {
                result += `\n\t${key}`
            }
        }
    })
    result += `>\n\t\t${content}\n</${componentName}>`
    return result
}

export { createPresentationTab, generateCode }
