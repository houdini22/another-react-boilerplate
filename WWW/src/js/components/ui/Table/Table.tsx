import * as React from 'react'
import classNames from 'classnames/bind'
import styles from '../../../../assets/scss/components/_table.scss'
import { Row } from '../Row'
import { Col } from '../Col'

const cx = classNames.bind(styles)

interface TableProps {
    bordered?: boolean
    size?: string
    striped?: boolean
    color?: string
    children: any
}

class Table extends React.Component<TableProps, null> {
    render() {
        const { children, bordered, striped, size = 'md', color } = this.props

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

class THead extends React.Component<null, null> {
    render() {
        const { children } = this.props

        return <div className={cx('component-table__thead')}>{children}</div>
    }
}

class TBody extends React.Component<null, null> {
    render() {
        const { children, itemRef } = this.props

        return (
            <div className={cx('component-table__tbody')} ref={itemRef}>
                {children}
            </div>
        )
    }
}

class TFoot extends React.Component<null, null> {
    render() {
        const { children, alignRight } = this.props

        return (
            <div
                className={cx('component-table__tfoot', {
                    [cx('component-table__tfoot--align-right')]: alignRight,
                })}
            >
                {children}
            </div>
        )
    }
}

interface TrProps {
    color?: string
    children: any
    onClick?: () => void
    expanded?: boolean
}

class Tr extends React.Component<TrProps, null> {
    render() {
        const { children, color, onClick, expanded, itemRef, ...props } = this.props

        return (
            <Row
                ref={itemRef}
                {...props}
                onClick={onClick}
                className={cx('component-table__tr', {
                    [`component-table__tr--color-${color}`]: color,
                    [`component-table__tr--is-clickable`]: !!onClick,
                    [`component-table__tr--expanded`]: expanded,
                })}
            >
                {children}
            </Row>
        )
    }
}

interface ThProps {
    children: any
    xs?: number

    md?: number
    alignCenter?: boolean
    alignRight?: boolean
}

class Th extends React.Component<ThProps, null> {
    render() {
        const { children, xs, md, alignCenter, alignRight } = this.props

        return (
            <Col
                className={cx('component-table__thead__th', {
                    [`component-table__thead__th--xs-${xs}`]: xs,
                    [`component-table__thead__th--md-${md}`]: md,
                    'component-table__thead__th--align-center': alignCenter,
                    'component-table__thead__th--align-right': alignRight,
                })}
                xs={xs}
                md={md}
                alignRight={alignRight}
            >
                {children}
            </Col>
        )
    }
}

interface TdProps {
    xs?: number
    md?: number
    alignCenter?: boolean
    alignRight?: boolean
    onClick?: () => void
    children: any
}

class Td extends React.Component<TdProps, null> {
    render() {
        const { children, xs, md, onClick, alignCenter, alignRight, className } = this.props

        return (
            <Col
                className={cx('component-table__tbody__td', {
                    'component-table__tbody__td--align-center': alignCenter,
                    'component-table__tbody__td--align-right': alignRight,
                    'component-table__tbody__td--is-clickable': onClick,
                    [`component-table__tbody__td--xs-${xs}`]: xs,
                    [`component-table__tbody__td--md-${md}`]: md,
                    [className]: className,
                })}
                xs={xs}
                md={md}
                onClick={onClick}
            >
                {children}
            </Col>
        )
    }
}

export { Table, THead, Th, TBody, Td, Tr, TFoot }
export default { Table, THead, Th, TBody, Td, Tr, TFoot }
