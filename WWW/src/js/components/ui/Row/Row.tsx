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
}

class Row extends React.Component<RowProps> {
    render() {
        const { children, builder, className, ...props } = this.props

        return (
            <div
                {...props}
                className={cx('component-row', className, {
                    [cx('builder')]: builder,
                    [cx('component-row--no-padding')]: props['noPadding'],
                })}
            >
                {children}
            </div>
        )
    }
}

export { Row }
export default { Row }
