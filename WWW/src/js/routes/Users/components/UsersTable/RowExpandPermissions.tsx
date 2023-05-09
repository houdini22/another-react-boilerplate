import * as React from 'react'
import { Col, Row, Table, Typography } from '../../../../components'
import { DeleteUserPermission, Permission, SetIsLoading, User } from '../../../../../types.d'
import { sortPermissionsByNameAscending } from '../../../../helpers/permissions'
import { PermissionDropdown } from '../../../../components/common/PermissionDropdown'
import { ModalDeleteUserPermission } from '../../../../components/common/ModalDeleteUserPermission'
import { RouteManager } from '../../../../containers'
import { ModalManager } from '../../../../components/ui/Modal'

interface RowExpandPermissionsProps {
    user: User
    permissionsFromRoles: Object
    setIsLoading: SetIsLoading
    deleteUserPermission: DeleteUserPermission
    fetch: () => Promise<void>
}

export class RowExpandPermissions extends React.Component<RowExpandPermissionsProps, null> {
    render() {
        const { user, permissionsFromRoles, setIsLoading, deleteUserPermission, fetch } = this.props

        const permissions = Object.keys(permissionsFromRoles)?.map((key) => permissionsFromRoles[key])

        return (
            <RouteManager>
                {({ navigate }) => (
                    <ModalManager>
                        {({ registerModal, openModal, closeModal }) => (
                            <Table.Tr key={`permissions${user.id}`}>
                                <Table.Td xs={12}>
                                    <Row>
                                        <Col xs={12}>
                                            <Typography.Container>
                                                <Typography.Header level={3} solid>Permissions From Roles</Typography.Header>
                                            </Typography.Container>
                                        </Col>
                                        {sortPermissionsByNameAscending(permissions).map((permission: Permission) => {
                                            return (
                                                <Col xs={4} key={`${permission.id}`}>
                                                    <PermissionDropdown navigate={navigate} permission={permission} />
                                                </Col>
                                            )
                                        })}
                                        <Col xs={12}>
                                            <Typography.Container>
                                                <Typography.Header level={3} solid>User Permissions</Typography.Header>
                                            </Typography.Container>
                                        </Col>
                                        {sortPermissionsByNameAscending(user?.permissions).map((permission: Permission) => {
                                            const modalName = `user-remove-permission-${permission.id}-delete`

                                            registerModal(
                                                modalName,
                                                <ModalDeleteUserPermission
                                                    deleteUserPermission={deleteUserPermission}
                                                    fetch={fetch}
                                                    user={user}
                                                    closeModal={() => closeModal(modalName)}
                                                    permission={permission}
                                                    setIsLoading={setIsLoading}
                                                />,
                                            )

                                            return (
                                                <Col xs={4} key={`${permission.id}`}>
                                                    <PermissionDropdown
                                                        navigate={navigate}
                                                        openDeleteModal={() => {
                                                            openModal(modalName)
                                                        }}
                                                        permission={{ ...permission, hasUser: true }}
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
