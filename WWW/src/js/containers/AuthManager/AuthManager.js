import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import {
    selectors as authSelectors,
    actions as authActions,
} from '../../reducers/auth'

class AuthManagerBase extends React.Component {
    render() {
        const { auth, children, logoff } = this.props
        const renderProps = {
            auth,
            logoff,
        }

        return children(renderProps)
    }
}

AuthManagerBase.propTypes = {
    auth: PropTypes.object.isRequired,
    children: PropTypes.func.isRequired,
    logoff: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
    auth: authSelectors.getState(state),
})

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators(
        {
            logoff: authActions.logoff,
        },
        dispatch,
    )
}

const AuthManager = connect(
    mapStateToProps,
    mapDispatchToProps,
)(AuthManagerBase)

export { AuthManager }
export default { AuthManager }
