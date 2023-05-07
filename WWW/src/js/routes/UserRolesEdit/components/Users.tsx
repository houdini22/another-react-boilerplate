import * as React from 'react'
import { Card, Dropdown, Label, LoadingOverlay } from '../../../components'
import { DeleteIcon, RoleIcon } from '../../../components/icons'
import { Role, User } from '../../../../types.d'
import { ModalConfirm } from '../../../components/common/ModalConfirm'
import { RouteManager } from '../../../containers/RouteManager'
import ModalDeleteUserRole from '../../Users/components/ModalDeleteUserRole'
import { users } from '../../../reducers'
import UserDropdown from '../../UserRoles/components/UserDropdown'
import { ModalManager } from '../../../components/ui/Modal'

interface HeaderProps {
    role: Role
}

export class Users extends React.Component<HeaderProps, null> {
    render() {
        const { role, setIsLoading, fetch, isLoading, deleteUserRole } = this.props
        return (
            <ModalManager>
                {({ openModal, closeModal, registerModal }) => (
                    <Card header={<h1>Users</h1>} color={'secondary'}>
                        {role?.users?.map((user: User) => {
                            const modalName = `delete-role-from-user-${user.id}`
                            registerModal(
                                modalName,
                                <ModalDeleteUserRole
                                    role={role}
                                    setIsLoading={setIsLoading}
                                    deleteUserRole={deleteUserRole}
                                    user={user}
                                    fetch={fetch}
                                    closeModal={() => closeModal(modalName)}
                                />,
                            )

                            return (
                                <UserDropdown
                                    key={user.id}
                                    user={{
                                        ...user,
                                        hasRole: true,
                                    }}
                                    openDeleteModal={() => openModal(modalName)}
                                />
                            )
                        })}
                        {isLoading && <LoadingOverlay />}
                    </Card>
                )}
            </ModalManager>
        )
    }
}

export default Users
