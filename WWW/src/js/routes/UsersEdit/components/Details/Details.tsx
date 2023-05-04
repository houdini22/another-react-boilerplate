import * as React from 'react'
import { Card, LoadingOverlay, Tabs } from '../../../../components'
import { DetailsUserPrimaryInfoRow } from './DetailsUserPrimaryInfoRow'
import { DetailsUserAvatarRow } from './DetailsUserAvatarRow'
import { DetailsUserLastActiveRow } from './DetailsUserLastActiveRow'
import { DetailsUserEmailVerifiedRow } from './DetailsUserEmailVerifiedRow'
import { DetailsUserCreatedAtRow } from './DetailsUserCreatedAtRow'
import { DetailsUserUpdatedAtRow } from './DetailsUserUpdatedAtRow'
import { DetailsUserFilesRow } from './DetailsUserFilesRow'
import { DetailsUserPermissionsRow } from './DetailsUserPermissionsRow'
import { DetailsUserRolesRow } from './DetailsUserRolesRow'
import { ModalConfirm } from '../../../../components/common/ModalConfirm'
import { User } from '../../../../../types.d'

interface HeaderProps {
    user: User
    navigate: Function
    setUploadProgress: Function
    setIsLoading: Function
    uploadProgress: number
    sendAvatar: Function
    fetchOne: Function
    isLoading: boolean
}

interface HeaderState {
    modalVisible: boolean
}

export class Details extends React.Component<HeaderProps, HeaderState> {
    state = {
        modalVisible: false,
    }

    openModal() {
        this.setState({
            modalVisible: true,
        })
    }

    closeModal() {
        this.setState({
            modalVisible: false,
        })
    }

    render() {
        const { modalVisible } = this.state
        const {
            isLoading,
            user,
            setUploadProgress,
            setIsLoading,
            uploadProgress,
            sendAvatar,
            fetchOne,
            addToastNotification,
            deleteAvatar,
            registerModal,
            openModal,
            closeModal,
        } = this.props

        registerModal(
            `user-avatar-delete`,
            <ModalConfirm
                onConfirm={() => {
                    setIsLoading(true)
                    deleteAvatar(user).then(() => {
                        fetchOne(user.id).then(() => {
                            addToastNotification({
                                title: 'Remove success.',
                                text: `User ID: ${user.id} Avatar has been removed.`,
                                type: 'success',
                                href: `/users/edit?id${user.id}`,
                            })
                            setIsLoading(false)
                            closeModal(`user-avatar-delete`)
                        })
                    })
                }}
                onCancel={() => closeModal(`user-avatar-delete`)}
            >
                <p>
                    Are you sure to delete Avatar of User: <b>{user.name}</b>?
                </p>
            </ModalConfirm>,
        )

        return (
            <Card header={<h1>Details</h1>}>
                <Tabs.Container>
                    <Tabs.Tab name={'general_info'}>
                        <Tabs.Trigger>General info</Tabs.Trigger>
                        <Tabs.Content>
                            <DetailsUserPrimaryInfoRow user={user} />
                            <DetailsUserAvatarRow
                                user={user}
                                openModal={this.openModal.bind(this)}
                                closeModal={this.closeModal.bind(this)}
                                setUploadProgress={setUploadProgress}
                                setIsLoading={setIsLoading}
                                sendAvatar={sendAvatar}
                                fetchOne={fetchOne}
                                isLoading={isLoading}
                                visible={modalVisible}
                                uploadProgress={uploadProgress}
                                addToastNotification={addToastNotification}
                                openModalAvatar={() => openModal(`user-avatar-delete`)}
                            />
                        </Tabs.Content>
                    </Tabs.Tab>
                    <Tabs.Tab name={'details'}>
                        <Tabs.Trigger>Details</Tabs.Trigger>
                        <Tabs.Content>
                            <DetailsUserCreatedAtRow user={user} />
                            <DetailsUserUpdatedAtRow user={user} />
                            <DetailsUserLastActiveRow user={user} />
                            <DetailsUserEmailVerifiedRow user={user} />
                            <DetailsUserFilesRow user={user} />
                            <DetailsUserRolesRow user={user} />
                            <DetailsUserPermissionsRow user={user} />
                        </Tabs.Content>
                    </Tabs.Tab>
                </Tabs.Container>
                {isLoading && <LoadingOverlay />}
            </Card>
        )
    }
}

export default Details
