import * as React from 'react'
import { selectors as commonSelectors, actions as commonActions } from '../../../reducers/users'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { AuthManager } from '../../../containers/AuthManager'

interface UsersManagerProps {
    children: any
    fetch: Function
    fetchOne: Function
    users: any
    user: any
    id?: number
    setIsLoading: Function
    editUser: Function
    addUser: Function
    deleteUser: Function
    deleteUserRole: Function
    addUserRole: Function
    sendActivationEmail: Function
    sendAvatar: Function
    uploadProgress: number
    setUploadProgress: Function
    activateUser: Function
    deactivateUser: Function
}

class UsersManagerBase extends React.Component<UsersManagerProps, null> {
    componentDidMount() {
        const { fetchOne, id } = this.props
        if (id) {
            fetchOne(id)
        }
    }

    render() {
        const {
            children,
            setIsLoading,
            user,
            editUser,
            addUser,
            deleteUser,
            deleteUserRole,
            addUserRole,
            fetchOne,
            sendActivationEmail,
            sendAvatar,
            forceLogin,
            uploadProgress,
            setUploadProgress,
            activateUser,
            deactivateUser,
        } = this.props
        const renderProps = {
            setIsLoading,
            user,
            editUser,
            addUser,
            deleteUser,
            deleteUserRole,
            addUserRole,
            fetchOne,
            sendActivationEmail,
            sendAvatar,
            forceLogin,
            uploadProgress,
            setUploadProgress,
            activateUser,
            deactivateUser,
        }

        return (
            <>
                <AuthManager>{() => <>{children(renderProps)}</>}</AuthManager>
            </>
        )
    }
}

const mapStateToProps = (state) => ({
    user: commonSelectors['getUser'](state),
    isLoading: commonSelectors['getIsLoading'](state),
    uploadProgress: commonSelectors['getUploadProgress'](state),
})

const UsersManager = connect(mapStateToProps, (dispatch) => {
    return bindActionCreators(
        {
            fetchOne: commonActions.fetchOne,
            setIsLoading: commonActions.setIsLoading,
            editUser: commonActions.editUser,
            addUser: commonActions.addUser,
            deleteUser: commonActions.deleteUser,
            deleteUserRole: commonActions.deleteUserRole,
            addUserRole: commonActions.addUserRole,
            sendActivationEmail: commonActions.sendActivationEmail,
            sendAvatar: commonActions.sendAvatar,
            forceLogin: commonActions.forceLogin,
            setUploadProgress: commonActions.setUploadProgress,
            activateUser: commonActions.activateUser,
            deactivateUser: commonActions.deactivateUser,
        },
        dispatch,
    )
})(UsersManagerBase)

export { UsersManager }
export default { UsersManager }
