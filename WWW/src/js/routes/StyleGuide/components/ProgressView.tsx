import * as React from 'react'
import { PageContent } from '../../../layouts/PageLayout/components'
import { Row, Col, Section, Progress } from '../../../components'
import {
    createPresentationTab as _createPresentationTab,
    generateCode,
} from '../../../utils/tabs'
import { ProgressFormContainer } from './ProgressFormContainer'
import { ComponentsPageHeader } from '../../../components/common/ComponentsPageHeader'

interface ProgressViewProps {
    colSize1?: number
    colSize2?: number
    createPresentationTab?(): any
}

interface ProgressViewState {
    options: {
        color: string
        size: string
        progress: number
        updateCount: number
    }
}

class ProgressView extends React.Component<
    ProgressViewProps,
    ProgressViewState
> {
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
        const { colSize1 = 4, createPresentationTab = _createPresentationTab } =
            this.props
        const { options } = this.state
        const { size, color, progress } = options

        const code = generateCode('Progress', options)

        return (
            <PageContent>
                <ComponentsPageHeader title="Progress" component="Progress" />
                <Row>
                    <Col xs={12} md={6}>
                        <Section>
                            <ProgressFormContainer
                                options={options}
                                setOptions={this.setOptions}
                            />
                        </Section>
                    </Col>
                    <Col xs={12} md={6}>
                        <Section>
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
                        </Section>
                    </Col>
                </Row>
            </PageContent>
        )
    }
}

export { ProgressView }
export default { ProgressView }
