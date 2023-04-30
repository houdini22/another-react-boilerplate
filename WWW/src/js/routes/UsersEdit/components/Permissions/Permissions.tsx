import * as React from 'react'
import { Card, Dropdown, Label, LoadingOverlay } from '../../../../components'
import { DeleteIcon } from '../../../../components/icons'

interface AddRoleProps {
    roles: any
    setIsLoading: Function
    deletePermission: Function
    fetchOne: Function
    user: Object
    isLoading: boolean
}

export class AddRole extends React.Component<AddRoleProps, null> {
    render() {
        const { setIsLoading, deletePermission, fetchOne, user, isLoading } = this.props
        return (
            <Card header={<h1>Permissions</h1>}>
                {user?.roles?.map(({ permissions }) => {
                    return (
                        <>
                            {permissions?.map(({ id, name, guard_name, is_deletable }) => {
                                return (
                                    <Dropdown.Container size={'sm'} triggerSize={'lg'} key={id}>
                                        <Dropdown.Trigger component={Label}>
                                            {name} - {guard_name}
                                        </Dropdown.Trigger>
                                        <Dropdown.Menu>
                                            {is_deletable == 1 && (
                                                <Dropdown.Item
                                                    color="danger"
                                                    onClick={() => {
                                                        setIsLoading(true)

                                                        return deletePermission({
                                                            id,
                                                        }).then(() => {
                                                            Promise.all([fetchOne(user['id'])]).then(() => {
                                                                setIsLoading(false)
                                                            })
                                                        })
                                                    }}
                                                >
                                                    <DeleteIcon /> Delete Permission Permanently
                                                </Dropdown.Item>
                                            )}
                                        </Dropdown.Menu>
                                    </Dropdown.Container>
                                )
                            })}
                        </>
                    )
                })}
                {isLoading && <LoadingOverlay />}
            </Card>
        )
    }
}

export default AddRole
