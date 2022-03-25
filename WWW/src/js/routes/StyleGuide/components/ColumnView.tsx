import * as React from 'react'
import { PageContent } from '../../../layouts/PageLayout/components'
import { Row, Col, Section } from '../../../components'
import { createPresentationTab as _createPresentationTab } from '../../../utils/tabs'
import { ComponentsPageHeader } from '../../../components/common/ComponentsPageHeader'

interface ColumnViewProps {
    createPresentationTab?(): any
}

class ColumnView extends React.Component<ColumnViewProps> {
    render() {
        const { createPresentationTab = _createPresentationTab } = this.props

        return (
            <PageContent>
                <ComponentsPageHeader title="Column" component="Column" />
                <Section>
                    <Row>
                        <Col xs={6}>
                            {createPresentationTab(
                                'Basic',
                                <Row>
                                    <Col xs={3}>xs=3</Col>
                                    <Col xs={3}>xs=3</Col>
                                    <Col xs={3}>xs=3</Col>
                                    <Col xs={3}>xs=3</Col>
                                </Row>,
                                <Row>
                                    <Col xs={12}>
                                        {`<Row>
    <Col xs={3}>xs=3</Col>
    <Col xs={3}>xs=3</Col>
    <Col xs={3}>xs=3</Col>
    <Col xs={3}>xs=3</Col>
</Row>`}
                                    </Col>
                                </Row>,
                            )}
                        </Col>
                        <Col xs={6}>
                            {createPresentationTab(
                                'Basic',
                                <Row>
                                    <Col xs={6}>xs=6</Col>
                                    <Col xs={6}>xs=6</Col>
                                </Row>,
                                <Row>
                                    <Col xs={12}>
                                        {`<Row>
    <Col xs={6}>xs=6</Col>
    <Col xs={6}>xs=6</Col>
</Row>`}
                                    </Col>
                                </Row>,
                            )}
                        </Col>
                    </Row>
                </Section>
            </PageContent>
        )
    }
}

export { ColumnView }
export default { ColumnView }
