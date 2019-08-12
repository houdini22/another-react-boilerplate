import React from 'react'
import { PageContent } from '../../../layouts/PageLayout/components/index'
import { Col, Row, Card, PageHeader } from '../../../components'
import { FaInfo as InfoIcon } from 'react-icons/fa'
import config from '../../../config'

export class FaqView extends React.Component {
  render() {
    return (
      <PageContent>
        <PageHeader.Container>
          <PageHeader.Title>
            <InfoIcon /> FAQ
          </PageHeader.Title>
        </PageHeader.Container>
        <Row>
          <Col xs={6}>
            <Card header={<h1>FAQ</h1>}>
              <Row>
                <Col xs={3}>
                  <h4>
                    <strong>Codename:</strong>
                  </h4>
                </Col>
                <Col xs={9} style={{ textAlign: 'right' }}>
                  {config.texts.frameworkName} framework
                </Col>
              </Row>
              <Row>
                <Col xs={3}>
                  <h4>
                    <strong>Version:</strong>
                  </h4>
                </Col>
                <Col xs={9} style={{ textAlign: 'right' }}>
                  {config.texts.version}
                </Col>
              </Row>
              <Row>
                <Col xs={3}>
                  <h4>
                    <strong>Github:</strong>
                  </h4>
                </Col>
                <Col xs={9} style={{ textAlign: 'right' }}>
                  <a
                    href="https://github.com/houdini22/another-react-boilerplate"
                    target="_blank"
                  >
                    https://github.com/houdini22/another-react-boilerplate
                  </a>
                </Col>
              </Row>
              <Row>
                <Col xs={3}>
                  <h4>
                    <strong>Copyright:</strong>
                  </h4>
                </Col>
                <Col xs={9} style={{ textAlign: 'right' }}>
                  © 2017 Michał Baniowski
                </Col>
              </Row>
            </Card>
          </Col>
          <Col xs={6}>
            <Card header={<h1>Changelog</h1>}>
              <Row>
                <Col xs={3}>
                  <h4>
                    <b>2019-06-12</b>
                  </h4>
                </Col>
                <Col xs={6}>
                  <ul>
                    <li>Initial release v0.1-alpha</li>
                  </ul>
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>
      </PageContent>
    )
  }
}

export default FaqView
