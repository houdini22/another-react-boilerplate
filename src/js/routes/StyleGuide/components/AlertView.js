import React from 'react'
import PropTypes from 'prop-types'
import { PageContent } from '../../../layouts/PageLayout/components/index'
import {
    Row,
    Col,
    Section,
    Alert,
    Label,
    Tabs,
} from '../../../components/index'
import { createPresentationTab, generateCode } from '../../../utils/tabs'
import { FaGlobe as AlertIcon } from 'react-icons/fa'
import { AlertFormContainer } from './AlertFormContainer'
import { ComponentsPageHeader } from '../../../components/common/ComponentsPageHeader'

class AlertView extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            options: {
                color: 'default',
                outline: false,
                withIcon: false,
                withIconArrow: false,
                iconHighlighted: false,
                rounded: false,
                closeIcon: false,
                updateCount: 0,
                size: 'md',
            },
        }
    }

    setOptions(newOptions) {
        const {
            options: { updateCount },
        } = this.state
        this.setState({
            options: { ...newOptions, updateCount: updateCount + 1 },
        })
    }

    render() {
        const { colSize1, colSize2, createPresentationTab } = this.props
        const { options } = this.state
        const {
            outline,
            withIcon,
            withIconArrow,
            iconHighlighted,
            rounded,
            closeIcon,
            color,
            size,
        } = options

        const code = generateCode('Alert', options)

        return (
            <PageContent>
                <ComponentsPageHeader title="Alert" component="Alert" />
                <Section>
                    <Row>
                        <Col xs={6}>
                            <AlertFormContainer
                                options={options}
                                setOptions={this.setOptions.bind(this)}
                                colSize1={colSize2}
                            />
                        </Col>
                        <Col xs={6}>
                            {createPresentationTab(
                                <span />,
                                <Alert
                                    color={color}
                                    outline={outline}
                                    withIcon={
                                        withIcon ? <AlertIcon /> : undefined
                                    }
                                    withIconArrow={withIconArrow}
                                    iconHighlighted={iconHighlighted}
                                    rounded={rounded}
                                    closeIcon={closeIcon}
                                    size={size}
                                >
                                    <h4>This is an alert!</h4>
                                    <div>Some content...</div>
                                </Alert>,
                                code,
                                {
                                    colSize: colSize1,
                                },
                            )}
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={6}>
                            <Tabs.Container
                                left
                                solid
                                color="default"
                                header="Custom"
                            >
                                <Tabs.Tab name="onClickClose">
                                    <Tabs.Trigger>onClickClose</Tabs.Trigger>
                                    <Tabs.Content>
                                        <Alert
                                            color="primary"
                                            closeIcon
                                            onClickClose={({ close }) => {
                                                close()
                                            }}
                                        >
                                            Simple onClickClose
                                        </Alert>

                                        <pre>
                                            {`<Alert
  color="primary"
  closeIcon
  onClickClose={({ close }) => {
    close()
  }}
>
  Simple onClickClose
</Alert>`}
                                        </pre>
                                    </Tabs.Content>
                                </Tabs.Tab>
                                <Tabs.Tab name="Smart onClickClose">
                                    <Tabs.Trigger>onClickClose</Tabs.Trigger>
                                    <Tabs.Content>
                                        <Alert
                                            color="primary"
                                            closeIcon
                                            onClickClose={({
                                                close,
                                                setIsLoading,
                                            }) => {
                                                setIsLoading(true)
                                                setTimeout(() => {
                                                    close()
                                                }, 3000)
                                            }}
                                        >
                                            Smart onClickClose
                                        </Alert>

                                        <pre>
                                            {`<Alert
  color="primary"
  closeIcon
  onClickClose={({ close, setIsLoading }) => {
    setIsLoading(true)
    setTimeout(() => {
      close()
    }, 3000)
  }}
>
  Smart onClickClose
</Alert>`}
                                        </pre>
                                    </Tabs.Content>
                                </Tabs.Tab>
                            </Tabs.Container>
                        </Col>
                    </Row>
                </Section>
            </PageContent>
        )
    }
}

AlertView.propTypes = {
    colSize1: PropTypes.number,
    colSize2: PropTypes.number,
    createPresentationTab: PropTypes.func.isRequired,
}

AlertView.defaultProps = {
    colSize1: 4,
    colSize2: 12,
    createPresentationTab: createPresentationTab,
}

export { AlertView }
export default { AlertView }
