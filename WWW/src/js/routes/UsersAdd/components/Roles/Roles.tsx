import * as React from 'react'
import { Card, Col, FormField, Row } from '../../../../components'

interface RolesProps {
    roles: any
}

export class Roles extends React.Component<RolesProps, null> {
    render() {
        const { roles, addRoleToNewUser, removeRoleFromNewUser } = this.props
        return (
            <Card header={<h1>Roles</h1>}>
                {roles?.map(({ id, name }) => {
                    return (
                        <Row key={id}>
                            <Col xs={12}>
                                <FormField
                                    type={'checkbox'}
                                    inputOnly
                                    inputContainerStyle={{
                                        marginBottom: 0,
                                        display: 'inline-block',
                                        marginRight: 5,
                                    }}
                                    onChange={(checked) => {
                                        if (checked) {
                                            addRoleToNewUser(id)
                                        } else {
                                            removeRoleFromNewUser(id)
                                        }
                                    }}
                                />
                                <span>{name}</span>
                            </Col>
                        </Row>
                    )
                })}
            </Card>
        )
    }
}

export default Roles
