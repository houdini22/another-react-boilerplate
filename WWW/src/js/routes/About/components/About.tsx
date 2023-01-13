import * as React from 'react'
import { PageContent } from '../../../layouts/PageLayout/components'
import { Row, Col, Card, PageHeader } from '../../../components'
import { IoIosMail as ContactIcon } from 'react-icons/io'
import { ContactFormContainer } from '../../../components/common/ContactForm/ContactFormContainer'

export class AboutView extends React.Component {
    render() {
        return (
            <PageContent>
                <PageHeader.Container>
                    <PageHeader.Title>
                        <ContactIcon /> Contact me
                    </PageHeader.Title>
                </PageHeader.Container>
                <Row>
                    <Col xs={12} sm={12} md={6}>
                        <Card header={<h1>Author</h1>}>
                            <Row>
                                <Col xs={3}>
                                    <h4>Email address: </h4>
                                </Col>
                                <Col xs={9} style={{ textAlign: 'right' }}>
                                    <a href="mailto:michal.baniowski@gmail.com">
                                        michal.baniowski@gmail.com
                                    </a>
                                    <br />
                                    <a href="mailto:baniczek@gmail.com">
                                        baniczek@gmail.com
                                    </a>
                                </Col>
                            </Row>
                            <Row>
                                <Col xs={3}>
                                    <h4>Github: </h4>
                                </Col>
                                <Col xs={9} style={{ textAlign: 'right' }}>
                                    <a
                                        href="https://github.com/houdini22"
                                        target="_blank"
                                    >
                                        https://github.com/houdini22
                                    </a>
                                </Col>
                            </Row>
                            <Row>
                                <Col xs={3}>
                                    <h4>LinkedIn: </h4>
                                </Col>
                                <Col xs={9} style={{ textAlign: 'right' }}>
                                    <a
                                        href="https://www.linkedin.com/in/micha%C5%82-baniowski-34474a25b/"
                                        target="_blank"
                                    >
                                        https://www.linkedin.com/in/michał-baniowski-34474a25b/
                                    </a>
                                </Col>
                            </Row>
                        </Card>
                    </Col>
                    <Col xs={12} sm={12} md={6}>
                        <Card header={<h1>Form</h1>}>
                            <ContactFormContainer />
                        </Card>
                    </Col>
                </Row>
            </PageContent>
        )
    }
}

export default AboutView
