import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames/bind'
import { AppContext } from '../../../../index'
import { LoadingOverlay } from '../LoadingOverlay'
import styles from '../../../../assets/scss/components/_button-group.scss'

const cx = classnames.bind(styles)

class ButtonGroup extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const {
      size,
      color,
      outline,
      children,
      block,
      rounded,
      roundless,
      isLoading,
      disabled,
      borderless,
    } = this.props

    return (
      <AppContext.Provider
        value={{
          buttonGroupSize: size,
          buttonGroupColor: color,
          buttonGroupOutline: outline,
          buttonGroupDisabled: disabled,
          buttonGroupBorderless: borderless,
        }}
      >
        <div
          className={cx('component-button-group', {
            [`component-button-group--outline`]: outline,
            [`component-button-group--block`]: block,
            [`component-button-group--rounded`]: rounded,
            [`component-button-group--roundless`]: roundless,
            [`component-button-group--borderless`]: borderless,
          })}
        >
          {children}
          {isLoading && <LoadingOverlay size="xs" />}
        </div>
      </AppContext.Provider>
    )
  }
}

ButtonGroup.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element.isRequired,
    PropTypes.string.isRequired,
    PropTypes.array.isRequired,
  ]),
  size: PropTypes.string,
  color: PropTypes.string,
  outline: PropTypes.bool,
  block: PropTypes.bool,
  rounded: PropTypes.bool,
  roundless: PropTypes.bool,
  isLoading: PropTypes.bool,
  disabled: PropTypes.bool,
  borderless: PropTypes.bool,
}

ButtonGroup.defaultProps = {
  size: 'md',
  color: 'primary',
}

export { ButtonGroup }
export default { ButtonGroup }
