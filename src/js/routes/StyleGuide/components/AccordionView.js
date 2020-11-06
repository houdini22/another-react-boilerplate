import React from 'react'
import PropTypes from 'prop-types'
import { PageContent } from '../../../layouts/PageLayout/components/index'
import {
    Row,
    Col,
    Section,
    Accordion,
    Badge,
    Label,
} from '../../../components/index'
import { createPresentationTab, generateCode } from '../../../utils/tabs'
import { AccordionFormContainer } from './AccordionFormContainer'
import { ComponentsPageHeader } from '../../../components/common/ComponentsPageHeader'

class AccordionView extends React.Component {
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
        const { colSize1, colSize2, createPresentationTab } = this.props
        const { options } = this.state
        const {
            outline,
            rounded,
            color,
            size,
            separated,
            type,
            closeIcon,
        } = options

        const code = generateCode('Accordion', options)

        return (
            <PageContent>
                <ComponentsPageHeader title="Accordion" component="Accordion" />
                <Section>
                    <Row>
                        <Col xs={6}>
                            <AccordionFormContainer
                                options={options}
                                setOptions={this.setOptions.bind(this)}
                                colSize1={colSize2}
                            />
                        </Col>
                        <Col xs={6}>
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
                                            Item 1{' '}
                                            <Badge color="info">13</Badge>
                                        </Accordion.ItemHeader>
                                        <Accordion.ItemContent>
                                            Hello!
                                        </Accordion.ItemContent>
                                    </Accordion.Item>
                                    <Accordion.Item name="Item 2">
                                        <Accordion.ItemHeader>
                                            Item 2{' '}
                                            <Label color="warning">
                                                warning
                                            </Label>
                                        </Accordion.ItemHeader>
                                        <Accordion.ItemContent>
                                            Hello!
                                        </Accordion.ItemContent>
                                    </Accordion.Item>
                                    <Accordion.Item name="Item 3">
                                        <Accordion.ItemHeader>
                                            Item 3
                                        </Accordion.ItemHeader>
                                        <Accordion.ItemContent>
                                            Hello!
                                        </Accordion.ItemContent>
                                    </Accordion.Item>
                                    <Accordion.Item name="Item 4">
                                        <Accordion.ItemHeader>
                                            Item 4
                                        </Accordion.ItemHeader>
                                        <Accordion.ItemContent>
                                            Hello!
                                        </Accordion.ItemContent>
                                    </Accordion.Item>
                                    <Accordion.Item name="Item 5">
                                        <Accordion.ItemHeader>
                                            Lorem ipsum dolor sit amet,
                                            consectetur adipiscing elit. Fusce
                                            justo erat, sagittis nec erat a,
                                            finibus suscipit arcu. Morbi id
                                            semper mi. Duis cursus pharetra
                                            nisi, in eleifend velit aliquet sed.
                                            Donec rutrum placerat neque, sed
                                            sagittis erat condimentum quis.
                                            Donec risus massa, scelerisque sed
                                            ante in, luctus blandit dui.
                                        </Accordion.ItemHeader>
                                        <Accordion.ItemContent>
                                            Hello!
                                        </Accordion.ItemContent>
                                    </Accordion.Item>
                                </Accordion.Container>,
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

AccordionView.propTypes = {
    colSize1: PropTypes.number,
    colSize2: PropTypes.number,
    createPresentationTab: PropTypes.func.isRequired,
}

AccordionView.defaultProps = {
    colSize1: 4,
    colSize2: 12,
    createPresentationTab: createPresentationTab,
}

export { AccordionView }
export default { AccordionView }
