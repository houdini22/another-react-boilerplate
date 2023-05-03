import * as React from 'react'
import { Col, Row } from '../../../../components'
import { formatDateTime } from '../../../../helpers/date-time'
import { User } from '../../../../../types.d'

interface DetailsUserEmailVerifiedRowProps {
    user: User
}

class DetailsUserEmailVerifiedRow extends React.Component<DetailsUserEmailVerifiedRowProps, null> {
    render() {
        const { user } = this.props

        return (
            <Row>
                <Col xs={4} style={{ marginBottom: 10 }}>
                    Email verified at
                </Col>
                <Col xs={8} style={{ marginBottom: 10 }}>
                    {user.status === 1 && (
                        <span>
                            {!!user.email_verified_at && formatDateTime(user.email_verified_at)}
                            {!user.email_verified_at && 'never'}
                        </span>
                    )}
                    {user.status === 0 && '---'}
                </Col>
            </Row>
        )
    }
}

export { DetailsUserEmailVerifiedRow }
export default { DetailsUserEmailVerifiedRow }
