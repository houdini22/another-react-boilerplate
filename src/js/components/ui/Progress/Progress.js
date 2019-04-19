import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames/bind'
import styles from '../../../../assets/scss/components/_progress.scss'

const cx = classNames.bind(styles)

class Progress extends React.Component {
  render() {
    const { size, color, progress } = this.props

    return (
      <div
        className={cx('component-progress', {
          [`component-progress--size-${size}`]: size,
          [`component-progress--color-${color}`]: color,
        })}
      >
        <div
          className={cx('component-progress__progress')}
          style={{ width: `${progress}%` }}
        />
      </div>
    )
  }
}

Progress.propTypes = {
  size: PropTypes.string,
  color: PropTypes.string,
  progress: PropTypes.number,
}

Progress.defaultProps = {
  size: 'md',
  color: 'default',
  progress: 0,
}

export { Progress }
export default { Progress }
