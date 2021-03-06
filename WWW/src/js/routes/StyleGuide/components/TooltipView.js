import React from 'react'
import PropTypes from 'prop-types'
import { PageContent } from '../../../layouts/PageLayout/components/index'
import { Row, Col, Section, Tooltip, Button } from '../../../components/index'
import { createPresentationTab, generateCode } from '../../../utils/tabs'
import { TooltipFormContainer } from './TooltipFormContainer'
import { ComponentsPageHeader } from '../../../components/common/ComponentsPageHeader'

class TooltipView extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            options: {
                outline: false,
                size: 'md',
                tooltip:
                    'I am the tooltip! I am the tooltip! I am the tooltip!',
                placement: 'top-start',
                trigger: 'hover',
                updateCount: 0,
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
        const { outline, color, size, tooltip, placement, trigger } = options

        const code = generateCode(
            'Tooltip',
            options,
            '<Button>I have the tooltip</Button>',
        )

        return (
            <PageContent>
                <ComponentsPageHeader title="Tooltip" component="Tooltip" />
                <Section>
                    <Row>
                        <Col xs={6}>
                            <TooltipFormContainer
                                options={options}
                                setOptions={this.setOptions.bind(this)}
                                colSize1={colSize2}
                            />
                        </Col>
                        <Col xs={6}>
                            {createPresentationTab(
                                <span />,
                                <Tooltip
                                    color={color}
                                    outline={outline}
                                    size={size}
                                    tooltip={tooltip}
                                    placement={placement}
                                    trigger={trigger}
                                >
                                    <Button>I have the tooltip</Button>
                                </Tooltip>,
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

TooltipView.propTypes = {
    colSize1: PropTypes.number,
    colSize2: PropTypes.number,
    createPresentationTab: PropTypes.func.isRequired,
}

TooltipView.defaultProps = {
    colSize1: 4,
    colSize2: 12,
    createPresentationTab: createPresentationTab,
}

export { TooltipView }
export default { TooltipView }
