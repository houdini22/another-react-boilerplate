import * as React from 'react'
import { Field } from 'redux-form'
import { Button, FormField } from '../../../../components'
import { Permission, Role } from '../../../../../types.d'

interface AddPermissionFormProps {
    handleSubmit: Function
    permission: string
    permissions: Array<Permission>
    role: any
    roles: Array<Role>
}

class AddPermissionForm extends React.Component<AddPermissionFormProps, null> {
    render() {
        const { handleSubmit, permission, permissions, role } = this.props

        return (
            <form onSubmit={handleSubmit}>
                <Field
                    name={'permission'}
                    label="Permission"
                    type="select"
                    options={[
                        {
                            label: '--- choose ---',
                            value: null,
                        },
                        {
                            label: 'add new',
                            value: 'add',
                        },
                        ...(permissions?.map(({ id, name }) => {
                            return {
                                value: id,
                                label: `${name}`,
                                disabled: role?.permissions?.find(({ id: _id }) => id === _id),
                            }
                        }) || []),
                    ]}
                    component={FormField}
                />
                <Field
                    type={'hidden'}
                    name={'role_id'}
                    value={role?.id || 0}
                    component={FormField}
                    inputOnly
                    style={{ display: 'none' }}
                />
                {permission === 'add' && (
                    <>
                        <Field name="name" label="Name" type="text" component={FormField} autoFocus />
                        <Field
                            name="guard_name"
                            label="Guard"
                            type="hidden"
                            inputOnly
                            value={'web'}
                            component={FormField}
                        />
                    </>
                )}
                <Button color="success" type="submit" block>
                    Save
                </Button>
            </form>
        )
    }
}

export { AddPermissionForm }
export default { EditForm: AddPermissionForm }
