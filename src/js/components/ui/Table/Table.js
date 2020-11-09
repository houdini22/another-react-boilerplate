import React from 'react'
import classNames from 'classnames/bind'
import PropTypes from 'prop-types'
import styles from '../../../../assets/scss/components/_table.scss'
import { Row } from '../Row'
import { Col } from '../Col'

const cx = classNames.bind(styles)

class Table extends React.Component {
    render() {
        const { children, bordered, striped, size, color } = this.props

        return (
            <div
                className={cx('component-table', {
                    'component-table--bordered': bordered,
                    'component-table--striped': striped,
                    [`component-table--size-${size}`]: size,
                    [`component-table--color-${color}`]: color,
                })}
            >
                {children}
            </div>
        )
    }
}

Table.propTypes = {
    bordered: PropTypes.bool,
    size: PropTypes.string,
}

Table.defaultProps = {
    size: 'md',
}

class THead extends React.Component {
    render() {
        const { children } = this.props

        return <div className={cx('component-table__thead')}>{children}</div>
    }
}

class TBody extends React.Component {
    render() {
        const { children } = this.props

        return <div className={cx('component-table__tbody')}>{children}</div>
    }
}

class Tr extends React.Component {
    render() {
        const { children, ...props } = this.props

        return (
            <Row {...props} className={cx('component-table__tr')}>
                {children}
            </Row>
        )
    }
}

class Th extends React.Component {
    render() {
        const { children, xs, alignCenter } = this.props

        return (
            <Col
                className={cx(
                    'component-table__thead__th',
                    `component-table__thead__th--xs-${xs}`,
                    {
                        'component-table__thead__th--align-center': alignCenter,
                    },
                )}
                xs={xs}
            >
                {children}
            </Col>
        )
    }
}

Th.propTypes = {
    xs: PropTypes.number,
    alignCenter: PropTypes.bool,
}

Th.defaultProps = {
    xs: 12,
}

class Td extends React.Component {
    render() {
        const { children, xs, alignCenter } = this.props

        return (
            <Col
                className={cx(
                    'component-table__tbody__td',
                    `component-table__tbody__td--xs-${xs}`,
                    {
                        'component-table__tbody__td--align-center': alignCenter,
                    },
                )}
                xs={xs}
            >
                {children}
            </Col>
        )
    }
}

Td.propTypes = {
    xs: PropTypes.number,
    alignCenter: PropTypes.bool,
}

Td.defaultProps = {
    xs: 12,
}

export { Table, THead, Th, TBody, Td, Tr }
export default { Table, THead, Th, TBody, Td, Tr }
