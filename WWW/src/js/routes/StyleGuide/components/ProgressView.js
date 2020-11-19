import React from 'react'
import { PageContent } from '../../../layouts/PageLayout/components/index'
import { Row, Col, Section, Progress } from '../../../components/index'
import { createPresentationTab, generateCode } from '../../../utils/tabs'
import { ProgressFormContainer } from './ProgressFormContainer'
import PropTypes from 'prop-types'
import { ComponentsPageHeader } from '../../../components/common/ComponentsPageHeader'

class ProgressView extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            options: {
                color: 'default',
                size: 'md',
                progress: 33,
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
        const { size, color, progress } = options

        const code = generateCode('Progress', options)

        return (
            <PageContent>
                <ComponentsPageHeader title="Progress" component="Progress" />
                <Section>
                    <Row>
                        <Col xs={6}>
                            <ProgressFormContainer
                                options={options}
                                setOptions={this.setOptions}
                            />
                        </Col>
                        <Col xs={6}>
                            {createPresentationTab(
                                <span>Options</span>,
                                <Row>
                                    <Col xs={12}>
                                        <Progress
                                            color={color}
                                            size={size}
                                            progress={progress}
                                        />
                                    </Col>
                                </Row>,
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

ProgressView.propTypes = {
    colSize1: PropTypes.number,
    colSize2: PropTypes.number,
    createPresentationTab: PropTypes.func.isRequired,
}

ProgressView.defaultProps = {
    colSize1: 4,
    colSize2: 12,
    createPresentationTab: createPresentationTab,
}

export { ProgressView }
export default { ProgressView }
