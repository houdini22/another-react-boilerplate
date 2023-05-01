import * as React from 'react'
import { Col, Row } from '../../../../components'
import { formatDateTime } from '../../../../helpers/date-time'
import { Link } from 'react-router-dom'

class DetailsUserFilesRow extends React.Component {
    render() {
        const { user } = this.props

        return (
            <Row>
                <Col xs={4} style={{ marginBottom: 10 }}>
                    Files
                </Col>
                <Col xs={8} style={{ marginBottom: 10 }}>
                    {user.files_count}
                    {user.files_count > 0 && (
                        <>
                            <br />
                            <Link to={`/media?filters[user]=${user.name}`}>Show</Link>
                        </>
                    )}
                </Col>
            </Row>
        )
    }
}

export { DetailsUserFilesRow }
export default { DetailsUserFilesRow }
