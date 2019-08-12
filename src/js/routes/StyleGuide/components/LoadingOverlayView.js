import React from 'react'
import PropTypes from 'prop-types'
import { PageContent } from '../../../layouts/PageLayout/components/index'
import {
  Row,
  Col,
  Section,
  LoadingOverlay,
  Label,
} from '../../../components/index'
import { createPresentationTab } from '../../../utils/tabs'
import { ComponentsPageHeader } from '../../../components/common/ComponentsPageHeader'

class LoadingOverlayView extends React.Component {
  render() {
    const { createPresentationTab } = this.props

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
        <ComponentsPageHeader
          title="LoadingOverlay"
          component="LoadingOverlay"
        />
        <Section>
          <Row>
            <Col xs={6}>
              {createPresentationTab(
                <span>Basic</span>,
                <Row>
                  <Col xs={12}>
                    <div style={{ position: 'relative', height: '150px' }}>
                      <p>Content...</p>
                      <LoadingOverlay />
                    </div>
                  </Col>
                </Row>,
                code1,
              )}
            </Col>
            <Col xs={6}>
              {createPresentationTab(
                <span>
                  Size <Label color="info">xs</Label>
                </span>,
                <Row>
                  <Col xs={12}>
                    <div style={{ position: 'relative', height: '150px' }}>
                      <p>Content...</p>
                      <LoadingOverlay size="xs" />
                    </div>
                  </Col>
                </Row>,
                code2,
              )}
            </Col>
          </Row>
        </Section>
      </PageContent>
    )
  }
}

LoadingOverlayView.propTypes = {
  createPresentationTab: PropTypes.func.isRequired,
}

LoadingOverlayView.defaultProps = {
  createPresentationTab: createPresentationTab,
}

export { LoadingOverlayView }
export default { LoadingOverlayView }
