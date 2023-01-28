import * as React from 'react'
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
import { AddIcon } from '../../../components/icons'
import { EditFormContainer } from './EditFormContainer'
import { processAPIerrorResponseToFormErrors } from '../../../modules/http'
import { SubmissionError } from 'redux-form'

interface EditModalViewProps {
    visible: boolean
    id: number
    close?(): Function
}

export class AddModalView extends React.Component<EditModalViewProps> {
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
                                addUser,
                                fetch,
                            }) => {
                                return (
                                    <>
                                        {isLoading && <LoadingOverlay />}
                                        <Modal.Header close={close} closeIcon>
                                            <AddIcon /> Add User
                                        </Modal.Header>
                                        <Modal.Body>
                                            <EditFormContainer
                                                initialValues={{}}
                                                setIsLoading={setIsLoading}
                                                onSubmit={(values, props) => {
                                                    return addUser(values).then(
                                                        (data) => {
                                                            fetch().then(() =>
                                                                close(),
                                                            )
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

export default AddModalView
