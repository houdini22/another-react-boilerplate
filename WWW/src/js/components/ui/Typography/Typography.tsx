import * as React from "react"
import classNames from 'classnames/bind'
import styles from '../../../../assets/scss/components/_typography.scss'

const cx = classNames.bind(styles)

interface ContainerProps {
    children: any;
}

class Container extends React.Component<ContainerProps> {
    render() {
        const { children } = this.props

        return <div className={cx('component-typography')}>{children}</div>
    }
}

export { Container }
export default { Container }
