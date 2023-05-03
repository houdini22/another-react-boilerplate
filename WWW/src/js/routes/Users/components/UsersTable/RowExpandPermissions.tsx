import * as React from 'react'
import { Col, Row, Table, Label, Dropdown } from '../../../../components'
import { DeleteIcon, RoleIcon, UserIcon } from '../../../../components/icons'

interface RowExpandPermissionsProps {
    user: Object
    permissionsFromRoles: Object
    setIsLoading: Function
    navigate: Function
    deleteUserPermission: Function
    addToastNotification: Function
    fetch: Function
}

export class RowExpandPermissions extends React.Component<RowExpandPermissionsProps, null> {
    render() {
        const {
            user,
            permissionsFromRoles,
            setIsLoading,
            navigate,
            deleteUserPermission,
            addToastNotification,
            fetch,
        } = this.props

        return (
            <Table.Tr key={`permissions${user.id}`}>
                <Table.Td xs={12}>
                    <Row>
                        {Object.keys(permissionsFromRoles)
                            ?.map((key) => permissionsFromRoles[key])
                            .sort(({ name: nameA }, { name: nameB }) => nameA.localeCompare(nameB))
                            .map(
                                ({
                                    id: _id,
                                    name,
                                    guard_name,
                                    is_deletable: _is_deletable,
                                    pivot: { model_type = '' } = {},
                                }) => {
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
                                                            setIsLoading(true)

                                                            return navigate(`/roles?permissions=${_id}`)
                                                        }}
                                                    >
                                                        <RoleIcon /> Show Roles with Permission
                                                    </Dropdown.Item>
                                                    <Dropdown.Item
                                                        color={'info'}
                                                        onClick={() => {
                                                            setIsLoading(true)

                                                            return navigate(`/users?permissions=${_id}`)
                                                        }}
                                                    >
                                                        <UserIcon /> Show Users with Permission
                                                    </Dropdown.Item>
                                                    {model_type.match(/User/) && (
                                                        <Dropdown.Item
                                                            color="danger"
                                                            onClick={() => {
                                                                setIsLoading(true)

                                                                return deleteUserPermission(
                                                                    {
                                                                        id: _id,
                                                                    },
                                                                    {
                                                                        id: user.id,
                                                                    },
                                                                ).then(() => {
                                                                    fetch().then(() => {
                                                                        setIsLoading(false)
                                                                        addToastNotification({
                                                                            title: 'Delete success.',
                                                                            text: 'Permission has been removed from user.',
                                                                            type: 'success',
                                                                        })
                                                                    })
                                                                })
                                                            }}
                                                        >
                                                            <DeleteIcon /> Remove Permission from User
                                                        </Dropdown.Item>
                                                    )}
                                                </Dropdown.Menu>
                                            </Dropdown.Container>
                                        </Col>
                                    )
                                },
                            )}
                    </Row>
                </Table.Td>
            </Table.Tr>
        )
    }
}

export default RowExpandPermissions
