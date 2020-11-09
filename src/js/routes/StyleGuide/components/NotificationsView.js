import React from 'react'
import PropTypes from 'prop-types'
import { PageContent } from '../../../layouts/PageLayout/components/index'
import { Row, Section, Col } from '../../../components/index'
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

NotificationsView.propTypes = {
    createPresentationTab: PropTypes.func.isRequired,
}

NotificationsView.defaultProps = {
    createPresentationTab: createPresentationTab,
}

export { NotificationsView }
export default { NotificationsView }
