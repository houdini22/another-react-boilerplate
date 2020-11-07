import React from 'react'
import PropTypes from 'prop-types'
import { PageContent } from '../../../layouts/PageLayout/components/index'
import {
    Button,
    Row,
    Col,
    Section,
    Alert,
    Label,
} from '../../../components/index'
import { ModalManager } from '../../../containers/Modal/index'
import { createPresentationTab } from '../../../utils/tabs'
import { ComponentsPageHeader } from '../../../components/common/ComponentsPageHeader'

class TableView extends React.Component {
    render() {
        const { createPresentationTab } = this.props

        return (
            <PageContent>
                <ComponentsPageHeader title="Table" component="Table" />
                <Section>
                    <Row>
                        <Col xs={12}></Col>
                    </Row>
                </Section>
            </PageContent>
        )
    }
}

TableView.propTypes = {
    createPresentationTab: PropTypes.func.isRequired,
}

TableView.defaultProps = {
    createPresentationTab: createPresentationTab,
}

export { TableView }
export default { TableView }
