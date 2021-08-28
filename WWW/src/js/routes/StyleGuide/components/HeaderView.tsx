import * as React from 'react'
import { PageContent } from '../../../layouts/PageLayout/components'
import {
    Header,
    Row,
    Col,
    Section,
    Tabs,
    PageHeader,
    Breadcrumbs,
} from '../../../components'

class HeaderView extends React.Component {
    render() {
        return (
            <PageContent>
                <PageHeader.Container>
                    <PageHeader.Title>Header</PageHeader.Title>
                </PageHeader.Container>
                <Section>
                    <Row>
                        <Col xs={6}>
                            <Header>Header</Header>
                            <Tabs
                                items={[
                                    {
                                        label: 'Presentation',
                                        content: () => <Header>Content</Header>,
                                    },
                                    {
                                        label: 'Code',
                                        content: () => (
                                            <div>
                                                <pre>{`<Header>Content</Header>`}</pre>
                                            </div>
                                        ),
                                    },
                                ]}
                            />
                        </Col>
                    </Row>
                </Section>
            </PageContent>
        )
    }
}

export { HeaderView }
export default { HeaderView }
