import * as React from 'react'
import { Col, Row, Table, Typography } from '../../../../components'
import { ModalConfirm } from '../../../../components/common/ModalConfirm'
import { sortUsersByNameAscending } from '../../../../helpers/users'
import { UserDropdown } from '../../../../components/common/UserDropdown'
import { DeleteUserRole, Role, SetIsLoading, User } from '../../../../../types.d'
import { ModalManager } from '../../../../components/ui/Modal'
import { NotificationsManager } from '../../../../containers/NotificationsManager'
import ModalDeleteUserRole from '../../../../components/common/ModalDeleteUserRole'

interface RowExpandPermissionsProps {
    setIsLoading: SetIsLoading
    fetch: () => Promise<void>
    role: Role
    deleteUserRole: DeleteUserRole
}

export class RowExpandPermissions extends React.Component<RowExpandPermissionsProps, null> {
    render() {
        const { role, setIsLoading, fetch, deleteUserRole } = this.props

        return (
            <ModalManager>
                {({ registerModal, closeModal, openModal }) => (
                    <Table.Tr key={`permissions${role.id}`}>
                        <Table.Td xs={12}>
                            <Row>
                                <Col xs={12}>
                                    <Typography.Container>
                                        <h3>Users with Role</h3>
                                    </Typography.Container>
                                </Col>
                                {sortUsersByNameAscending(role?.users).map((user: User) => {
                                    const modalName = `user-remove-role-${user.id}`
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
                                        <Col xs={4} key={user.id}>
                                            <UserDropdown
                                                user={{
                                                    ...user,
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
        )
    }
}

export default RowExpandPermissions
