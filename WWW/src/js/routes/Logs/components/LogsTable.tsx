import * as React from 'react'
import { Button, Col, Popover, Row, Table } from '../../../components'
import { DetailsIcon } from '../../../components/icons'
import { TableSummary } from '../../../components/common/List/TableSummary'
import { formatDateTimeAPI } from '../../../helpers/date-time'
import { Log } from '../../../../types.d'

interface LogsTableProps {
    data: Array<Log>
    page: number
    perPage: number
    total: number
    totalPages: number
}

export class LogsTable extends React.Component<LogsTableProps, null> {
    render() {
        const { page, perPage, total, totalPages, data } = this.props

        return (
            <Table.Container bordered striped>
                <Table.THead>
                    <Table.Tr>
                        <Table.Th xs={1}>ID</Table.Th>
                        <Table.Th xs={2}>Type</Table.Th>
                        <Table.Th xs={2}>User</Table.Th>
                        <Table.Th xs={2}>IP</Table.Th>
                        <Table.Th xs={3}>Date</Table.Th>
                        <Table.Th xs={2}>Actions</Table.Th>
                    </Table.Tr>
                </Table.THead>
                <Table.TBody>
                    {data?.map((log) => (
                        <Table.Tr key={log.id}>
                            <Table.Td xs={1}>{log.id}</Table.Td>
                            <Table.Td xs={2}>
                                <div>{log.type}</div>
                            </Table.Td>
                            <Table.Td xs={2}>
                                <div>
                                    {log?.user?.name}
                                    {!log?.user?.name && <>---</>}
                                </div>
                            </Table.Td>
                            <Table.Td xs={2}>
                                <div>{log?.ip_address}</div>
                            </Table.Td>
                            <Table.Td xs={3}>
                                <div>{formatDateTimeAPI(log.created_at)}</div>
                            </Table.Td>
                            <Table.Td xs={2}>
                                <Popover.Container placement={'left-center'} pixelsWidth={300} trigger={'hover'}>
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
                    ))}
                </Table.TBody>
                <TableSummary page={page} perPage={perPage} total={total} totalPages={totalPages} />
            </Table.Container>
        )
    }
}

export default LogsTable
