import * as React from 'react'
import { Col, Row, Table, Typography } from '../../../../components'
import { sortPermissionsByNameAscending } from '../../../../helpers/permissions'
import { RouteManager } from '../../../../containers'
import { ModalManager } from '../../../../components/ui/Modal'
import { DeleteRolePermission, Permission, Role, SetIsLoading } from '../../../../../types.d'
import { PermissionDropdown } from '../../../../components/common/PermissionDropdown'
import { ModalDeleteRolePermission } from '../../../../components/common/ModalDeleteRolePermission'

interface RowExpandPermissionsProps {
    setIsLoading: SetIsLoading
    role: Role
    fetch: () => Promise<void>
    deleteRolePermission: DeleteRolePermission
}

export class RowExpandPermissions extends React.Component<RowExpandPermissionsProps, null> {
    render() {
        const { role, setIsLoading, fetch, deleteRolePermission } = this.props

        return (
            <RouteManager>
                {({ navigate }) => (
                    <ModalManager>
                        {({ registerModal, openModal, closeModal }) => (
                            <Table.Tr key={`permissions${role.id}`}>
                                <Table.Td xs={12}>
                                    <Row>
                                        <Col xs={12}>
                                            <Typography.Container>
                                                <Typography.Header level={3} solid>Role Permissions</Typography.Header>
                                            </Typography.Container>
                                        </Col>
                                        {sortPermissionsByNameAscending(role?.permissions).map((permission: Permission) => {
                                            const modalName = `user-remove-role-permission-${permission.id}-delete`
                                            registerModal(
                                                modalName,
                                                <ModalDeleteRolePermission
                                                    role={role}
                                                    permission={permission}
                                                    deleteRolePermission={deleteRolePermission}
                                                    close={() => closeModal(modalName)}
                                                    fetch={fetch}
                                                    setIsLoading={setIsLoading}
                                                />,
                                            )

                                            return (
                                                <Col xs={4} key={permission.id}>
                                                    <PermissionDropdown
                                                        navigate={navigate}
                                                        permission={{
                                                            ...permission,
                                                            hasRole: true,
                                                        }}
                                                        openDeleteModal={() => openModal(modalName)}
                                                    />
                                                </Col>
                                            )
                                        })}
                                    </Row>
                                </Table.Td>
                            </Table.Tr>
                        )}
                    </ModalManager>
                )}
            </RouteManager>
        )
    }
}

export default RowExpandPermissions
