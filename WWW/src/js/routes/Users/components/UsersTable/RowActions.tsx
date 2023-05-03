import * as React from 'react'
import { Button, Col, Dropdown, Label, Popover, Row, Typography } from '../../../../components'
import {
    AvatarIcon,
    DeleteIcon,
    DetailsIcon,
    EditIcon,
    FileIcon,
    InfoIcon,
    PermissionIcon,
    RoleIcon,
    UserIcon,
} from '../../../../components/icons'
import { apiURL } from '../../../../helpers/api'
import { formatDateTime } from '../../../../helpers/date-time'

interface FiltersProps {
    user: Object
    setUserToDelete: Function
    navigate: Function
}

export class RowActions extends React.Component<FiltersProps, null> {
    render() {
        const { user, setUserToDelete, navigate } = this.props

        return (
            <div>
                <Button
                    icon={<EditIcon />}
                    iconOnly
                    color={'warning'}
                    onClick={() => {
                        navigate(`/users/edit?id=${user.id}`)
                    }}
                />
                {user.is_deletable == 1 && (
                    <Button
                        icon={<DeleteIcon />}
                        iconOnly
                        color={'danger'}
                        onClick={() => {
                            setUserToDelete(user.id)
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
