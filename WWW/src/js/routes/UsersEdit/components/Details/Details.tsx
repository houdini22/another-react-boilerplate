import * as React from 'react'
import { Card, Col, LoadingOverlay, Row } from '../../../../components'
import { formatDateTime } from '../../../../helpers/date-time'
import { DetailsUserPrimaryInfoRow } from './DetailsUserPrimaryInfoRow'
import { DetailsUserAvatarRow } from './DetailsUserAvatarRow'
import { DetailsUserLastActiveRow } from './DetailsUserLastActiveRow'
import { DetailsUserEmailVerifiedRow } from './DetailsUserEmailVerifiedRow'
import { DetailsUserCreatedAtRow } from './DetailsUserCreatedAtRow'
import { DetailsUserUpdatedAtRow } from './DetailsUserUpdatedAtRow'
import { DetailsUserFilesRow } from './DetailsUserFilesRow'

interface HeaderProps {
    user: Object
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

export class Header extends React.Component<HeaderProps, HeaderState> {
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
        const { isLoading, user, setUploadProgress, setIsLoading, uploadProgress, sendAvatar, fetchOne } = this.props
        return (
            <Card header={<h1>Details</h1>}>
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
                />
                <DetailsUserCreatedAtRow user={user} />
                <DetailsUserUpdatedAtRow user={user} />
                <DetailsUserLastActiveRow user={user} />
                <DetailsUserEmailVerifiedRow user={user} />
                <DetailsUserFilesRow user={user} />
                {isLoading && <LoadingOverlay />}
            </Card>
        )
    }
}

export default Header
