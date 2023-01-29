import * as React from 'react'
import { PageContent } from '../../../layouts/PageLayout/components'
import { Row, Col, Section, Accordion, Badge, Label } from '../../../components'
import {
    createPresentationTab as _createPresentationTab,
    createSimplePresentation,
    generateCode,
} from '../../../utils/tabs'
import { AccordionFormContainer } from './AccordionFormContainer'
import { ComponentsPageHeader } from '../../../components/common/ComponentsPageHeader'

interface AccordionViewProps {
    colSize1?: number
    colSize2?: number
    createPresentationTab?(): any
}

interface AccordionViewState {
    options: {
        color: string
        size: string
        rounded: boolean
        separated: boolean
        type: string
        updateCount: number
        closeIcon: boolean
        outline: boolean
    }
}

class AccordionView extends React.Component<AccordionViewProps, AccordionViewState> {
    constructor(props) {
        super(props)
        this.state = {
            options: {
                color: 'default',
                size: 'md',
                rounded: false,
                separated: false,
                type: 'boxed',
                updateCount: 0,
                closeIcon: false,
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
        const { outline, rounded, color, size, separated, type, closeIcon } = options

        const code = generateCode('Accordion', options)

        return (
            <PageContent>
                <ComponentsPageHeader title="Accordion" component="Accordion" />
                <Row>
                    <Col xs={12} md={6}>
                        <Section>
                            <AccordionFormContainer
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
                                <Accordion.Container
                                    color={color}
                                    outline={outline}
                                    size={size}
                                    rounded={rounded}
                                    separated={separated}
                                    type={type}
                                    closeIcon={closeIcon}
                                >
                                    <Accordion.Item name="Item 1">
                                        <Accordion.ItemHeader>
                                            Item 1 <Badge color="info">13</Badge>
                                        </Accordion.ItemHeader>
                                        <Accordion.ItemContent>Hello!</Accordion.ItemContent>
                                    </Accordion.Item>
                                    <Accordion.Item name="Item 2">
                                        <Accordion.ItemHeader>
                                            Item 2 <Label color="warning">warning</Label>
                                        </Accordion.ItemHeader>
                                        <Accordion.ItemContent>Hello!</Accordion.ItemContent>
                                    </Accordion.Item>
                                    <Accordion.Item name="Item 3">
                                        <Accordion.ItemHeader>Item 3</Accordion.ItemHeader>
                                        <Accordion.ItemContent>Hello!</Accordion.ItemContent>
                                    </Accordion.Item>
                                    <Accordion.Item name="Item 4">
                                        <Accordion.ItemHeader>Item 4</Accordion.ItemHeader>
                                        <Accordion.ItemContent>Hello!</Accordion.ItemContent>
                                    </Accordion.Item>
                                    <Accordion.Item name="Item 5">
                                        <Accordion.ItemHeader>
                                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce justo erat,
                                            sagittis nec erat a, finibus suscipit arcu. Morbi id semper mi. Duis cursus
                                            pharetra nisi, in eleifend velit aliquet sed. Donec rutrum placerat neque,
                                            sed sagittis erat condimentum quis. Donec risus massa, scelerisque sed ante
                                            in, luctus blandit dui.
                                        </Accordion.ItemHeader>
                                        <Accordion.ItemContent>Hello!</Accordion.ItemContent>
                                    </Accordion.Item>
                                </Accordion.Container>,
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

export { AccordionView }
export default { AccordionView }
