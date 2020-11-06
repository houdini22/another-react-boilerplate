import React from 'react'
import { PageContent } from '../../../layouts/PageLayout/components/index'
import { Row, Col, Section, Table } from '../../../components/index'
import PropTypes from 'prop-types'
import { ComponentsPageHeader } from '../../../components/common/ComponentsPageHeader'
import { createPresentationTab } from '../../../utils/tabs'
import { TableFormContainer } from './TableFormContainer'

class TableView extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            options: {
                color: 'default',
                size: 'md',
                striped: false,
                bordered: false,
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
        const { options } = this.state
        const { color, size, striped, bordered } = options

        return (
            <PageContent>
                <ComponentsPageHeader title="Tabs" component="Tabs" />
                <Section>
                    <Row>
                        <Col xs={6}>
                            <TableFormContainer
                                options={options}
                                setOptions={this.setOptions}
                            />
                        </Col>
                        <Col xs={6}>
                            {createPresentationTab(
                                <span>Options</span>,
                                <Row>
                                    <Col xs={12}>
                                        <Table.Table
                                            bordered={bordered}
                                            striped={striped}
                                            size={size}
                                            color={color}
                                        >
                                            <Table.THead>
                                                <Table.Row>
                                                    <Table.Th xs={3}>
                                                        Test 1
                                                    </Table.Th>
                                                    <Table.Th xs={3}>
                                                        Test 2
                                                    </Table.Th>
                                                    <Table.Th xs={3}>
                                                        Test 3
                                                    </Table.Th>
                                                    <Table.Th xs={3}>
                                                        Test 4
                                                    </Table.Th>
                                                </Table.Row>
                                            </Table.THead>
                                            <Table.TBody>
                                                <Table.Row>
                                                    <Table.Td xs={3}>
                                                        Test 1
                                                    </Table.Td>
                                                    <Table.Td xs={3}>
                                                        Test 2
                                                    </Table.Td>
                                                    <Table.Td xs={3}>
                                                        Test 3
                                                    </Table.Td>
                                                    <Table.Td xs={3}>
                                                        Test 4
                                                    </Table.Td>
                                                </Table.Row>
                                                <Table.Row>
                                                    <Table.Td xs={3}>
                                                        Test 1
                                                    </Table.Td>
                                                    <Table.Td xs={3}>
                                                        Test 2
                                                    </Table.Td>
                                                    <Table.Td xs={3}>
                                                        Test 3
                                                    </Table.Td>
                                                    <Table.Td xs={3}>
                                                        Test 4
                                                    </Table.Td>
                                                </Table.Row>
                                                <Table.Row>
                                                    <Table.Td xs={3}>
                                                        Test 1
                                                    </Table.Td>
                                                    <Table.Td xs={3}>
                                                        Test 2
                                                    </Table.Td>
                                                    <Table.Td xs={3}>
                                                        Test 3
                                                    </Table.Td>
                                                    <Table.Td xs={3}>
                                                        Test 4
                                                    </Table.Td>
                                                </Table.Row>
                                                <Table.Row>
                                                    <Table.Td xs={3}>
                                                        Test 1
                                                    </Table.Td>
                                                    <Table.Td xs={3}>
                                                        Test 2
                                                    </Table.Td>
                                                    <Table.Td xs={3}>
                                                        Test 3
                                                    </Table.Td>
                                                    <Table.Td xs={3}>
                                                        Test 4
                                                    </Table.Td>
                                                </Table.Row>
                                                <Table.Row>
                                                    <Table.Td xs={3}>
                                                        Test 1
                                                    </Table.Td>
                                                    <Table.Td xs={3}>
                                                        Test 2
                                                    </Table.Td>
                                                    <Table.Td xs={3}>
                                                        Test 3
                                                    </Table.Td>
                                                    <Table.Td xs={3}>
                                                        Test 4
                                                    </Table.Td>
                                                </Table.Row>
                                                <Table.Row>
                                                    <Table.Td xs={3}>
                                                        Test 1
                                                    </Table.Td>
                                                    <Table.Td xs={3}>
                                                        Test 2
                                                    </Table.Td>
                                                    <Table.Td xs={3}>
                                                        Test 3
                                                    </Table.Td>
                                                    <Table.Td xs={3}>
                                                        Test 4
                                                    </Table.Td>
                                                </Table.Row>
                                            </Table.TBody>
                                        </Table.Table>
                                    </Col>
                                </Row>,
                                '',
                            )}
                        </Col>
                    </Row>
                </Section>
            </PageContent>
        )
    }
}

export { TableView }
export default { TableView }
