import * as React from 'react'
import { Button, Modal } from '../../../../components'
import { UploadAvatarFormContainer } from './UploadAvatarFormContainer'

interface UploadAvatarModalProps {
    user: Object
    setUploadProgress: Function
    setIsLoading: Function
    sendAvatar: Function
    fetchOne: Function
    isLoading: boolean
    visible: boolean
    close: Function
}

interface UploadAvatarModalState {}

export class UploadAvatarModal extends React.Component<UploadAvatarModalProps, UploadAvatarModalState> {
    render() {
        const {
            user,
            setUploadProgress,
            setIsLoading,
            uploadProgress,
            sendAvatar,
            fetchOne,
            visible,
            close,
            addToastNotification,
        } = this.props
        return (
            <Modal.Container visible={visible} color={'primary'}>
                <Modal.Header close={close} closeIcon>
                    Upload Avatar
                </Modal.Header>
                <Modal.Body>
                    <UploadAvatarFormContainer
                        uploadProgress={uploadProgress}
                        onChange={(e) => {
                            setIsLoading(true)
                            setUploadProgress(-1)
                            if (_.get(e?.target?.files, 0)) {
                                sendAvatar(user, _.get(e?.target?.files, 0)).then(() => {
                                    Promise.all([fetchOne(user['id'])]).then(() => {
                                        setIsLoading(false)
                                        close()
                                        addToastNotification({
                                            type: 'success',
                                            title: 'Save success.',
                                            text: `User ID: ${user.id} Avatar has been uploaded.`,
                                            href: `/users/edit?id=${user.id}`,
                                        })
                                    })
                                })
                            }
                        }}
                    />
                    <Button color={'secondary'} block onClick={() => close()}>
                        Cancel
                    </Button>
                </Modal.Body>
            </Modal.Container>
        )
    }
}

export default UploadAvatarModal
