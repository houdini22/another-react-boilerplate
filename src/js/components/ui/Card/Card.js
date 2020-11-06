import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames/bind'
import _ from 'lodash'
import { IoIosClose as CloseIcon } from 'react-icons/io'
import {
  FiMinimize2 as MinimizeIcon,
  FiMaximize2 as MaximizeIcon,
} from 'react-icons/fi'
import { Button } from '../Button/index'
import { AppContext } from '../../../../index'
import { LoadingOverlay } from '../LoadingOverlay'
import styles from '../../../../assets/scss/components/_card.scss'

const cx = classNames.bind(styles)

class Card extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      closed: false,
      minimized: false,
    }
    this.close = this.close.bind(this)
    this.maximize = this.maximize.bind(this)
  }

  close() {
    this.setState({ closed: true })
  }

  maximize() {
    this.setState({ minimized: false })
  }

  renderButton(props = {}) {
    const { size } = this.props

    return <Button {...props} size={size} />
  }

  render() {
    const {
      children,
      header,
      headerActions,
      color,
      withCloseIcon,
      onClickClose,
      className,
      withMinimizeIcon,
      size,
      isLoading,
      noBorderTop,
      footer,
      footerType,
      style,
    } = this.props
    const { closed, minimized } = this.state

    if (closed) {
      return null
    }

    return (
      <div
        className={cx('component-card', {
          [`component-card--color-${color}`]: color,
          [`component-card--with-close-icon`]: withCloseIcon,
          [`component-card--size-${size}`]: size,
          [`component-card--no-border-top`]: noBorderTop,
          [className]: true,
        })}
        style={style}
      >
        {header && (
          <AppContext.Provider
            value={{
              cardSize: size,
            }}
          >
            <div className={cx('component-card__header')}>
              {_.isFunction(header) && header()}
              {!_.isFunction(header) && header}
              <div className={cx('component-card__header__actions')}>
                {_.isFunction(headerActions) &&
                  headerActions({
                    maximize: this.maximize,
                  })}
                {!_.isFunction(headerActions) &&
                  !_.isEmpty(headerActions) &&
                  headerActions}
                {withMinimizeIcon &&
                  this.renderButton({
                    href: '#',
                    onClick: (e) => {
                      e.preventDefault()
                      this.setState({ minimized: !minimized })
                    },
                    iconOnly: true,
                    outline: true,
                    roundless: true,
                    borderless: true,
                    icon: minimized ? <MaximizeIcon /> : <MinimizeIcon />,
                    color,
                    className: 'component-card__header__actions__action-button',
                    size,
                  })}
                {withCloseIcon &&
                  this.renderButton({
                    href: '#',
                    onClick: (e) => {
                      e.preventDefault()
                      if (_.isFunction(onClickClose)) {
                        onClickClose({
                          close: this.close,
                        })
                      } else {
                        this.close()
                      }
                    },
                    iconOnly: true,
                    outline: true,
                    roundless: true,
                    borderless: true,
                    icon: <CloseIcon />,
                    color,
                    className: 'component-card__header__actions__action-button',
                    size,
                  })}
              </div>
            </div>
          </AppContext.Provider>
        )}
        {!minimized && [
          <div className={cx('component-card__content')}>
            {_.isFunction(children) && children()}
            {!_.isFunction(children) && children}
          </div>,
          <div
            className={cx('component-card__footer', {
              [`component-card__footer--type-${footerType}`]: footerType,
            })}
          >
            {_.isFunction(footer) && footer()}
            {!_.isFunction(footer) && footer}
          </div>,
        ]}
        {isLoading && <LoadingOverlay />}
      </div>
    )
  }
}

Card.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element.isRequired,
    PropTypes.array.isRequired,
    PropTypes.func.isRequired,
  ]),
  headerActions: PropTypes.oneOfType([
    PropTypes.element.isRequired,
    PropTypes.array.isRequired,
    PropTypes.func.isRequired,
  ]),
  header: PropTypes.oneOfType([
    PropTypes.element.isRequired,
    PropTypes.array.isRequired,
    PropTypes.func.isRequired,
  ]),
  color: PropTypes.string,
  withCloseIcon: PropTypes.bool,
  onClickClose: PropTypes.func,
  className: PropTypes.string,
  withMinimizeIcon: PropTypes.bool,
  size: PropTypes.string,
  isLoading: PropTypes.bool,
  noBorderTop: PropTypes.bool,
  footer: PropTypes.oneOfType([
    PropTypes.element.isRequired,
    PropTypes.array.isRequired,
    PropTypes.func.isRequired,
  ]),
  footerType: PropTypes.oneOf(['', 'transparent', 'bordered', 'solid']),
  style: PropTypes.object,
}

Card.defaultProps = {
  size: 'md',
}

export { Card }
export default { Card }
