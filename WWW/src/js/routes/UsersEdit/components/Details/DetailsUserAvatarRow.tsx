import * as React from 'react'
import { Button, Col, Row, Tooltip, Typography } from '../../../../components'
import { apiURL } from '../../../../helpers/api'
import UploadAvatarModal from './UploadAvatarModal'

class DetailsUserAvatarRow extends React.Component {
    render() {
        const {
            user,
            openModal,
            closeModal,
            setUploadProgress,
            setIsLoading,
            sendAvatar,
            fetchOne,
            isLoading,
            visible,
            uploadProgress,
            addToastNotification,
        } = this.props

        return (
            <Row>
                <Col xs={4} style={{ marginBottom: 10 }}>
                    Avatar
                </Col>
                <Col xs={8} style={{ marginBottom: 10 }}>
                    {user?.avatar?.id != null && (
                        <Tooltip tooltip={<div>Size: {user.avatar.size}</div>}>
                            <img
                                src={apiURL(`files/preview/${user.avatar?.id}`)}
                                style={{ maxWidth: '100%', marginBottom: 20 }}
                            />
                        </Tooltip>
                    )}

                    <Button size={'xs'} onClick={() => openModal()} block>
                        Upload Avatar
                    </Button>

                    <UploadAvatarModal
                        close={() => closeModal()}
                        user={user}
                        setUploadProgress={setUploadProgress}
                        setIsLoading={setIsLoading}
                        sendAvatar={sendAvatar}
                        fetchOne={fetchOne}
                        isLoading={isLoading}
                        visible={visible}
                        uploadProgress={uploadProgress}
                        addToastNotification={addToastNotification}
                    />
                </Col>
            </Row>
        )
    }
}

export { DetailsUserAvatarRow }
export default { DetailsUserAvatarRow }
