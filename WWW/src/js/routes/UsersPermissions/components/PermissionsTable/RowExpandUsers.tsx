import * as React from 'react'
import { Col, Row, Table, Typography, Modal } from '../../../../components'
import { sortUsersByNameAscending } from '../../../../helpers/users'
import ModalDeleteUserPermission from '../../../../components/common/ModalDeleteUserPermission'
import { Permission, User } from '../../../../../types.d'
import UserDropdown from '../../../../components/common/UserDropdown'

interface RowExpandPermissionsProps {
    setIsLoading: Function
    navigate: Function
    deleteUserPermission: Function
    addToastNotification: Function
    fetch: Function
    permission: Permission
}

export class RowExpandPermissions extends React.Component<RowExpandPermissionsProps, null> {
    render() {
        const { permission, setIsLoading, fetch, deleteUserPermission } = this.props

        return (
            <Table.Tr key={`users${permission.id}`}>
                <Table.Td xs={12}>
                    <Row>
                        <Col xs={12}>
                            <Typography.Container>
                                <h3>Users with Permission</h3>
                            </Typography.Container>
                        </Col>
                        {sortUsersByNameAscending(permission?.users).map((user: User) => {
                            return (
                                <Modal.Manager key={user.id}>
                                    {({ openModal, registerModal, closeModal }) => {
                                        const modalName = `role-delete-from-user-${permission.id}-delete`
                                        registerModal(
                                            modalName,
                                            <ModalDeleteUserPermission
                                                permission={permission}
                                                setIsLoading={setIsLoading}
                                                deleteUserPermission={deleteUserPermission}
                                                user={user}
                                                fetch={fetch}
                                                closeModal={() => closeModal(modalName)}
                                            />,
                                        )

                                        return (
                                            <Col key={user.id} xs={4}>
                                                <UserDropdown
                                                    user={{
                                                        ...user,
                                                        hasPermission: true,
                                                    }}
                                                    openDeleteModal={() => openModal(modalName)}
                                                />
                                            </Col>
                                        )
                                    }}
                                </Modal.Manager>
                            )
                        })}
                    </Row>
                </Table.Td>
            </Table.Tr>
        )
    }
}

export default RowExpandPermissions
