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

class ColumnView extends React.Component {
    render() {
        const { createPresentationTab } = this.props

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

ColumnView.propTypes = {
    createPresentationTab: PropTypes.func.isRequired,
}

ColumnView.defaultProps = {
    createPresentationTab: createPresentationTab,
}

export { ColumnView }
export default { ColumnView }
