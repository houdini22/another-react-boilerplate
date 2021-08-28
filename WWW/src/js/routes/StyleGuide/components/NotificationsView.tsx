import * as React from 'react'
import { PageContent } from '../../../layouts/PageLayout/components'
import { Row, Section, Col } from '../../../components'
import { createPresentationTab } from '../../../utils/tabs'
import { ComponentsPageHeader } from '../../../components/common/ComponentsPageHeader'
import { NotificationsFormContainer } from './NotificationsFormContainer'

class NotificationsView extends React.Component {
    render() {
        return (
            <PageContent>
                <ComponentsPageHeader
                    title="Notifications"
                    component="Notifications"
                />
                <Section>
                    <Row>
                        <Col xs={12}>
                            <NotificationsFormContainer />
                        </Col>
                    </Row>
                </Section>
            </PageContent>
        )
    }
}

export { NotificationsView }
export default { NotificationsView }
