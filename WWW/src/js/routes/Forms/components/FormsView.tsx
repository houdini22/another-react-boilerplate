import React from 'react'
import { PageContent } from '../../../layouts/PageLayout/components'
import { FormContainer } from '../containers/FormContainer'
import { Row, Col, PageHeader, Card } from '../../../components'

class FormsView extends React.Component {
    render() {
        return (
            <PageContent>
                <PageHeader.Container>
                    <PageHeader.Title>Forms</PageHeader.Title>
                </PageHeader.Container>
                <Row>
                    <Col xs={12}>
                        <FormContainer />
                    </Col>
                </Row>
            </PageContent>
        )
    }
}

export { FormsView }
export default { FormsView }
