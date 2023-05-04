import * as React from 'react'
import { Field } from 'redux-form'
import { Alert, Button, Card, FormField, Section } from '../../../../components'

class AddForm extends React.Component<null, null> {
    render() {
        const {
            handleSubmit,
            roles,
            users,
            newPermissionUsers,
            addNewPermissionToUser,
            removeNewPermissionFromUser,
            role_id,
        } = this.props

        return (
            <form onSubmit={handleSubmit}>
                <Field
                    name="role_id"
                    label="Role"
                    type="select"
                    placeholder={'--- choose ---'}
                    options={roles
                        ?.sort(({ name: labelA }, { name: labelB }) => labelA.localeCompare(labelB))
                        .map(({ id, name }) => {
                            return {
                                label: `${name}`,
                                value: id,
                            }
                        })}
                    component={FormField}
                />
                <Field name="name" label="Name" type="text" component={FormField} autoFocus />
                <Field name="guard_name" label="Guard" type="hidden" inputOnly value={'web'} component={FormField} />
                {!role_id && (
                    <Card header={<h1>Add to Users</h1>}>
                        {newPermissionUsers.length > 0 && <Alert color={'info'}>Click added User to remove.</Alert>}
                        <Field
                            name="_users"
                            label="User"
                            type="select"
                            placeholder={`--- choose ---`}
                            options={users
                                .sort(({ name: nameA }, { name: nameB }) => nameA.localeCompare(nameB))
                                .map(({ id, name }) => ({
                                    label: name,
                                    value: id,
                                    disabled: !!newPermissionUsers.find(({ id: _id }) => id === _id),
                                }))}
                            onChange={(e, value) => {
                                addNewPermissionToUser(users.find((user) => Number(user.id) === Number(value)))
                            }}
                            component={FormField}
                        />
                        <Section>
                            {newPermissionUsers.map((user) => {
                                return (
                                    <Button
                                        key={user.id}
                                        roundless
                                        color={'secondary'}
                                        block
                                        onClick={() => {
                                            removeNewPermissionFromUser(user.id)
                                        }}
                                    >
                                        {user.name}
                                    </Button>
                                )
                            })}
                        </Section>
                    </Card>
                )}
                <Button color="success" type="submit" block>
                    Save
                </Button>
            </form>
        )
    }
}

export { AddForm }
export default { EditForm: AddForm }
