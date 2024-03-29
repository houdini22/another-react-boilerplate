import * as React from 'react'
import { Field } from 'redux-form'
import { Button, FormField } from '../../../../components'
import { Role } from '../../../../../types.d'
import { sortRolesByNameAscending } from '../../../../helpers/roles'

interface AddPermissionFormProps {
    handleSubmit: Function
    permission: string
    roles: Array<Role>
    user: any
}

class AddRoleForm extends React.Component<AddPermissionFormProps, null> {
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
                    placeholder={'--- choose ---'}
                    options={[
                        ...(sortRolesByNameAscending(roles).map(({ id, name }) => {
                            return {
                                value: id,
                                label: `${name}`,
                                disabled: user?.roles?.find(({ id: _id }) => id === _id),
                            }
                        }) || []),
                    ]}
                    component={FormField}
                />
                <Button color="success" type="submit" block disabled={this.isDisabled()}>
                    <span>Save</span>
                </Button>
            </form>
        )
    }
}

export { AddRoleForm }
export default { EditForm: AddRoleForm }
