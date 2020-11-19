import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames/bind'
import styles from '../../../assets/scss/layout/_layout.scss'

const cx = classNames.bind(styles)

class BlankPageLayout extends React.Component {
    render() {
        const { children } = this.props
        return (
            <div
                className={cx({
                    'layout--blank-page': true,
                    layout: true,
                })}
            >
                {children}
            </div>
        )
    }
}

BlankPageLayout.propTypes = {
    children: PropTypes.element.isRequired,
    common: PropTypes.object.isRequired,
    setConnectionErrorModalVisible: PropTypes.func.isRequired,
}

export { BlankPageLayout }
export default { BlankPageLayout }
