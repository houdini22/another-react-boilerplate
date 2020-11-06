import React from 'react'
import { PageContent } from '../../../layouts/PageLayout/components/index'
import { Row, Col, Section, Badge, Label } from '../../../components/index'
import { createPresentationTab, generateCode } from '../../../utils/tabs'
import { BadgeFormContainer } from './BadgeFormContainer'
import PropTypes from 'prop-types'
import { ComponentsPageHeader } from '../../../components/common/ComponentsPageHeader'

class BadgeView extends React.Component {
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
        const { color, outline, href, size, arrow, right, rounded } = options

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

BadgeView.propTypes = {
    colSize1: PropTypes.number,
    colSize2: PropTypes.number,
    createPresentationTab: PropTypes.func.isRequired,
}

BadgeView.defaultProps = {
    colSize1: 4,
    colSize2: 12,
    createPresentationTab: createPresentationTab,
}

export { BadgeView }
export default { BadgeView }
