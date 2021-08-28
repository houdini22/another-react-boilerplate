import * as React from "react"
import classNames from 'classnames/bind'
import styles from '../../../../assets/scss/layout/_layout.scss'

const cx = classNames.bind(styles)

interface ContainerHeaderProps {
    children: any;
}

class ContainerHeader extends React.Component<ContainerHeaderProps> {
    render() {
        const { children } = this.props

        return (
            <div className={cx('layout__container__content__header')}>
                {children}
            </div>
        )
    }
}

export { ContainerHeader }
export default { ContainerHeader }
