import * as React from 'react'
import { Button, Col, Popover, Row } from '../../../../components'
import { DeleteIcon, DetailsIcon, EditIcon } from '../../../../components/icons'
import { formatDateTime } from '../../../../helpers/date-time'
import { User } from '../../../../../types.d'

interface FiltersProps {
    user: User
    navigate: Function
}

export class RowActions extends React.Component<FiltersProps, null> {
    render() {
        const { user, navigate, openModal, canByPermissions } = this.props

        return (
            <div>
                {canByPermissions('users.edit') && (
                    <Button
                        icon={<EditIcon />}
                        iconOnly
                        color={'warning'}
                        onClick={() => {
                            navigate(`/users/edit?id=${user.id}`)
                        }}
                    />
                )}
                {user.is_deletable == 1 && canByPermissions('users.delete') && (
                    <Button
                        icon={<DeleteIcon />}
                        iconOnly
                        color={'danger'}
                        onClick={() => {
                            openModal(`user-${user.id}-delete`)
                        }}
                    />
                )}
                <Popover.Container placement={'left-center'} pixelsWidth={300} trigger={'hover'}>
                    <Popover.Trigger>
                        <Button icon={<DetailsIcon />} iconOnly color={'info'} />
                    </Popover.Trigger>
                    <Popover.Content>
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
                            <Col xs={7}>
                                {user.email_verified_at != null ? formatDateTime(user.email_verified_at) : 'never'}
                            </Col>
                        </Row>
                    </Popover.Content>
                </Popover.Container>
            </div>
        )
    }
}

export default RowActions
