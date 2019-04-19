import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames/bind'
import styles from '../../../../assets/scss/components/_section.scss'

const cx = classNames.bind(styles)

class Section extends React.Component {
  render() {
    const { children, style } = this.props

    return (
      <div className={cx('component-section')} style={style}>
        <div className={cx('component-section__content')}>{children}</div>
      </div>
    )
  }
}

Section.propTypes = {
  children: PropTypes.element.isRequired,
  style: PropTypes.object,
}

export { Section }
export default { Section }
