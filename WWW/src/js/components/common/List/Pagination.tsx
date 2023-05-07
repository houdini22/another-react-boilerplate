import * as React from 'react'
import styles from '../../../../assets/scss/components/_list_manager.scss'
import classNames from 'classnames/bind'
import { Button, Col, Row } from '../../../components'
import { SetPage } from '../../../../types.d'

const cx = classNames.bind(styles)

interface PaginationProps {
    hasPrevPage: boolean
    setPage: SetPage
    page: number
    totalPages: number
    hasNextPage: boolean
}

class Pagination extends React.Component<PaginationProps, null> {
    render() {
        const { hasPrevPage, setPage, page, links, hasNextPage } = this.props
        return (
            <div className={cx('pagination')}>
                <Row>
                    <Col xs={2}>
                        <Button
                            disabled={!hasPrevPage}
                            color={'secondary'}
                            onClick={() => {
                                setPage(page - 1)
                            }}
                        >
                            Previous
                        </Button>
                    </Col>
                    <Col xs={8} className={cx('pages')}>
                        {links.map(({ label, active, url }, i) => {
                            if (url === null && label === '...') {
                                return (
                                    <Button transparent disabled key={`${i}...`}>
                                        ...
                                    </Button>
                                )
                            }
                            if (!label.match(/^[0-9]+$/)) {
                                return null
                            }
                            return (
                                <Button
                                    color={'secondary'}
                                    disabled={active}
                                    key={label}
                                    onClick={() => {
                                        setPage(Number(label))
                                    }}
                                >
                                    {label}
                                </Button>
                            )
                        })}
                    </Col>
                    <Col xs={2} style={{ textAlign: 'right' }}>
                        <Button
                            disabled={!hasNextPage}
                            color={'secondary'}
                            onClick={() => {
                                setPage(page + 1)
                            }}
                        >
                            Next
                        </Button>
                    </Col>
                </Row>
            </div>
        )
    }
}

export default { Pagination }
export { Pagination }
