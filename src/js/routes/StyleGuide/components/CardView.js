import React from 'react'
import { PageContent } from '../../../layouts/PageLayout/components/index'
import {
  Row,
  Col,
  Section,
  Card,
  Button,
  Badge,
  Label,
  TextField,
  Checkbox,
} from '../../../components/index'
import { CardFormContainer } from './CardFormContainer'
import { FaImage as CardIcon } from 'react-icons/fa'
import PropTypes from 'prop-types'
import { createPresentationTab } from '../../../utils/tabs'
import { ComponentsPageHeader } from '../../../components/common/ComponentsPageHeader'

class CardView extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      options: {
        color: 'default',
        size: 'md',
        withCloseIcon: false,
        withMinimizeIcon: false,
        header: false,
        headerActions: false,
        isLoading: false,
        noBorderTop: false,
        footer: false,
        footerType: '',
        updateCount: 0,
      },
    }
    this.setOptions = this.setOptions.bind(this)
  }

  setOptions(newOptions) {
    const {
      options: { updateCount },
    } = this.state
    this.setState({ options: { ...newOptions, updateCount: updateCount + 1 } })
  }

  render() {
    const { colSize1, createPresentationTab } = this.props
    const { options } = this.state
    const {
      size,
      withCloseIcon,
      withMinimizeIcon,
      header,
      headerActions,
      isLoading,
      noBorderTop,
      footer,
      footerType,
      color,
    } = options

    return (
      <PageContent>
        <ComponentsPageHeader title="Card" component="Card" />
        <Section>
          <Row>
            <Col xs={6}>
              <CardFormContainer
                options={options}
                setOptions={this.setOptions}
              />
            </Col>
            <Col xs={6}>
              {createPresentationTab(
                <span>
                  Options
                  {withCloseIcon && (
                    <Label size="xs" color="info">
                      withCloseIcon
                    </Label>
                  )}
                  {withMinimizeIcon && (
                    <Label size="xs" color="info">
                      withMinimizeIcon
                    </Label>
                  )}
                  {header && (
                    <Label size="xs" color="info">
                      header
                    </Label>
                  )}
                  {headerActions && (
                    <Label size="xs" color="info">
                      headerActions
                    </Label>
                  )}
                  {isLoading && (
                    <Label size="xs" color="info">
                      isLoading
                    </Label>
                  )}
                  {noBorderTop && (
                    <Label size="xs" color="info">
                      noBorderTop
                    </Label>
                  )}{' '}
                  {footer && (
                    <Label size="xs" color="info">
                      footer
                    </Label>
                  )}{' '}
                  {footerType && (
                    <Label size="xs" color="info">
                      footerType
                    </Label>
                  )}
                </span>,
                <Card
                  key={color}
                  color={color}
                  size={size}
                  withCloseIcon={withCloseIcon}
                  withMinimizeIcon={withMinimizeIcon}
                  header={
                    header ? (
                      <h1>
                        {' '}
                        <CardIcon /> Header
                      </h1>
                    ) : (
                      ''
                    )
                  }
                  headerActions={
                    headerActions
                      ? [
                          <Button key="warning" color="warning">
                            Action!
                          </Button>,
                          <Badge key="badge-info" color="info">
                            33
                          </Badge>,
                          <Label key="label-danger" color="danger">
                            ERROR!
                          </Label>,
                          <TextField placeholder="search" />,
                          <Checkbox />,
                        ]
                      : undefined
                  }
                  isLoading={isLoading}
                  noBorderTop={noBorderTop}
                  footer={footer ? <div>Footer</div> : null}
                  footerType={footerType}
                >
                  {color} {size}
                </Card>,
                '',
                {
                  colSize: colSize1,
                },
              )}
            </Col>
          </Row>
        </Section>
      </PageContent>
    )
  }
}

CardView.propTypes = {
  colSize1: PropTypes.number,
  colSize2: PropTypes.number,
  createPresentationTab: PropTypes.func.isRequired,
}

CardView.defaultProps = {
  colSize1: 4,
  colSize2: 12,
  createPresentationTab: createPresentationTab,
}

export { CardView }
export default { CardView }
