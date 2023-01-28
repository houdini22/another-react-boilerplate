import * as React from 'react'
import { PageContent } from '../../../layouts/PageLayout/components'
import { RouteManager } from '../../../containers/RouteManager'
import {
    Alert,
    Button,
    Card,
    Dropdown,
    LoadingOverlay,
    Modal,
    PageHeader,
    Table,
} from '../../../components'
import { UsersManager } from '../containers/UsersManager'
import { EditIcon } from '../../../components/icons'
import { EditFormContainer } from './EditFormContainer'
import { SubmissionError } from 'redux-form'
import { processAPIerrorResponseToFormErrors } from '../../../modules/http'

interface EditModalViewProps {
    visible: boolean
    id: number
    close?(): Function
}

export class EditModalView extends React.Component<EditModalViewProps> {
    render() {
        const { visible, id, close } = this.props

        return (
            <RouteManager>
                {({ navigate }) => (
                    <Modal.Container color={'danger'} visible={visible}>
                        <UsersManager id={id}>
                            {({
                                user,
                                isLoading,
                                setIsLoading,
                                editUser,
                                fetch,
                            }) => {
                                return (
                                    <>
                                        {isLoading && <LoadingOverlay />}
                                        <Modal.Header close={close} closeIcon>
                                            <EditIcon /> Edit User
                                        </Modal.Header>
                                        <Modal.Body>
                                            <EditFormContainer
                                                initialValues={user}
                                                setIsLoading={setIsLoading}
                                                onSubmit={(values, props) => {
                                                    return editUser(
                                                        values,
                                                    ).then(
                                                        () => {
                                                            fetch().then(() => {
                                                                close()
                                                            })
                                                        },
                                                        (response) => {
                                                            throw new SubmissionError(
                                                                processAPIerrorResponseToFormErrors(
                                                                    response,
                                                                ),
                                                            )
                                                        },
                                                    )
                                                }}
                                            />
                                        </Modal.Body>
                                        <Modal.Footer></Modal.Footer>
                                    </>
                                )
                            }}
                        </UsersManager>
                    </Modal.Container>
                )}
            </RouteManager>
        )
    }
}

export default EditModalView
