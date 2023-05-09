import * as React from 'react'
import { Button, Col, Row } from '../../../../components'
import { PermissionIcon } from '../../../../components/icons'
import { RouteManager } from '../../../../containers'
import { User } from '../../../../../types.d'

interface DetailsUserPermissionsRowProps {
    user: User
}

class DetailsUserPermissionsRow extends React.Component<DetailsUserPermissionsRowProps, null> {
    render() {
        const { user } = this.props

        return (
            <RouteManager>
                {({ navigate }) => (
                    <Row>
                        <Col xs={4} style={{ marginBottom: 10 }}>
                            Permissions
                        </Col>
                        <Col xs={8} style={{ marginBottom: 10 }}>
                            <Button color={'info'} icon={<PermissionIcon />} onClick={() => navigate(`/permissions?user=${user.name}`)}>
                                {user.permissions_count}
                            </Button>
                        </Col>
                    </Row>
                )}
            </RouteManager>
        )
    }
}

export { DetailsUserPermissionsRow }
export default { DetailsUserPermissionsRow }
