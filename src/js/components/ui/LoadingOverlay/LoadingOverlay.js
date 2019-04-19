import React from 'react'
import classNames from 'classnames/bind'
import PropTypes from 'prop-types'
import styles from '../../../../assets/scss/components/_loading-overlay.scss'

const cx = classNames.bind(styles)

class LoadingOverlay extends React.Component {
  render() {
    const { size, noBackground } = this.props

    return (
      <div
        className={cx('loading-overlay-container', {
          'loading-overlay--size-xs': size === 'xs',
          'loading-overlay--no-background': noBackground === true,
        })}
      >
        <div className={cx('spinner')}>
          <div className={cx('double-bounce1')} />
          <div className={cx('double-bounce2')} />
        </div>
      </div>
    )
  }
}

LoadingOverlay.propTypes = {
  size: PropTypes.string,
  noBackground: PropTypes.bool,
}

export { LoadingOverlay }
export default { LoadingOverlay }
