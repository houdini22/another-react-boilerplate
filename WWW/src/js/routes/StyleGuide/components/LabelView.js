import React from 'react'
import { PageContent } from '../../../layouts/PageLayout/components/index'
import { Row, Col, Section, Label } from '../../../components/index'
import { createPresentationTab } from '../../../utils/tabs'
import { LabelFormContainer } from './LabelFormContainer'
import PropTypes from 'prop-types'
import { ComponentsPageHeader } from '../../../components/common/ComponentsPageHeader'

class LabelView extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            options: {
                color: 'default',
                size: 'md',
                rounded: false,
                roundless: false,
                block: false,
                href: '',
                striped: false,
                outline: false,
                arrow: false,
                updateCount: 0,
            },
        }
        this.setOptions = this.setOptions.bind(this)
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
        const { colSize1, createPresentationTab } = this.props
        const { options } = this.state
        const {
            color,
            size,
            rounded,
            roundless,
            block,
            href,
            striped,
            outline,
            arrow,
        } = options

        return (
            <PageContent>
                <ComponentsPageHeader title="Label" component="Label" />
                <Section>
                    <Row>
                        <Col xs={6}>
                            <LabelFormContainer
                                options={options}
                                setOptions={this.setOptions}
                            />
                        </Col>
                        <Col xs={6}>
                            {createPresentationTab(
                                <span>
                                    Options
                                    {rounded && (
                                        <Label size="xs" color="info">
                                            rounded
                                        </Label>
                                    )}
                                    {roundless && (
                                        <Label size="xs" color="info">
                                            roundless
                                        </Label>
                                    )}
                                    {block && (
                                        <Label size="xs" color="info">
                                            block
                                        </Label>
                                    )}
                                    {href && (
                                        <Label size="xs" color="info">
                                            href
                                        </Label>
                                    )}
                                    {striped && (
                                        <Label size="xs" color="info">
                                            striped
                                        </Label>
                                    )}
                                    {outline && (
                                        <Label size="xs" color="info">
                                            outline
                                        </Label>
                                    )}
                                </span>,
                                <Label
                                    style={{ marginBottom: '10px' }}
                                    color={color}
                                    size={size}
                                    rounded={rounded}
                                    roundless={roundless}
                                    block={block}
                                    href={href}
                                    striped={striped}
                                    outline={outline}
                                    arrow={arrow}
                                >
                                    {color} {size}
                                </Label>,
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

LabelView.propTypes = {
    colSize1: PropTypes.number,
    colSize2: PropTypes.number,
    createPresentationTab: PropTypes.func.isRequired,
}

LabelView.defaultProps = {
    colSize1: 4,
    colSize2: 12,
    createPresentationTab: createPresentationTab,
}

export { LabelView }
export default { LabelView }
