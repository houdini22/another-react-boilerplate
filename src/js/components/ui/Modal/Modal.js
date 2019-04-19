import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames/bind'
import { FaWindowClose as CloseIcon } from 'react-icons/fa'
import _ from 'lodash'
import styles from '../../../../assets/scss/components/_modal.scss'

const cx = classNames.bind(styles)

class Modal extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const {
      title,
      body,
      footer,
      animation,
      color,
      close,
      closeIcon,
      size,
      placement,
    } = this.props

    return (
      <div className={cx('component-modal-container')}>
        <div
          className={cx('component-modal-container__modal', {
            'animation--sweet-show':
              animation === 'sweet' && placement !== 'right',
            [`component-modal-container__modal--color-${color}`]: color,
            [`component-modal-container__modal--size-${size}`]: size,
            [`component-modal-container__modal--placement-${placement}`]: placement,
          })}
        >
          <div className={cx('component-modal-container__modal__content')}>
            <div
              className={cx('component-modal-container__modal__content__title')}
            >
              <h2
                className={cx(
                  'component-modal-container__modal__content__title__title',
                )}
              >
                {_.isFunction(title) && title({ close })}
                {!_.isFunction(title) && title}
              </h2>
              {closeIcon && (
                <div
                  className={cx(
                    'component-modal-container__modal__content__title__close-icon',
                  )}
                  onClick={() => close()}
                >
                  <CloseIcon />
                </div>
              )}
            </div>
            <div
              className={cx('component-modal-container__modal__content__body')}
            >
              {_.isFunction(body) && body({ close })}
              {!_.isFunction(body) && body}
            </div>
            <div
              className={cx(
                'component-modal-container__modal__content__footer',
              )}
            >
              {_.isFunction(footer) && footer({ close })}
              {!_.isFunction(footer) && footer}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

Modal.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element.isRequired,
    PropTypes.array.isRequired,
    PropTypes.string.isRequired,
  ]),
  title: PropTypes.oneOfType([
    PropTypes.element.isRequired,
    PropTypes.array.isRequired,
    PropTypes.string.isRequired,
  ]),
  body: PropTypes.oneOfType([
    PropTypes.element.isRequired,
    PropTypes.array.isRequired,
    PropTypes.string.isRequired,
  ]),
  footer: PropTypes.oneOfType([
    PropTypes.element.isRequired,
    PropTypes.array.isRequired,
    PropTypes.string.isRequired,
  ]),
  className: PropTypes.string,
  id: PropTypes.string.isRequired,
  animation: PropTypes.string,
  closeIcon: PropTypes.bool,
  color: PropTypes.string,
  close: PropTypes.func.isRequired,
  size: PropTypes.string,
  placement: PropTypes.string,
}

Modal.defaultProps = {
  closeIcon: true,
}

export { Modal }
export default { Modal }
