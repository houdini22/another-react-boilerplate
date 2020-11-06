import React from 'react'
import { PageContent } from '../../../layouts/PageLayout/components/index'
import { Row, Col, Section } from '../../../components/index'
import { FaFileImage as ImageIcon } from 'react-icons/fa'
import { Tabs } from '../../../components'
import { TabsFormContainer } from './TabsFormContainer'
import PropTypes from 'prop-types'
import { ComponentsPageHeader } from '../../../components/common/ComponentsPageHeader'

class TabsView extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      options: {
        size: 'md',
        color: 'default',
        solid: false,
        block: false,
        aligned: false,
        header: false,
        left: false,
        outline: false,
        updateCount: 0,
        rounded: false,
        below: false,
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
    const { colSize1 } = this.props
    const { options } = this.state
    const {
      size,
      block,
      solid,
      color,
      aligned,
      header,
      left,
      outline,
      rounded,
      below,
    } = options

    return (
      <PageContent>
        <ComponentsPageHeader title="Tabs" component="Tabs" />
        <Section>
          <Row>
            <Col xs={6}>
              <TabsFormContainer
                options={options}
                setOptions={this.setOptions}
              />
            </Col>
            <Col xs={6}>
              <Tabs.Container
                header={
                  header ? (
                    <span>
                      <ImageIcon /> Header
                    </span>
                  ) : null
                }
                size={size}
                block={block}
                color={color}
                solid={solid}
                aligned={aligned}
                left={left}
                outline={outline}
                rounded={rounded}
                below={below}
              >
                <Tabs.Tab name="presentation">
                  <Tabs.Trigger>Presentation</Tabs.Trigger>
                  <Tabs.Content>
                    {({ changeTab }) => (
                      <p>
                        <a
                          href="#"
                          onClick={(e) => {
                            e.preventDefault()
                            changeTab('code')
                          }}
                        >
                          Check the code
                        </a>
                      </p>
                    )}
                  </Tabs.Content>
                </Tabs.Tab>
                <Tabs.Tab name="code">
                  <Tabs.Trigger>Code</Tabs.Trigger>
                  <Tabs.Content>
                    <pre>
                      {`<Tabs.Container header={<h1>Basic</h1>}>
  <Tabs.Tab name="presentation">
    <Tabs.Trigger>Presentation</Tabs.Trigger>
    <Tabs.Content>
      {({ changeTab }) => (
        <p>
          <a
            href="#"
            onClick={e => {
              e.preventDefault()
              changeTab('test2')
            }}
          >
            Check the code
          </a>
        </p>
      )}
    </Tabs.Content>
  </Tabs.Tab>
  <Tabs.Tab name="code">
    <Tabs.Trigger>Code</Tabs.Trigger>
    <Tabs.Content>

    </Tabs.Content>
  </Tabs.Tab>
</Tabs.Container>`}
                    </pre>
                  </Tabs.Content>
                </Tabs.Tab>
                <Tabs.Tab name="content">
                  <Tabs.Trigger>Content</Tabs.Trigger>
                  <Tabs.Content />
                </Tabs.Tab>
                <Tabs.Tab name="details">
                  <Tabs.Trigger>Details</Tabs.Trigger>
                  <Tabs.Content />
                </Tabs.Tab>
              </Tabs.Container>
            </Col>
          </Row>
        </Section>
      </PageContent>
    )
  }
}

TabsView.propTypes = {
  colSize1: PropTypes.number,
  colSize2: PropTypes.number,
}

TabsView.defaultProps = {
  colSize1: 6,
  colSize2: 12,
}

export { TabsView }
export default { TabsView }
