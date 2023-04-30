import * as React from 'react'
import styles from '../../../../assets/scss/routes/index.scss'
import classNames from 'classnames/bind'

const cx = classNames.bind(styles)

class IndexView extends React.Component<null, null> {
    render() {
        return <div className={cx('route--index')}></div>
    }
}

export default { IndexView }
export { IndexView }
