import * as React from 'react'
import { PageContent } from '../../../layouts/PageLayout/components'
import { Col, Row, PageHeader, Button } from '../../../components'

export class PagesView extends React.Component {
    render() {
        return (
            <PageContent>
                <PageHeader.Container>
                    <PageHeader.Title>Pages</PageHeader.Title>
                </PageHeader.Container>
                <Row>
                    <Col xs={12}>
                        <Button block navigationHref="/pages/login-page">
                            Login Page
                        </Button>
                    </Col>
                </Row>
            </PageContent>
        )
    }
}

export default PagesView
