import * as React from 'react'
import classNames from 'classnames/bind'
import styles from '../../../../assets/scss/components/_typography.scss'

const cx = classNames.bind(styles)

interface ContainerProps {
    children: any
    className?: string
}

class Container extends React.Component<ContainerProps, null> {
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

export { Container }
export default { Container }
