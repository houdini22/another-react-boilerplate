import React from 'react'
import PropTypes from 'prop-types'
import { PageContent } from '../../../layouts/PageLayout/components/index'
import { Row, Col, Section, Table } from '../../../components/index'
import { createPresentationTab, generateCode } from '../../../utils/tabs'
import { TableFormContainer } from './TableFormContainer'
import { ComponentsPageHeader } from '../../../components/common/ComponentsPageHeader'

class TableView extends React.Component {
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
        const { colSize1, colSize2, createPresentationTab } = this.props
        const { options } = this.state
        const { bordered, color, size, striped } = options

        const code = generateCode('Table', options)

        return (
            <PageContent>
                <ComponentsPageHeader title="Table" component="Table" />
                <Section>
                    <Row>
                        <Col xs={6}>
                            <TableFormContainer
                                options={options}
                                setOptions={this.setOptions.bind(this)}
                                colSize1={colSize2}
                            />
                        </Col>
                        <Col xs={6}>
                            {createPresentationTab(
                                <span />,
                                <Table.Container
                                    color={color}
                                    size={size}
                                    bordered={bordered}
                                    striped={striped}
                                >
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
                                    </Table.TBody>
                                </Table.Container>,
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

TableView.propTypes = {
    colSize1: PropTypes.number,
    colSize2: PropTypes.number,
    createPresentationTab: PropTypes.func.isRequired,
}

TableView.defaultProps = {
    colSize1: 4,
    colSize2: 12,
    createPresentationTab: createPresentationTab,
}

export { TableView }
export default { TableView }
