import * as React from 'react'
import { Badge, Card, LoadingOverlay } from '../../../../components'
import { Role, User } from '../../../../../types.d'
import { sortRolesByNameAscending } from '../../../../helpers/roles'
import RoleDropdown from '../../../../components/common/RoleDropdown'
import ModalDeleteUserRole from '../../../../components/common/ModalDeleteUserRole'

interface AddRoleProps {
    roles: any
    setIsLoading: Function
    deleteUserRole: Function
    fetchOne: Function
    user: User
    isLoading: boolean
}

export class Roles extends React.Component<AddRoleProps, null> {
    render() {
        const { setIsLoading, deleteUserRole, fetchOne, user, isLoading, openModal, closeModal, registerModal } = this.props

        return (
            <Card
                color={'secondary'}
                header={
                    <h1>
                        Roles <Badge color={'info'}>{user?.roles?.length || 0}</Badge>
                    </h1>
                }
            >
                {sortRolesByNameAscending(user?.roles).map((role: Role) => {
                    const modalName = `user-delete-role-${role.id}`
                    registerModal(
                        modalName,
                        <ModalDeleteUserRole
                            role={role}
                            setIsLoading={setIsLoading}
                            deleteUserRole={deleteUserRole}
                            user={user}
                            fetch={() => fetchOne(user['id'])}
                            closeModal={() => closeModal(modalName)}
                        />,
                    )

                    return (
                        <RoleDropdown
                            key={role.id}
                            openDeleteModal={() => openModal(modalName)}
                            role={{
                                ...role,
                                hasUser: true,
                            }}
                        />
                    )
                })}
                {isLoading && <LoadingOverlay />}
            </Card>
        )
    }
}

export default Roles
