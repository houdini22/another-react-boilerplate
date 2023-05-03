import * as React from 'react'
import { Card, Dropdown, Label, LoadingOverlay } from '../../../../components'
import { DeleteIcon, DetailsIcon, InfoIcon, EditIcon } from '../../../../components/icons'
import { ModalConfirm } from '../../../../components/common/ModalConfirm'
import { User } from '../../../../../types.d'

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
        const {
            setIsLoading,
            deleteUserRole,
            fetchOne,
            user,
            isLoading,
            navigate,
            addToastNotification,
            openModal,
            closeModal,
            registerModal,
        } = this.props

        return (
            <Card header={<h1>Roles</h1>}>
                {user?.roles
                    ?.sort(({ name: nameA }, { name: nameB }) => nameA.localeCompare(nameB))
                    .map(({ id: _id, name }) => {
                        registerModal(
                            `user-delete-role-${_id}`,
                            <ModalConfirm
                                onConfirm={() => {
                                    setIsLoading(true)

                                    return deleteUserRole(user, {
                                        id: _id,
                                    }).then(() => {
                                        Promise.all([fetchOne(user['id'])]).then(() => {
                                            setIsLoading(false)
                                            addToastNotification({
                                                type: 'success',
                                                title: 'Remove success.',
                                                text: 'Role has been removed.',
                                            })
                                            closeModal(`user-delete-role-${_id}`)
                                        })
                                    })
                                }}
                                onCancel={() => closeModal(`user-delete-role-${_id}`)}
                            >
                                <p>
                                    Are you sure to delete Role: <b>{name}</b> from User: <b>{user.name}</b>?
                                </p>
                            </ModalConfirm>,
                        )

                        return (
                            <Dropdown.Container triggerSize={'lg'} key={_id}>
                                <Dropdown.Trigger component={Label} componentProps={{ block: true }}>
                                    {name}
                                </Dropdown.Trigger>
                                <Dropdown.Menu>
                                    <Dropdown.Item type="header">
                                        <InfoIcon /> Role id {_id}
                                    </Dropdown.Item>
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
                                            openModal(`user-delete-role-${_id}`)
                                        }}
                                    >
                                        <DeleteIcon /> Remove Role from User
                                    </Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown.Container>
                        )
                    })}
                {isLoading && <LoadingOverlay />}
            </Card>
        )
    }
}

export default Roles
