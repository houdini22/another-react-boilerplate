import * as React from 'react'
import { Col, Row } from '../../../../components'
import { formatDateTime } from '../../../../helpers/date-time'
import { OpenModal, User } from '../../../../../types.d'
import { ButtonEdit } from '../../../../components/common/ButtonEdit'
import { ButtonDelete } from '../../../../components/common/ButtonDelete'
import { ButtonDetails } from '../../../../components/common/ButtonDetails'
import { AuthorizationManager } from '../../../../containers/AuthorizationManager'

interface RowActionsProps {
    user: User
    openModal: OpenModal
}

export class RowActions extends React.Component<RowActionsProps, null> {
    render() {
        const { user, openModal } = this.props

        return (
            <AuthorizationManager>
                {({ canByPermission }) => (
                    <div>
                        {canByPermission('users.edit') && <ButtonEdit href={`/users/edit?id=${user.id}`} />}
                        {!!user.is_deletable && canByPermission('users.delete') && (
                            <ButtonDelete
                                onClick={() => {
                                    openModal(`user-${user.id}-delete`)
                                }}
                            />
                        )}
                        <ButtonDetails
                            content={
                                <>
                                    <Row>
                                        <Col xs={5}>Created at:</Col>
                                        <Col xs={7}>{user.created_at != null ? formatDateTime(user.created_at) : 'never'}</Col>
                                    </Row>
                                    <Row>
                                        <Col xs={5}>Last edit:</Col>
                                        <Col xs={7}>{user.updated_at != null ? formatDateTime(user.updated_at) : 'never'}</Col>
                                    </Row>
                                    <Row>
                                        <Col xs={5}>Last active:</Col>
                                        <Col xs={7}>{user.last_active != null ? formatDateTime(user.last_active) : 'never'}</Col>
                                    </Row>
                                    <Row>
                                        <Col xs={5}>Email verified at:</Col>
                                        <Col xs={7}>{user.email_verified_at != null ? formatDateTime(user.email_verified_at) : 'never'}</Col>
                                    </Row>
                                </>
                            }
                        />
                    </div>
                )}
            </AuthorizationManager>
        )
    }
}

export default RowActions
