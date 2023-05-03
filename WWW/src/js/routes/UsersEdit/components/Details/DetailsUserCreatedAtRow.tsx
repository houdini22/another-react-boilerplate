import * as React from 'react'
import { Col, Row } from '../../../../components'
import { formatDateTime } from '../../../../helpers/date-time'
import { User } from '../../../../../types.d'

interface DetailsUserCreatedAtRowProps {
    user: User
}

class DetailsUserCreatedAtRow extends React.Component<DetailsUserCreatedAtRowProps, null> {
    render() {
        const { user } = this.props

        return (
            <Row>
                <Col xs={4} style={{ marginBottom: 10 }}>
                    Created at
                </Col>
                <Col xs={8} style={{ marginBottom: 10 }}>
                    {!!user.created_at ? formatDateTime(user.created_at) : '---'}
                </Col>
            </Row>
        )
    }
}

export { DetailsUserCreatedAtRow }
export default { DetailsUserCreatedAtRow }
