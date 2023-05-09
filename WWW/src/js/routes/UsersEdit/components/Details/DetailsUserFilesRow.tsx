import * as React from 'react'
import { Button, Col, Row } from '../../../../components'
import { FileIcon } from '../../../../components/icons'
import { RouteManager } from '../../../../containers'
import { User } from '../../../../../types.d'

interface DetailsUserFilesRowProps {
    user: User
}

class DetailsUserFilesRow extends React.Component<DetailsUserFilesRowProps, null> {
    render() {
        const { user } = this.props

        return (
            <RouteManager>
                {({ navigate }) => (
                    <Row>
                        <Col xs={4} style={{ marginBottom: 10 }}>
                            Files
                        </Col>
                        <Col xs={8} style={{ marginBottom: 10 }}>
                            <Button color={'info'} icon={<FileIcon />} onClick={() => navigate(`/media?user=${user.name}`)}>
                                {user.files_count}
                            </Button>
                        </Col>
                    </Row>
                )}
            </RouteManager>
        )
    }
}

export { DetailsUserFilesRow }
export default { DetailsUserFilesRow }
