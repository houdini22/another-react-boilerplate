import * as React from 'react'
import { PageContent } from '../../../layouts/PageLayout/components'
import { Row, Col, Section, Alert, Label, Tabs } from '../../../components'
import { createPresentationTab as _createPresentationTab, generateCode } from '../../../utils/tabs'
import { FaGlobe as AlertIcon } from 'react-icons/fa'
import { AlertFormContainer } from './AlertFormContainer'
import { ComponentsPageHeader } from '../../../components/common/ComponentsPageHeader'

interface AlertViewProps {
    colSize1?: number
    colSize2?: number
    createPresentationTab?(): any
}

interface AlertViewState {
    options: {
        color: string
        outline: boolean
        withIcon: boolean
        withIconArrow: boolean
        iconHighlighted: boolean
        rounded: boolean
        closeIcon: boolean
        updateCount: number
        size: string
    }
}

class AlertView extends React.Component<AlertViewProps, AlertViewState> {
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
        const { colSize1 = 4, colSize2 = 12, createPresentationTab = _createPresentationTab } = this.props
        const { options } = this.state
        const { outline, withIcon, withIconArrow, iconHighlighted, rounded, closeIcon, color, size } = options

        const code = generateCode(
            'Alert',
            options,
            `<h4>This is an alert!</h4>
                <div>Some content...</div>`,
        )

        return (
            <PageContent>
                <ComponentsPageHeader title="Alert" component="Alert" />
                <Row>
                    <Col xs={12} md={6}>
                        <Section>
                            <AlertFormContainer
                                options={options}
                                setOptions={this.setOptions.bind(this)}
                                colSize1={colSize2}
                            />
                        </Section>
                    </Col>
                    <Col xs={12} md={6}>
                        <Section>
                            {createPresentationTab(
                                <span />,
                                <Alert
                                    color={color}
                                    outline={outline}
                                    withIcon={withIcon ? <AlertIcon /> : undefined}
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
                        </Section>
                    </Col>
                </Row>
                <Row>
                    <Col xs={12} md={6}>
                        <Section>
                            <Tabs.Container left solid color="default" header="Custom">
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
                                            onClickClose={({ close, setIsLoading }) => {
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
                        </Section>
                    </Col>
                </Row>
            </PageContent>
        )
    }
}

export { AlertView }
export default { AlertView }
