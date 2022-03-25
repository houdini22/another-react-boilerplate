import * as React from 'react'
import { PageContent } from '../../../layouts/PageLayout/components'
import { Row, Col, Section, Button, ButtonGroup } from '../../../components'
import { ButtonGroupFormContainer } from './ButtonGroupFormContainer'
import { createPresentationTab as _createPresentationTab } from '../../../utils/tabs'
import { ComponentsPageHeader } from '../../../components/common/ComponentsPageHeader'

interface ButtonGroupViewProps {
    colSize1?: number
    colSize2?: number
    createPresentationTab?(): any
}

interface ButtonGroupViewState {
    options: {
        color: string
        size: string
        outline: boolean
        block: boolean
        roudless: boolean
        rounded: boolean
        isLoading: boolean
        disabled: boolean
        borderless: boolean
        updateCount: number
    }
}

class ButtonGroupView extends React.Component<
    ButtonGroupViewProps,
    ButtonGroupViewState
> {
    constructor(props) {
        super(props)
        this.state = {
            options: {
                color: 'default',
                size: 'md',
                outline: false,
                block: false,
                roudless: false,
                rounded: false,
                isLoading: false,
                disabled: false,
                borderless: false,
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
        const {
            size,
            outline,
            block,
            rounded,
            roundless,
            isLoading,
            disabled,
            borderless,
            color,
        } = options

        return (
            <PageContent>
                <ComponentsPageHeader
                    title="ButtonGroup"
                    component="ButtonGroup"
                />
                <Section>
                    <Row>
                        <Col xs={6}>
                            <ButtonGroupFormContainer
                                options={options}
                                setOptions={this.setOptions}
                            />
                        </Col>
                        <Col xs={6}>
                            {createPresentationTab(
                                <span>Options</span>,
                                <ButtonGroup
                                    color={color}
                                    size={size}
                                    outline={outline}
                                    block={block}
                                    rounded={rounded}
                                    roundless={roundless}
                                    isLoading={isLoading}
                                    disabled={disabled}
                                    borderless={borderless}
                                >
                                    <Button>
                                        First {color} {size}
                                    </Button>
                                    <Button>
                                        Second {color} {size}
                                    </Button>
                                    <Button>
                                        Third {color} {size}
                                    </Button>
                                </ButtonGroup>,
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

export { ButtonGroupView }
export default { ButtonGroupView }
