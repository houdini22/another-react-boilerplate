import * as React from 'react'
import { Field } from 'redux-form'
import { Alert, Button, Card, Col, FormField, Row, Section } from '../../../../components'
import { sortRolesByNameAscending } from '../../../../helpers/roles'
import { sortUsersByNameAscending } from '../../../../helpers/users'

class AddForm extends React.Component<null, null> {
    render() {
        const {
            handleSubmit,
            roles,
            users,
            newUsers = [],
            addUserToNewPermission,
            removeUserFromNewPermission,
            role_id,
            noAddToUsers,
            noRoleId,
            canByPermission,
        } = this.props

        return (
            <form onSubmit={handleSubmit}>
                <Row>
                    <Col xs={6}>
                        <Card color={'primary'} header={<h1>Permission</h1>}>
                            {!noRoleId && (
                                <Field
                                    name="role_id"
                                    label="Role"
                                    type="select"
                                    placeholder={'--- choose ---'}
                                    options={sortRolesByNameAscending(roles).map(({ id, name }) => {
                                        return {
                                            label: `${name}`,
                                            value: id,
                                        }
                                    })}
                                    component={FormField}
                                />
                            )}
                            <Field name="name" label="Name" type="text" component={FormField} autoFocus />
                            <Field name="description" label="Description" type="textarea" component={FormField} />
                        </Card>
                    </Col>
                    <Col xs={6}>
                        {!role_id && !noAddToUsers && canByPermission('users.add_permission') && (
                            <Card header={<h1>Add to Users</h1>} color={'secondary'}>
                                {newUsers.length > 0 && <Alert color={'info'}>Click added User to remove.</Alert>}
                                <Field
                                    name="_users"
                                    label="User"
                                    type="select"
                                    placeholder={`--- choose ---`}
                                    options={sortUsersByNameAscending(users).map(({ id, name }) => ({
                                        label: name,
                                        value: id,
                                        disabled: !!newUsers.find(({ id: _id }) => id === _id),
                                    }))}
                                    onChange={(e, value) => {
                                        if (value) {
                                            addUserToNewPermission(users.find((user) => Number(user.id) === Number(value)))
                                        }
                                    }}
                                    component={FormField}
                                />
                                <Section>
                                    {newUsers.map((user) => {
                                        return (
                                            <Button
                                                key={user.id}
                                                roundless
                                                color={'secondary'}
                                                block
                                                onClick={() => {
                                                    removeUserFromNewPermission(user.id)
                                                }}
                                            >
                                                {user.name}
                                            </Button>
                                        )
                                    })}
                                </Section>
                            </Card>
                        )}
                    </Col>
                </Row>
                <Row>
                    <Col xs={12}>
                        <Button color="success" type="submit" block>
                            Save
                        </Button>
                    </Col>
                </Row>
            </form>
        )
    }
}

export { AddForm }
export default { AddForm }
