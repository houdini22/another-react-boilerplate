import * as React from 'react'
import { Field } from 'redux-form'
import { Button, FormField } from '../../../../components'

interface AddPermissionFormProps {
    handleSubmit: Function
    permission: string
    roles: Array
    user: any
}

class AddPermissionForm extends React.Component<AddPermissionFormProps> {
    isDisabled() {
        const { permissions, user } = this.props
        return (
            permissions
                ?.map(({ id, name, guard_name }) => {
                    return {
                        disabled: user?.permissions?.find(({ id: _id }) => id === _id),
                    }
                })
                .filter(({ disabled }) => {
                    return !disabled
                }).length === 0
        )
    }

    render() {
        const { handleSubmit, permissions, user } = this.props

        const permissionsFromRoles = {}

        user?.roles?.forEach(({ permissions }) => {
            permissions?.forEach(({ name, ...rest }) => {
                if (permissionsFromRoles[name]) {
                    if (!permissionsFromRoles[name].occurence) {
                        permissionsFromRoles[name].occurence = 1
                    }
                    permissionsFromRoles[name].occurence++
                } else {
                    permissionsFromRoles[name] = { name, ...rest }
                }
            })
        })

        user?.permissions?.forEach(({ id, guard_name, is_deletable, name, ...rest }) => {
            if (permissionsFromRoles[name]) {
                if (!permissionsFromRoles[name].occurence) {
                    permissionsFromRoles[name].occurence = 1
                }
                permissionsFromRoles[name].occurence++
            } else {
                permissionsFromRoles[name] = { name, id, guard_name, is_deletable, ...rest }
            }
        })

        return (
            <form onSubmit={handleSubmit}>
                <Field
                    name="permission_id"
                    label="Permission"
                    type="select"
                    options={[
                        {
                            label: '--- choose ---',
                            value: null,
                        },
                        ...(permissions
                            ?.sort(({ name: nameA }, { name: nameB }) => nameA.localeCompare(nameB))
                            .map(({ id, name, guard_name }) => {
                                return {
                                    value: id,
                                    label: `${name} - ${guard_name}`,
                                    disabled: !!permissionsFromRoles[name],
                                }
                            }) || []),
                    ]}
                    component={FormField}
                />
                <Button color="success" type="submit" block disabled={this.isDisabled()}>
                    Save
                </Button>
            </form>
        )
    }
}

export { AddPermissionForm }
export default { EditForm: AddPermissionForm }
