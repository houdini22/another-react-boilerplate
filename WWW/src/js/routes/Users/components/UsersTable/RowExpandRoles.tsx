import * as React from 'react'
import { Col, Dropdown, Label, Table, Row } from '../../../../components'
import { DeleteIcon, DetailsIcon, EditIcon, InfoIcon } from '../../../../components/icons'

interface RowExpandRolesProps {
    user: Object
    navigate: Function
    setIsLoading: Function
    deleteUserRole: Function
    addToastNotification: Function
    fetch: Function
}

export class RowExpandRoles extends React.Component<RowExpandRolesProps, null> {
    render() {
        const { user, navigate, setIsLoading, deleteUserRole, addToastNotification, fetch } = this.props

        return (
            <Table.Tr key={`roles${user.id}`}>
                <Table.Td xs={12}>
                    <Row>
                        {user?.roles
                            ?.sort(({ name: nameA }, { name: nameB }) => nameA.localeCompare(nameB))
                            .map(({ id: _id, name, guard_name, is_deletable: _is_deletable }) => {
                                return (
                                    <Col xs={4} key={`${_id}`}>
                                        <Dropdown.Container triggerSize={'lg'} key={_id}>
                                            <Dropdown.Trigger
                                                size="lg"
                                                componentProps={{ block: true }}
                                                component={Label}
                                            >
                                                {name}
                                            </Dropdown.Trigger>
                                            <Dropdown.Menu>
                                                <Dropdown.Item
                                                    color={'info'}
                                                    onClick={() => {
                                                        navigate(`/permissions?roles=${_id}`)
                                                    }}
                                                >
                                                    <DetailsIcon /> Show Role Permissions
                                                </Dropdown.Item>
                                                <Dropdown.Item
                                                    color={'info'}
                                                    onClick={() => {
                                                        navigate(`/users?roles=${_id}`)
                                                    }}
                                                >
                                                    <DetailsIcon /> Show Users with Role
                                                </Dropdown.Item>
                                                <Dropdown.Item
                                                    color={'warning'}
                                                    onClick={() => {
                                                        navigate(`/roles/edit?id=${_id}`)
                                                    }}
                                                >
                                                    <EditIcon /> Edit Role
                                                </Dropdown.Item>
                                                <Dropdown.Item
                                                    color="danger"
                                                    onClick={() => {
                                                        setIsLoading(true)

                                                        return deleteUserRole(
                                                            {
                                                                id: user.id,
                                                            },
                                                            {
                                                                id: _id,
                                                            },
                                                        ).then(() => {
                                                            fetch().then(() => {
                                                                setIsLoading(false)
                                                                addToastNotification({
                                                                    title: 'Delete success.',
                                                                    text: 'Role has been removed from user.',
                                                                    type: 'success',
                                                                })
                                                            })
                                                        })
                                                    }}
                                                >
                                                    <DeleteIcon /> Remove Role from User
                                                </Dropdown.Item>
                                            </Dropdown.Menu>
                                        </Dropdown.Container>
                                    </Col>
                                )
                            })}
                    </Row>
                </Table.Td>
            </Table.Tr>
        )
    }
}

export default RowExpandRoles
