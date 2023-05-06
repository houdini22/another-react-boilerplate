import * as React from 'react'
import { Button, Col, Popover, Row, Table, Tooltip } from '../../../components'
import { DetailsIcon } from '../../../components/icons'
import { TableSummary } from '../../../components/common/List/TableSummary'
import { formatDateTime, formatDateTimeAPI } from '../../../helpers/date-time'

interface PermissionsTableProps {}

export class LogsTable extends React.Component<PermissionsTableProps, null> {
    render() {
        const { page, perPage, total, totalPages, data } = this.props

        return (
            <Table.Container bordered striped>
                <Table.THead>
                    <Table.Tr>
                        <Table.Th xs={1}>ID</Table.Th>
                        <Table.Th xs={3}>Type</Table.Th>
                        <Table.Th xs={3}>User</Table.Th>
                        <Table.Th xs={3}>Date</Table.Th>
                        <Table.Th xs={2}>Actions</Table.Th>
                    </Table.Tr>
                </Table.THead>
                <Table.TBody>
                    {data.map((log) => {
                        return (
                            <Table.ExpandManager key={`expand-manager-${log.id}`}>
                                {({ addExpand, expand }) => {
                                    return (
                                        <Table.Tr key={log.id}>
                                            <Table.Td xs={1}>{log.id}</Table.Td>
                                            <Table.Td xs={3}>
                                                <div>{log.type}</div>
                                            </Table.Td>
                                            <Table.Td xs={3}>
                                                <div>
                                                    {log?.user?.name}
                                                    {!log?.user?.name && <>---</>}
                                                </div>
                                            </Table.Td>
                                            <Table.Td xs={3}>
                                                <div>{formatDateTimeAPI(log.created_at)}</div>
                                            </Table.Td>
                                            <Table.Td xs={2}>
                                                <Popover.Container
                                                    placement={'left-center'}
                                                    pixelsWidth={300}
                                                    trigger={'hover'}
                                                >
                                                    <Popover.Trigger>
                                                        <Button icon={<DetailsIcon />} iconOnly color={'info'} />
                                                    </Popover.Trigger>
                                                    <Popover.Content>
                                                        <Row>
                                                            <Col xs={5}>Message:</Col>
                                                            <Col xs={7}>{log.message || '---'}</Col>
                                                        </Row>
                                                        <Row>
                                                            <Col xs={5}>Model:</Col>
                                                            <Col xs={7}>{log.model_class_name || '---'}</Col>
                                                        </Row>
                                                        <Row>
                                                            <Col xs={5}>Model ID:</Col>
                                                            <Col xs={7}>{log.model_id || '---'}</Col>
                                                        </Row>
                                                        <Row>
                                                            <Col xs={5}>Related Model:</Col>
                                                            <Col xs={7}>{log.related_model_class_name || '---'}</Col>
                                                        </Row>
                                                        <Row>
                                                            <Col xs={5}>Model ID:</Col>
                                                            <Col xs={7}>{log.related_model_id || '---'}</Col>
                                                        </Row>
                                                    </Popover.Content>
                                                </Popover.Container>
                                            </Table.Td>
                                        </Table.Tr>
                                    )
                                }}
                            </Table.ExpandManager>
                        )
                    })}
                </Table.TBody>
                <TableSummary page={page} perPage={perPage} total={total} totalPages={totalPages} />
            </Table.Container>
        )
    }
}

export default LogsTable
