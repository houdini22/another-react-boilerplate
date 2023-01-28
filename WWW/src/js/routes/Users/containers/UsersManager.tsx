import * as React from 'react'
import {
    selectors as commonSelectors,
    actions as commonActions,
} from '../../../reducers/users'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

interface UsersManagerProps {
    children: any
    fetch: Function
    fetchOne: Function
    users: any
    id?: number
    setIsLoading: Function
    editUser: Function
    addUser: Function
    deleteUser: Function
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
        } = this.props
        const renderProps = {
            users,
            setIsLoading,
            user,
            editUser,
            addUser,
            fetch,
            deleteUser,
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
        },
        dispatch,
    )
})(UsersManagerBase)

export { UsersManager }
export default { UsersManager }
