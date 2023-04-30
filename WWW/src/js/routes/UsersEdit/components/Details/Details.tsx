import * as React from 'react'
import { Button, Card, Col, LoadingOverlay, PageHeader, Row, Typography } from '../../../../components'
import { FaHome as HomeIcon } from 'react-icons/fa'
import { apiURL } from '../../../../helpers/api'
import { UploadAvatarFormContainer } from './UploadAvatarFormContainer'
import { formatDateTime } from '../../../../helpers/date-time'
import UploadAvatarModal from './UploadAvatarModal'

interface HeaderProps {
    user: Object
    navigate: Function
    setUploadProgress: Function
    setIsLoading: Function
    uploadProgress: number
    sendAvatar: Function
    fetchOne: Function
    forceLogin: Function
    sendActivationEmail: Function
    isLoading: boolean
}

interface HeaderState {
    uploadAvatarModalVisible: boolean
}

export class Header extends React.Component<HeaderProps, HeaderState> {
    state = {
        uploadAvatarModalVisible: false,
    }

    render() {
        const { uploadAvatarModalVisible } = this.state
        const {
            isLoading,
            user,
            setUploadProgress,
            setIsLoading,
            uploadProgress,
            sendAvatar,
            fetchOne,
            forceLogin,
            sendActivationEmail,
        } = this.props
        return (
            <Card header={<h1>Details</h1>}>
                <Typography.Container>
                    <h2>
                        <b>{user.name}</b>
                    </h2>
                </Typography.Container>
                <Typography.Container>
                    <h3>
                        <b>{user.email}</b>
                    </h3>
                </Typography.Container>
                <Row>
                    <Col xs={4} style={{ marginBottom: 10 }}>
                        Avatar
                    </Col>
                    <Col xs={8} style={{ marginBottom: 10 }}>
                        {user?.avatar?.id != null && (
                            <div>
                                <img
                                    src={apiURL(`files/preview/${user.avatar?.id}`)}
                                    style={{ maxWidth: 128, marginBottom: 20 }}
                                />
                            </div>
                        )}

                        <Button
                            size={'xs'}
                            onClick={() =>
                                this.setState({
                                    uploadAvatarModalVisible: true,
                                })
                            }
                        >
                            Upload Avatar
                        </Button>
                        <UploadAvatarModal
                            close={() =>
                                this.setState({
                                    uploadAvatarModalVisible: false,
                                })
                            }
                            user={user}
                            setUploadProgress={setUploadProgress}
                            setIsLoading={setIsLoading}
                            sendAvatar={sendAvatar}
                            fetchOne={fetchOne}
                            isLoading={isLoading}
                            visible={uploadAvatarModalVisible}
                            uploadProgress={uploadProgress}
                        />
                    </Col>
                </Row>
                <Row>
                    <Col xs={4} style={{ marginBottom: 10 }}>
                        Last active at
                    </Col>
                    <Col xs={8} style={{ marginBottom: 10 }}>
                        {!!user.last_active ? formatDateTime(user.last_active) : '---'}{' '}
                        {!!user.last_active && !!user.token && (
                            <Button
                                size={'xs'}
                                onClick={() => {
                                    forceLogin(user).then(() => {
                                        Promise.all([fetchOne(user['id'])]).then(() => {})
                                    })
                                }}
                            >
                                Force Login
                            </Button>
                        )}
                    </Col>
                </Row>
                <Row>
                    <Col xs={4} style={{ marginBottom: 10 }}>
                        Email verified at
                    </Col>
                    <Col xs={8} style={{ marginBottom: 10 }}>
                        {user.status === 1 && (
                            <span>
                                {!!user.email_verified_at && formatDateTime(user.email_verified_at)}
                                {!user.email_verified_at && 'never'}{' '}
                                <Button
                                    isLoading={isLoading}
                                    size={'xs'}
                                    color={'warning'}
                                    onClick={() => {
                                        setIsLoading(true)

                                        sendActivationEmail(user).then(() => {
                                            Promise.all([fetchOne(user['id'])]).then(() => {
                                                setIsLoading(false)
                                            })
                                        })
                                    }}
                                >
                                    Send activation
                                </Button>
                            </span>
                        )}
                        {user.status === 0 && '---'}
                    </Col>
                </Row>
                {isLoading && <LoadingOverlay />}
            </Card>
        )
    }
}

export default Header
