import * as React from "react"
import { PageContent } from '../../../layouts/PageLayout/components'
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
                            <Row>
                                <Col xs={3}>
                                    <h4>
                                        <strong>Donate:</strong>
                                    </h4>
                                </Col>
                                <Col xs={9} style={{ textAlign: 'right' }}>
                                    <form
                                        action="https://www.paypal.com/cgi-bin/webscr"
                                        method="post"
                                        target="_top"
                                    >
                                        <input
                                            type="hidden"
                                            name="cmd"
                                            value="_donations"
                                        />
                                        <input
                                            type="hidden"
                                            name="business"
                                            value="4DPGFK2XZLYUC"
                                        />
                                        <input
                                            type="hidden"
                                            name="currency_code"
                                            value="PLN"
                                        />
                                        <input
                                            type="image"
                                            src="https://www.paypalobjects.com/en_US/PL/i/btn/btn_donateCC_LG.gif"
                                            border="0"
                                            name="submit"
                                            title="PayPal - The safer, easier way to pay online!"
                                            alt="Donate with PayPal button"
                                        />
                                        <img
                                            alt=""
                                            border="0"
                                            src="https://www.paypal.com/en_PL/i/scr/pixel.gif"
                                            width="1"
                                            height="1"
                                        />
                                    </form>
                                </Col>
                            </Row>
                        </Card>
                    </Col>
                    <Col xs={6}>
                        <Card header={<h1>Changelog</h1>}>
                            <Row>
                                <Col xs={3}>
                                    <ul>
                                        <li>2019-06-12</li>
                                        <li>2020-11-07</li>
                                        <li>2021-08-28</li>
                                    </ul>
                                </Col>
                                <Col xs={6}>
                                    <ul
                                        style={{
                                            listStyleType: 'none',
                                        }}
                                    >
                                        <li>Initial release v0.1-alpha</li>
                                        <li>Initial release v0.2-alpha</li>
                                        <li>Release v0.3-alpha</li>
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
