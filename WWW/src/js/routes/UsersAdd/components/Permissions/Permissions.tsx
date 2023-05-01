import * as React from 'react'
import { Card, Col, FormField, Row } from '../../../../components'

interface RolesProps {
    permissions: any
}

export class Permissions extends React.Component<RolesProps, null> {
    render() {
        const { permissions, addPermissionToNewUser, removePermissionFromNewUser } = this.props
        return (
            <Card header={<h1>Permissions</h1>}>
                {permissions?.map(({ id, name }) => {
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
                                            addPermissionToNewUser(id)
                                        } else {
                                            removePermissionFromNewUser(id)
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

export default Permissions
