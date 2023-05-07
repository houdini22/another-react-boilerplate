import * as React from 'react'
import { Col, Modal, Row, Table, Typography } from '../../../../components'
import { sortRolesByNameAscending } from '../../../../helpers/roles'
import { ModalDeleteRolePermission } from '../../../UserRoles/components/RolesTable/ModalDeleteRolePermission'
import { Role } from '../../../../../types.d'
import PermissionDropdown from '../../../Users/components/PermissionDropdown'

interface RowExpandRolesProps {}

export class RowExpandRoles extends React.Component<RowExpandRolesProps, null> {
    render() {
        const { permission, deleteRolePermission, setIsLoading, fetch } = this.props

        return (
            <Table.Tr key={`roles${permission.id}`}>
                <Table.Td xs={12}>
                    <Row>
                        <Col xs={12}>
                            <Typography.Container>
                                <h3>Roles with Permission</h3>
                            </Typography.Container>
                        </Col>
                        {sortRolesByNameAscending(permission?.roles).map((role: Role) => {
                            return (
                                <Modal.Manager key={role.id}>
                                    {({ registerModal, closeModal, openModal }) => {
                                        const modalName = `role-permission-${permission.id}-delete`
                                        registerModal(
                                            modalName,
                                            <ModalDeleteRolePermission
                                                deleteRolePermission={deleteRolePermission}
                                                role={role}
                                                permission={permission}
                                                fetch={fetch}
                                                setIsLoading={setIsLoading}
                                                close={() => closeModal(modalName)}
                                            />,
                                        )

                                        return (
                                            <Col key={role.id} xs={4}>
                                                <PermissionDropdown
                                                    permission={{
                                                        ...permission,
                                                        hasRole: true,
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

export default RowExpandRoles
