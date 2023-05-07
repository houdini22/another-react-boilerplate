import * as React from 'react'
import { Button, Col, Row } from '../../../../components'
import { RoleIcon } from '../../../../components/icons'
import { RouteManager } from '../../../../containers/RouteManager'
import { User } from '../../../../../types.d'

interface DetailsUserRolesRowProps {
    user: User
}

class DetailsUserRolesRow extends React.Component<DetailsUserRolesRowProps, null> {
    render() {
        const { user } = this.props

        return (
            <RouteManager>
                {({ navigate }) => (
                    <Row>
                        <Col xs={4} style={{ marginBottom: 10 }}>
                            Roles
                        </Col>
                        <Col xs={8} style={{ marginBottom: 10 }}>
                            <Button color={'info'} icon={<RoleIcon />} onClick={() => navigate(`/roles?user=${user.name}`)}>
                                {user.roles_count}
                            </Button>
                        </Col>
                    </Row>
                )}
            </RouteManager>
        )
    }
}

export { DetailsUserRolesRow }
export default { DetailsUserRolesRow }
