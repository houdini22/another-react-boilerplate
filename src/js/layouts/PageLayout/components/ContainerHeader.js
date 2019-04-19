import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames/bind'
import styles from '../../../../assets/scss/layout/_layout.scss'

const cx = classNames.bind(styles)

class ContainerHeader extends React.Component {
  render() {
    const { children } = this.props

    return (
      <div className={cx('layout__container__content__header')}>{children}</div>
    )
  }
}

ContainerHeader.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element.isRequired,
    PropTypes.array.isRequired,
  ]),
}

export { ContainerHeader }
export default { ContainerHeader }
