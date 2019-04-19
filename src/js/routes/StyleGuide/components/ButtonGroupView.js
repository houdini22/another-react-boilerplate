import React from 'react'
import { PageContent } from '../../../layouts/PageLayout/components/index'
import {
  Row,
  Col,
  Section,
  Button,
  ButtonGroup,
} from '../../../components/index'
import { ButtonGroupFormContainer } from './ButtonGroupFormContainer'
import PropTypes from 'prop-types'
import { createPresentationTab } from '../../../utils/tabs'
import { ComponentsPageHeader } from '../../../components/common/ComponentsPageHeader'

class ButtonGroupView extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      options: {
        color: 'default',
        size: 'md',
        outline: false,
        block: false,
        roudless: false,
        rounded: false,
        isLoading: false,
        disabled: false,
        borderless: false,
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
      outline,
      block,
      rounded,
      roundless,
      isLoading,
      disabled,
      borderless,
      color,
    } = options

    return (
      <PageContent>
        <ComponentsPageHeader title="ButtonGroup" component="ButtonGroup" />
        <Section>
          <Row>
            <Col xs={6}>
              <ButtonGroupFormContainer
                options={options}
                setOptions={this.setOptions}
              />
            </Col>
            <Col xs={6}>
              {createPresentationTab(
                <span>Options</span>,
                <ButtonGroup
                  color={color}
                  size={size}
                  outline={outline}
                  block={block}
                  rounded={rounded}
                  roundless={roundless}
                  isLoading={isLoading}
                  disabled={disabled}
                  borderless={borderless}
                >
                  <Button>
                    First {color} {size}
                  </Button>
                  <Button>
                    Second {color} {size}
                  </Button>
                  <Button>
                    Third {color} {size}
                  </Button>
                </ButtonGroup>,
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

ButtonGroupView.propTypes = {
  colSize1: PropTypes.number,
  colSize2: PropTypes.number,
  createPresentationTab: PropTypes.func.isRequired,
}

ButtonGroupView.defaultProps = {
  colSize1: 4,
  colSize2: 12,
  createPresentationTab: createPresentationTab,
}

export { ButtonGroupView }
export default { ButtonGroupView }
