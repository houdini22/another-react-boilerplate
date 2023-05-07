import * as React from 'react'
import { Col, Table, Row, Typography } from '../../../../components'
import { DeleteUserRole, Role, SetIsLoading, User } from '../../../../../types.d'
import { sortRolesByNameAscending } from '../../../../helpers/roles'
import RoleDropdown from '../RoleDropdown'
import ModalDeleteUserRole from '../ModalDeleteUserRole'
import { ModalManager } from '../../../../components/ui/Modal'

interface RowExpandRolesProps {
    user: User
    setIsLoading: SetIsLoading
    deleteUserRole: DeleteUserRole
    fetch: () => Promise<void>
}

export class RowExpandRoles extends React.Component<RowExpandRolesProps, null> {
    render() {
        const { user, setIsLoading, deleteUserRole, fetch } = this.props

        return (
            <ModalManager>
                {({ registerModal, closeModal, openModal }) => (
                    <Table.Tr key={`roles${user.id}`}>
                        <Table.Td xs={12}>
                            <Row>
                                <Col xs={12}>
                                    <Typography.Container>
                                        <h3>User Roles</h3>
                                    </Typography.Container>
                                </Col>
                                {sortRolesByNameAscending(user?.roles).map((role: Role) => {
                                    registerModal(
                                        `user-remove-role-${role.id}-delete`,
                                        <ModalDeleteUserRole
                                            role={role}
                                            setIsLoading={setIsLoading}
                                            deleteUserRole={deleteUserRole}
                                            user={user}
                                            fetch={fetch}
                                            closeModal={() => closeModal(`user-remove-role-${role.id}-delete`)}
                                        />,
                                    )

                                    return (
                                        <Col xs={4} key={`${role.id}`}>
                                            <RoleDropdown
                                                role={role}
                                                openDeleteModal={() => {
                                                    openModal(`user-remove-role-${role.id}-delete`)
                                                }}
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

export default RowExpandRoles
