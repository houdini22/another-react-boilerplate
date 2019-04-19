import React from 'react'
import PropTypes from 'prop-types'
import { LoadingOverlay } from '../../index'

class Header extends React.Component {
  render() {
    const { children, isLoading } = this.props

    return (
      <h3 className="page-header">
        <span className="page-header-caption">{children}</span>
        {isLoading && (
          <span className="page-header-loading-container">
            <LoadingOverlay size="xs" noBackground />
          </span>
        )}
      </h3>
    )
  }
}

Header.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element.isRequired,
    PropTypes.string.isRequired,
  ]),
  isLoading: PropTypes.any,
}

export { Header }
export default { Header }
