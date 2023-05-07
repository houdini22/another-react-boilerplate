import * as React from 'react'
import { PageContent } from '../../../layouts/PageLayout/components'
import { Row, Col, Section, Table } from '../../../components'
import { createPresentationTab as _createPresentationTab, generateCode } from '../../../utils/tabs'
import { TableFormContainer } from './TableFormContainer'
import { ComponentsPageHeader } from '../../../components/common/ComponentsPageHeader'

interface TableViewProps {
    colSize1?: number
    colSize2?: number
    createPresentationTab?: any
}

interface TableViewState {
    options: {
        color: string
        size: string
        bordered: boolean
        striped: boolean
        updateCount: number
    }
}

class TableView extends React.Component<TableViewProps, TableViewState> {
    constructor(props) {
        super(props)
        this.state = {
            options: {
                color: 'default',
                size: 'md',
                bordered: false,
                striped: false,
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
        const { colSize1 = 4, colSize2 = 12, createPresentationTab = _createPresentationTab } = this.props
        const { options } = this.state
        const { bordered, color, size, striped } = options

        const code = generateCode(
            'Table',
            options,
            `<Table.THead>
                    <Table.Tr>
                        <Table.Th xs={4}>Header 1</Table.Th>
                        <Table.Th xs={4}>Header 2</Table.Th>
                        <Table.Th xs={4}>Header 3</Table.Th>
                    </Table.Tr>
                </Table.THead>
                <Table.TBody>
                    <Table.Tr>
                        <Table.Td xs={4}>col 1</Table.Td>
                        <Table.Td xs={4}>col 2</Table.Td>
                        <Table.Td xs={4}>col 3</Table.Td>
                    </Table.Tr>
                    <Table.Tr>
                        <Table.Td xs={4}>col 1</Table.Td>
                        <Table.Td xs={4}>col 2</Table.Td>
                        <Table.Td xs={4}>col 3</Table.Td>
                    </Table.Tr>
                    <Table.Tr>
                        <Table.Td xs={4}>col 1</Table.Td>
                        <Table.Td xs={4}>col 2</Table.Td>
                        <Table.Td xs={4}>col 3</Table.Td>
                    </Table.Tr>
                    <Table.Tr>
                        <Table.Td xs={4}>col 1</Table.Td>
                        <Table.Td xs={4}>col 2</Table.Td>
                        <Table.Td xs={4}>col 3</Table.Td>
                    </Table.Tr>
                    <Table.Tr color="success">
                        <Table.Td xs={4}>
                            contextual
                        </Table.Td>
                        <Table.Td xs={4}>success</Table.Td>
                        <Table.Td xs={4}>color</Table.Td>
                    </Table.Tr>
                    <Table.Tr>
                        <Table.Td xs={4}>col 1</Table.Td>
                        <Table.Td xs={4}>col 2</Table.Td>
                        <Table.Td xs={4}>col 3</Table.Td>
                    </Table.Tr>
                </Table.TBody>`,
        )

        return (
            <PageContent>
                <ComponentsPageHeader title="Table" component="Table" />
                <Row>
                    <Col xs={12} md={6}>
                        <Section>
                            <TableFormContainer options={options} setOptions={this.setOptions.bind(this)} colSize1={colSize2} />
                        </Section>
                    </Col>
                    <Col xs={12} md={6}>
                        <Section>
                            {createPresentationTab(
                                <span />,
                                <Table.Container color={color} size={size} bordered={bordered} striped={striped}>
                                    <Table.THead>
                                        <Table.Tr>
                                            <Table.Th xs={4}>Header 1</Table.Th>
                                            <Table.Th xs={4}>Header 2</Table.Th>
                                            <Table.Th xs={4}>Header 3</Table.Th>
                                        </Table.Tr>
                                    </Table.THead>
                                    <Table.TBody>
                                        <Table.Tr>
                                            <Table.Td xs={4}>col 1</Table.Td>
                                            <Table.Td xs={4}>col 2</Table.Td>
                                            <Table.Td xs={4}>col 3</Table.Td>
                                        </Table.Tr>
                                        <Table.Tr>
                                            <Table.Td xs={4}>col 1</Table.Td>
                                            <Table.Td xs={4}>col 2</Table.Td>
                                            <Table.Td xs={4}>col 3</Table.Td>
                                        </Table.Tr>
                                        <Table.Tr>
                                            <Table.Td xs={4}>col 1</Table.Td>
                                            <Table.Td xs={4}>col 2</Table.Td>
                                            <Table.Td xs={4}>col 3</Table.Td>
                                        </Table.Tr>
                                        <Table.Tr>
                                            <Table.Td xs={4}>col 1</Table.Td>
                                            <Table.Td xs={4}>col 2</Table.Td>
                                            <Table.Td xs={4}>col 3</Table.Td>
                                        </Table.Tr>
                                        <Table.Tr color="success">
                                            <Table.Td xs={4}>contextual</Table.Td>
                                            <Table.Td xs={4}>success</Table.Td>
                                            <Table.Td xs={4}>color</Table.Td>
                                        </Table.Tr>
                                        <Table.Tr>
                                            <Table.Td xs={4}>col 1</Table.Td>
                                            <Table.Td xs={4}>col 2</Table.Td>
                                            <Table.Td xs={4}>col 3</Table.Td>
                                        </Table.Tr>
                                    </Table.TBody>
                                </Table.Container>,
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

export { TableView }
export default { TableView }
