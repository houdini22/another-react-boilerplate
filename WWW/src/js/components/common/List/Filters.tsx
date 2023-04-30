import * as React from 'react'
import styles from '../../../../assets/scss/components/_list_manager.scss'
import classNames from 'classnames/bind'

const cx = classNames.bind(styles)

interface FiltersProps {
    children: any
}

class Filters extends React.Component<FiltersProps, null> {
    render() {
        const { children } = this.props
        return <div className={cx('filters')}>{children}</div>
    }
}

export default { Filters }
export { Filters }
