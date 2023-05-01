import * as React from 'react'
import { Card, Dropdown, Label, LoadingOverlay } from '../../../components'
import { processAPIerrorResponseToFormErrors } from '../../../modules/http'
import { SubmissionError } from 'redux-form'
import { DeleteIcon } from '../../../components/icons'

interface HeaderProps {
    role: Object
}

export class Permissions extends React.Component<HeaderProps, null> {
    render() {
        const { role, setIsLoading, fetchOne, isLoading, deletePermission, deleteUserPermission } = this.props
        return (
            <Card header={<h1>Permissions</h1>}>
                {role?.permissions?.map(({ id: _id, name, guard_name, is_deletable }) => {
                    return (
                        <Dropdown.Container size={'sm'} triggerSize={'lg'} key={_id}>
                            <Dropdown.Trigger size="lg" component={Label}>
                                {name} - {guard_name}
                            </Dropdown.Trigger>
                            <Dropdown.Menu>
                                <Dropdown.Item
                                    color="danger"
                                    onClick={() => {
                                        setIsLoading(true)

                                        return deleteUserPermission(role, {
                                            id: _id,
                                        }).then(() => {
                                            /*addToastNotification(
                                                    {
                                                        type: 'success',
                                                        title: 'Delete success.',
                                                        text: 'Permission has been removed.',
                                                    },
                                                )*/
                                            Promise.all([fetchOne(role.id)]).then(() => {
                                                setIsLoading(false)
                                            })
                                        })
                                    }}
                                >
                                    <DeleteIcon /> Remove from Role
                                </Dropdown.Item>
                                {is_deletable == 1 && (
                                    <Dropdown.Item
                                        color="danger"
                                        onClick={() => {
                                            setIsLoading(true)

                                            return deletePermission({
                                                id: _id,
                                            }).then(() => {
                                                /*addToastNotification(
                                                        {
                                                            type: 'success',
                                                            title: 'Delete success.',
                                                            text: 'Permission has been deleted.',
                                                        },
                                                    )*/
                                                Promise.all([fetchOne(role.id)]).then(() => {
                                                    setIsLoading(false)
                                                })
                                            })
                                        }}
                                    >
                                        <DeleteIcon /> Delete Permission
                                    </Dropdown.Item>
                                )}
                            </Dropdown.Menu>
                        </Dropdown.Container>
                    )
                })}
                {isLoading && <LoadingOverlay />}
            </Card>
        )
    }
}

export default Permissions
