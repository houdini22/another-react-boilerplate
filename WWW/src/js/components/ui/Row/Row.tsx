import * as React from 'react'
import classNames from 'classnames/bind'
import styles from '../../../../assets/scss/components/_row.scss'

const cx = classNames.bind(styles)

interface RowProps {
    children: any
    style?: object
    builder?: any
    className?: string
    onClick?: () => void
    alignCenter?: boolean
    noMarginBottom?: boolean
}

class Row extends React.Component<RowProps, null> {
    render() {
        const { children, builder, className, alignCenter, noMarginBottom, ...props } = this.props

        return (
            <div
                {...props}
                className={cx('component-row', className, {
                    [cx('builder')]: builder,
                    [cx('component-row--no-padding')]: props['noPadding'],
                    [cx('component-row--align-center')]: alignCenter,
                    [cx('component-row--no-margin-bottom')]: noMarginBottom,
                })}
            >
                {children}
            </div>
        )
    }
}

export { Row }
export default { Row }
