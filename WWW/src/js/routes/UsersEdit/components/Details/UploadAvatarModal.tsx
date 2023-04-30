import * as React from 'react'
import { Modal } from '../../../../components'
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
        const { user, setUploadProgress, setIsLoading, uploadProgress, sendAvatar, fetchOne, visible, close } =
            this.props
        return (
            <Modal.Container visible={visible} color={'primary'}>
                <Modal.Header>Upload Avatar</Modal.Header>
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
                                    })
                                })
                            }
                        }}
                    />
                </Modal.Body>
            </Modal.Container>
        )
    }
}

export default UploadAvatarModal
