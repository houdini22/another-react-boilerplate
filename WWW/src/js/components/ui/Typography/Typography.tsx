import * as React from 'react'
import classNames from 'classnames/bind'
import styles from '../../../../assets/scss/components/_typography.scss'

const cx = classNames.bind(styles)

interface ContainerProps {
    children: any
    className?: string
}

export class Container extends React.Component<ContainerProps, null> {
    render() {
        const { children, className } = this.props

        return (
            <div
                className={cx('component-typography', {
                    [className]: className,
                })}
            >
                {children}
            </div>
        )
    }
}

export class Header extends React.Component<ContainerProps, null> {
    render() {
        const { children, className, level = 1, solid, } = this.props

        return (
            <div
                className={cx('component-typography__header', {
                    [`component-typography__header--level-${level}`]: level,
                    [`component-typography__header--solid`]: solid,
                    [`component-typography__header-${level}`]: level,
                    [className]: className,
                })}
            >
                {children}
            </div>
        )
    }
}

export default { Container, Header }
