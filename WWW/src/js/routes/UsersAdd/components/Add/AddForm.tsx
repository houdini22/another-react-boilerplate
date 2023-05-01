import * as React from 'react'
import { Field } from 'redux-form'
import { Button, Card, Col, FormField, Row } from '../../../../components'
import Roles from '../Roles/Roles'
import Permissions from '../Permissions/Permissions'

class AddForm extends React.Component<null, null> {
    render() {
        const {
            handleSubmit,
            roles,
            addRoleToNewUser,
            removeRoleFromNewUser,
            permissions,
            addPermissionToNewUser,
            removePermissionFromNewUser,
        } = this.props

        return (
            <div>
                <form onSubmit={handleSubmit}>
                    <Row>
                        <Col xs={6}>
                            <Card>
                                <Field name="name" label="Name" type="text" component={FormField} autoFocus />
                                <Field name="email" label="Email" type="text" component={FormField} />
                                <Field name="password" label="Password" type="password" component={FormField} />
                                <Field
                                    name="password_confirmation"
                                    label="Confirm password"
                                    type="password"
                                    component={FormField}
                                />
                                <Field
                                    name="status"
                                    label="Status"
                                    type="select"
                                    options={[
                                        {
                                            label: 'not active',
                                            value: 0,
                                        },
                                        {
                                            label: 'active',
                                            value: 1,
                                        },
                                    ]}
                                    component={FormField}
                                />
                            </Card>
                        </Col>
                        <Col xs={6}>
                            <Roles
                                roles={roles}
                                addRoleToNewUser={addRoleToNewUser}
                                removeRoleFromNewUser={removeRoleFromNewUser}
                            />
                            <Permissions
                                permissions={permissions}
                                addPermissionToNewUser={addPermissionToNewUser}
                                removePermissionFromNewUser={removePermissionFromNewUser}
                            />
                        </Col>
                        <Col xs={12}>
                            <Button color="success" type="submit" block>
                                Save
                            </Button>
                        </Col>
                    </Row>
                </form>
            </div>
        )
    }
}

export { AddForm }
export default { EditForm: AddForm }
