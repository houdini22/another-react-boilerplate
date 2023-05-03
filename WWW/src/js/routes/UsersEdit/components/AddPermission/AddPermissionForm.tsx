import * as React from 'react'
import { Field } from 'redux-form'
import { Button, FormField } from '../../../../components'
import { Role } from '../../../../../types.d'

interface AddPermissionFormProps {
    handleSubmit: Function
    permission: string
    roles: Array<Role>
    user: any
}

class AddPermissionForm extends React.Component<AddPermissionFormProps, null> {
    isDisabled() {
        const { permissions, user } = this.props
        return (
            permissions
                ?.map(({ id }) => {
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

        const perms = {}

        user?.permissions?.forEach(({ id, guard_name, is_deletable, name, ...rest }) => {
            if (perms[name]) {
                perms[name].occurence++
            } else {
                perms[name] = { name, id, guard_name, is_deletable, ocurrence: 1, ...rest }
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
                                    disabled: !!perms[name],
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
