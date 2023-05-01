import * as React from 'react'
import { Col, Row } from '../../../../components'
import { formatDateTime } from '../../../../helpers/date-time'

class DetailsUserUpdatedAtRow extends React.Component {
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
