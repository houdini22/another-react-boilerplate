import React from 'react'
import PropTypes from 'prop-types'
import { PageContent } from '../../../layouts/PageLayout/components/index'
import {
  Row,
  Col,
  Section,
  Label,
  Popover,
  Button,
} from '../../../components/index'
import { createPresentationTab, generateCode } from '../../../utils/tabs'
import { PopoverFormContainer } from './PopoverFormContainer'
import { ComponentsPageHeader } from '../../../components/common/ComponentsPageHeader'
import classNames from 'classnames/bind'
import styles from '../../../../assets/scss/_animations.scss'

const cx = classNames.bind(styles)

class PopoverView extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      options: {
        color: 'default',
        outline: false,
        pixelsWidth: 300,
        placement: 'right-top',
        clean: false,
        disableOutsideClick: false,
        trigger: 'click',
        updateCount: 0,
      },
    }
  }

  setOptions(newOptions) {
    const {
      options: { updateCount },
    } = this.state
    this.setState({ options: { ...newOptions, updateCount: updateCount + 1 } })
  }

  render() {
    const { colSize1, colSize2, createPresentationTab } = this.props
    const { options } = this.state
    const {
      outline,
      pixelsWidth,
      placement,
      clean,
      color,
      disableOutsideClick,
      trigger,
    } = options

    const code = generateCode('Popover', options, 'Content')

    return (
      <PageContent>
        <ComponentsPageHeader title="Popover" component="Popover" />
        <Section>
          <Row>
            <Col xs={6}>
              <PopoverFormContainer
                options={options}
                setOptions={this.setOptions.bind(this)}
                colSize1={colSize2}
              />
            </Col>
            <Col xs={6}>
              {createPresentationTab(
                <span>
                  Options
                  {outline && (
                    <Label size="xs" color="info">
                      outline
                    </Label>
                  )}
                  {pixelsWidth && (
                    <Label size="xs" color="info">
                      pixelsWidth
                    </Label>
                  )}
                  {placement && (
                    <Label size="xs" color="info">
                      placement
                    </Label>
                  )}
                  {clean && (
                    <Label size="xs" color="info">
                      clean
                    </Label>
                  )}
                  {disableOutsideClick && (
                    <Label size="xs" color="info">
                      disableOutsideClick
                    </Label>
                  )}
                </span>,
                <Popover.Container
                  placement={placement}
                  outline={outline}
                  color={color}
                  pixelsWidth={pixelsWidth}
                  disableOutsideClick={disableOutsideClick}
                  trigger={trigger}
                >
                  <Popover.Trigger>
                    <Button>Trigger</Button>
                  </Popover.Trigger>
                  <Popover.Content
                    className={cx('animation--swing-in-top-fwd')}
                  >
                    {({ close }) => (
                      <div>
                        Content{' '}
                        <a
                          href="#"
                          onClick={e => {
                            e.preventDefault()
                            close()
                          }}
                        >
                          Close
                        </a>
                      </div>
                    )}
                  </Popover.Content>
                </Popover.Container>,
                code,
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

PopoverView.propTypes = {
  colSize1: PropTypes.number,
  colSize2: PropTypes.number,
  createPresentationTab: PropTypes.func.isRequired,
}

PopoverView.defaultProps = {
  colSize1: 4,
  colSize2: 12,
  createPresentationTab: createPresentationTab,
}

export { PopoverView }
export default { PopoverView }
