import * as React from 'react'
import styles from '../../../../assets/scss/components/_list_manager.scss'
import classNames from 'classnames/bind'
import { Button, Col, Row } from '../../../components'
import { SetPage } from '../../../../types.d'
import { LeftArrowIcon, RightArrowIcon } from '../../icons'

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
                        <div>
                            <Button
                                icon={<LeftArrowIcon />}
                                iconOnly
                                disabled={!hasPrevPage}
                                color={'secondary'}
                                onClick={() => {
                                    setPage(page - 1)
                                }}
                            />
                        </div>
                    </Col>
                    <Col xs={8} className={cx('pages')}>
                        <div>
                            {links?.map(({ label, active, url }, i) => {
                                if (url === null && label === '...') {
                                    return (
                                        <Button transparent disabled key={`${i}...`}>
                                            <div>
                                                <strong>...</strong>
                                            </div>
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
                                        <div>{label}</div>
                                    </Button>
                                )
                            })}
                        </div>
                    </Col>
                    <Col xs={2} style={{ textAlign: 'right' }}>
                        <div>
                            <Button
                                icon={<RightArrowIcon />}
                                iconOnly
                                disabled={!hasNextPage}
                                color={'secondary'}
                                onClick={() => {
                                    setPage(page + 1)
                                }}
                            />
                        </div>
                    </Col>
                </Row>
            </div>
        )
    }
}

export default { Pagination }
export { Pagination }
