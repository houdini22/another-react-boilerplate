import React from 'react'
import { Footer } from './index'
import connect from 'react-redux/es/connect/connect'
import { selectors as commonSelectors } from '../../../reducers/common'
import classNames from 'classnames/bind'
import styles from '../../../../assets/scss/layout/_layout.scss'

const cx = classNames.bind(styles)

interface ContainterProps {
    children: any;
}

class ContainerBase extends React.Component<ContainterProps> {
    render() {
        const {
            children,
            layout: { floatingSidebar, sidebarExpanded },
        } = this.props

        return (
            <div
                className={cx('layout__container', {
                    'layout__container--floating': floatingSidebar,
                    'layout__container--sidebar-expanded': sidebarExpanded,
                })}
            >
                <div className={cx('layout__container__content')}>
                    {children}
                </div>
                <Footer />
            </div>
        )
    }
}

const Container = connect((state) => {
    return {
        layout: commonSelectors.getLayout(state),
    }
})(ContainerBase)

export { Container }
export default { Container }