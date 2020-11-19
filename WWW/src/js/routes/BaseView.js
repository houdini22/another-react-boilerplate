import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

class BaseViewBase extends React.Component {
    constructor(props) {
        super(props)
    }
}

BaseViewBase.propTypes = {
    onEnter: PropTypes.func,
}

const BaseView = connect()(BaseViewBase)

export { BaseView }
export default { BaseView }
