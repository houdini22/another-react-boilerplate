import * as React from 'react'
import { Card, LoadingOverlay } from '../../../components'
import { Permission, Role } from '../../../../types.d'
import { ModalManager } from '../../../components/ui/Modal'
import ModalDeleteRolePermission from '../../UserRoles/components/RolesTable/ModalDeleteRolePermission'
import PermissionDropdown from '../../Users/components/PermissionDropdown'

interface HeaderProps {
    role: Role
}

export class Permissions extends React.Component<HeaderProps, null> {
    render() {
        const { role, setIsLoading, fetch, isLoading, deleteRolePermission } = this.props
        return (
            <ModalManager>
                {({ openModal, closeModal, registerModal }) => (
                    <Card header={<h1>Permissions</h1>} color={'secondary'}>
                        {role?.permissions?.map((permission: Permission) => {
                            const modalName = `delete-permission-from-role-${permission.id}`
                            registerModal(
                                modalName,
                                <ModalDeleteRolePermission
                                    setIsLoading={setIsLoading}
                                    fetch={fetch}
                                    close={() => closeModal(modalName)}
                                    role={role}
                                    deleteRolePermission={deleteRolePermission}
                                    permission={permission}
                                />,
                            )

                            return (
                                <PermissionDropdown
                                    key={permission.id}
                                    permission={{
                                        ...permission,
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

export default Permissions
