import * as React from 'react'
import { selectors as commonSelectors, actions as commonActions } from '../../../reducers/users'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

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
}

class UsersManagerBase extends React.Component<UsersManagerProps> {
    componentDidMount() {
        const { fetch, fetchOne, id } = this.props
        if (id) {
            fetchOne(id)
        } else {
            fetch()
        }
    }

    render() {
        const {
            children,
            users,
            setIsLoading,
            user,
            editUser,
            addUser,
            fetch,
            deleteUser,
            deleteUserRole,
            addUserRole,
            fetchOne,
            sendActivationEmail,
            sendAvatar,
            forceLogin,
        } = this.props
        const renderProps = {
            users,
            setIsLoading,
            user,
            editUser,
            addUser,
            fetch,
            deleteUser,
            deleteUserRole,
            addUserRole,
            fetchOne,
            sendActivationEmail,
            sendAvatar,
            forceLogin,
        }

        return children(renderProps)
    }
}

const mapStateToProps = (state) => ({
    users: commonSelectors['getUsers'](state),
    user: commonSelectors['getUser'](state),
    isLoading: commonSelectors['getIsLoading'](state),
})

const UsersManager = connect(mapStateToProps, (dispatch) => {
    return bindActionCreators(
        {
            fetch: commonActions.fetch,
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
        },
        dispatch,
    )
})(UsersManagerBase)

export { UsersManager }
export default { UsersManager }
