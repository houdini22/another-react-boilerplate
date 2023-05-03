import * as React from 'react'
import styles from '../../../../assets/scss/components/_list_manager.scss'
import classNames from 'classnames/bind'
import { Table } from '../../index'

const cx = classNames.bind(styles)

interface TableSummaryProps {
    children?: any
    page: number
    perPage: number
    total: number
    totalPages: number
}

class TableSummary extends React.Component<TableSummaryProps, null> {
    render() {
        const { children, page, perPage, total, totalPages } = this.props
        return (
            <Table.TFoot alignRight>
                <Table.Tr>
                    <Table.Td xs={12}>
                        Records:{' '}
                        <b>
                            {(page - 1) * perPage + 1} - {Math.min(perPage * page, total)} / {total}
                        </b>
                        <br />
                        Total pages: <b>{totalPages}</b>
                        <br />
                        {children}
                    </Table.Td>
                </Table.Tr>
            </Table.TFoot>
        )
    }
}

export { TableSummary }
