import React from 'react'
import PropTypes from 'prop-types'
import { LoadingOverlay } from '../../index'

class IconBox extends React.Component {
  render() {
    const { icon, children, isLoading } = this.props

    return (
      <div className="icon-box">
        {!isLoading && (
          <div>
            <div className="icon-box__icon">{icon}</div>
            <div className="icon-box__content">{children}</div>
          </div>
        )}
        {isLoading && <LoadingOverlay />}
      </div>
    )
  }
}

IconBox.propTypes = {
  icon: PropTypes.element.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.element.isRequired,
    PropTypes.string.isRequired,
    PropTypes.array.isRequired,
  ]),
  isLoading: PropTypes.bool,
}

export { IconBox }
export default { IconBox }
