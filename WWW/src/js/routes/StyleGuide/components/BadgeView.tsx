import * as React from "react"
import { PageContent } from '../../../layouts/PageLayout/components'
import { Row, Col, Section, Badge, Label } from '../../../components'
import { createPresentationTab as _createPresentationTab, generateCode } from '../../../utils/tabs'
import { BadgeFormContainer } from './BadgeFormContainer'
import { ComponentsPageHeader } from '../../../components/common/ComponentsPageHeader'

interface BadgeViewProps {
    colSize1: number;
    colSize2: number;
    createPresentationTab(): any;
}

interface BadgeViewState {
    options: {
        color: string;
        outline: boolean;
        href: string;
        size: string;
        arrow: boolean;
        right: boolean;
        updateCount: number;
        rounded: boolean;
        roundless: boolean;
    },
}

class BadgeView extends React.Component<BadgeViewProps, BadgeViewState> {
    constructor(props) {
        super(props)
        this.state = {
            options: {
                color: 'default',
                outline: false,
                href: '',
                size: 'md',
                arrow: false,
                right: false,
                updateCount: 0,
                rounded: false,
                roundless: false,
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
        const {
            color,
            outline,
            href,
            size,
            arrow,
            right,
            rounded,
            roundless,
        } = options

        const code = generateCode('Badge', options)

        return (
            <PageContent>
                <ComponentsPageHeader title="Badge" component="Badge" />
                <Section>
                    <Row>
                        <Col xs={6}>
                            <BadgeFormContainer
                                options={options}
                                setOptions={this.setOptions.bind(this)}
                                colSize1={colSize2}
                            />
                        </Col>
                        <Col xs={6}>
                            {createPresentationTab(
                                <span />,
                                <p style={{ position: 'relative' }}>
                                    Content{' '}
                                    <Badge
                                        key={color}
                                        color={color}
                                        outline={outline}
                                        href={href}
                                        size={size}
                                        arrow={arrow}
                                        right={right}
                                        rounded={rounded}
                                        roundless={roundless}
                                    >
                                        {color} {size}
                                    </Badge>
                                </p>,
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

export { BadgeView }
export default { BadgeView }
