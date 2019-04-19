import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames/bind'
import styles from '../../../../assets/scss/layout/_layout.scss'

const cx = classNames.bind(styles)

class PageContent extends React.Component {
  componentDidMount() {
    window.scrollTo(0, 0)
  }

  render() {
    const { children, className } = this.props

    return (
      <div
        className={cx('layout__container__content__content', {
          [className]: className,
        })}
      >
        {children}
      </div>
    )
  }
}

PageContent.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element.isRequired,
    PropTypes.array.isRequired,
  ]),
  className: PropTypes.string,
}

export { PageContent }
export default { PageContent }
