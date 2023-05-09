import * as React from 'react'
import { PageContent } from '../../../layouts/PageLayout/components'
import { Row, Col, Section, Tooltip, Button } from '../../../components'
import { createPresentationTab as _createPresentationTab, generateCode } from '../../../utils/tabs'
import { TooltipFormContainer } from './TooltipFormContainer'
import { ComponentsPageHeader } from '../../../components/common/ComponentsPageHeader'

interface TooltipViewProps {
    colSize1?: number
    colSize2?: number
    createPresentationTab?: any
}

interface TooltipViewState {
    options: {
        outline: boolean
        size: string
        tooltip: string
        placement: string
        trigger: string
        updateCount: number
        color: string
    }
}

class TooltipView extends React.Component<TooltipViewProps, TooltipViewState> {
    constructor(props) {
        super(props)
        this.state = {
            options: {
                outline: false,
                size: 'md',
                tooltip: 'I am the tooltip! I am the tooltip! I am the tooltip!',
                placement: 'top-start',
                trigger: 'hover',
                updateCount: 0,
                color: 'default',
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
        const { outline, color, size, tooltip, placement, trigger } = options

        const code = generateCode('Tooltip', options, '<Button>I have the tooltip</Button>')

        return (
            <PageContent>
                <ComponentsPageHeader title="Tooltip" component="Tooltip" />
                <Row>
                    <Col xs={12} md={6}>
                        <Section>
                            <TooltipFormContainer options={options} setOptions={this.setOptions.bind(this)} colSize1={colSize2} />
                        </Section>
                    </Col>
                    <Col xs={12} md={6}>
                        <Section>
                            {createPresentationTab(
                                <span />,
                                <Tooltip color={color} outline={outline} size={size} tooltip={tooltip} placement={placement} trigger={trigger}>
                                    <Button>I have the tooltip</Button>
                                </Tooltip>,
                                code,
                                {
                                    colSize: colSize1,
                                },
                            )}
                        </Section>
                    </Col>
                </Row>
            </PageContent>
        )
    }
}

export { TooltipView }
export default { TooltipView }
