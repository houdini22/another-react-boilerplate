import * as React from 'react'
import { Col, Row } from '../../../../components'
import { formatDateTime } from '../../../../helpers/date-time'

class DetailsUserLastActiveRow extends React.Component {
    render() {
        const { user } = this.props

        return (
            <Row>
                <Col xs={4} style={{ marginBottom: 10 }}>
                    Last active at
                </Col>
                <Col xs={8} style={{ marginBottom: 10 }}>
                    {!!user.last_active ? formatDateTime(user.last_active) : '---'}
                </Col>
            </Row>
        )
    }
}

export { DetailsUserLastActiveRow }
export default { DetailsUserLastActiveRow }
