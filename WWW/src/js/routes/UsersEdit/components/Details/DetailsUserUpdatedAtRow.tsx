import * as React from 'react'
import { Col, Row } from '../../../../components'
import { formatDateTime } from '../../../../helpers/date-time'
import { User } from '../../../../../types.d'

interface DetailsUserUpdatedAtRowProps {
    user: User
}

class DetailsUserUpdatedAtRow extends React.Component<DetailsUserUpdatedAtRowProps, null> {
    render() {
        const { user } = this.props

        return (
            <Row>
                <Col xs={4} style={{ marginBottom: 10 }}>
                    Last Edit
                </Col>
                <Col xs={8} style={{ marginBottom: 10 }}>
                    {!!user.updated_at ? formatDateTime(user.updated_at) : '---'}
                </Col>
            </Row>
        )
    }
}

export { DetailsUserUpdatedAtRow }
export default { DetailsUserUpdatedAtRow }
