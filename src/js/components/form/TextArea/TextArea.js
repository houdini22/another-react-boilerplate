import React from 'react'
import PropTypes from 'prop-types'

class TextArea extends React.Component {
  render() {
    const { error, loading, ...props } = this.props

    return <textarea {...props} />
  }
}

TextArea.propTypes = {
  error: PropTypes.string,
}

export { TextArea }
export default { TextArea }
