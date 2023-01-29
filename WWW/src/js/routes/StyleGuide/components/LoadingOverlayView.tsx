import * as React from 'react'
import { PageContent } from '../../../layouts/PageLayout/components'
import { Row, Col, Section, LoadingOverlay, Label } from '../../../components'
import { createPresentationTab as _createPresentationTab } from '../../../utils/tabs'
import { ComponentsPageHeader } from '../../../components/common/ComponentsPageHeader'

interface LoadingOverlayProps {
    createPresentationTab?(): any
}

class LoadingOverlayView extends React.Component<LoadingOverlayProps> {
    render() {
        const { createPresentationTab = _createPresentationTab } = this.props

        const code1 = `<div style={{position: 'relative', height: '150px'}}>
    <p>Content...</p>
    <LoadingOverlay/>
</div>`

        const code2 = `<div style={{position: 'relative', height: '150px'}}>
    <p>Content...</p>
    <LoadingOverlay size='xs'/>
</div>`

        return (
            <PageContent>
                <ComponentsPageHeader title="LoadingOverlay" component="LoadingOverlay" />
                <Row>
                    <Col xs={12} md={6}>
                        <Section>
                            {createPresentationTab(
                                <span>Basic</span>,
                                <Row>
                                    <Col xs={12}>
                                        <div
                                            style={{
                                                position: 'relative',
                                                height: '150px',
                                            }}
                                        >
                                            <p>Content...</p>
                                            <LoadingOverlay />
                                        </div>
                                    </Col>
                                </Row>,
                                code1,
                            )}
                        </Section>
                    </Col>
                    <Col xs={12} md={6}>
                        <Section>
                            {createPresentationTab(
                                <span>
                                    Size <Label color="info">xs</Label>
                                </span>,
                                <Row>
                                    <Col xs={12}>
                                        <div
                                            style={{
                                                position: 'relative',
                                                height: '150px',
                                            }}
                                        >
                                            <p>Content...</p>
                                            <LoadingOverlay size="xs" />
                                        </div>
                                    </Col>
                                </Row>,
                                code2,
                            )}
                        </Section>
                    </Col>
                </Row>
            </PageContent>
        )
    }
}

export { LoadingOverlayView }
export default { LoadingOverlayView }
