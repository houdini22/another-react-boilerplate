import * as React from 'react'
import { Field } from 'redux-form'
import { Button, FormField } from '../../../../components'

interface AddPermissionFormProps {
    handleSubmit: Function
    permission: string
    roles: Array
    user: any
}

class AddRoleForm extends React.Component<AddPermissionFormProps> {
    isDisabled() {
        const { roles, user } = this.props
        return (
            roles
                ?.map(({ id }) => {
                    return {
                        disabled: user?.roles?.find(({ id: _id }) => id === _id),
                    }
                })
                .filter(({ disabled }) => {
                    return !disabled
                }).length === 0
        )
    }

    render() {
        const { handleSubmit, roles, user } = this.props

        return (
            <form onSubmit={handleSubmit}>
                <Field
                    name="role"
                    label="Role"
                    type="select"
                    options={[
                        {
                            label: '--- choose ---',
                            value: null,
                        },
                        ...(roles
                            ?.sort(({ name: nameA }, { name: nameB }) => nameA.localeCompare(nameB))
                            .map(({ id, name, guard_name }) => {
                                return {
                                    value: id,
                                    label: `${name} - ${guard_name}`,
                                    disabled: user?.roles?.find(({ id: _id }) => id === _id),
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

export { AddRoleForm }
export default { EditForm: AddRoleForm }
