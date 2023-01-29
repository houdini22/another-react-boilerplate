import * as React from 'react'
import { RouteManager } from '../../../containers/RouteManager'
import { Alert, Button, Card, Dropdown, LoadingOverlay, Modal, PageHeader, Table } from '../../../components'
import { UserRolesManager } from '../containers/UserRolesManager'
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
                        <UserRolesManager id={id}>
                            {({ isLoading, setIsLoading, addRole, fetch }) => {
                                return (
                                    <>
                                        {isLoading && <LoadingOverlay />}
                                        <Modal.Header close={close} closeIcon>
                                            <AddIcon /> Add Role
                                        </Modal.Header>
                                        <Modal.Body>
                                            <EditFormContainer
                                                initialValues={{}}
                                                setIsLoading={setIsLoading}
                                                onSubmit={(values, props) => {
                                                    return addRole(values).then(
                                                        (data) => {
                                                            fetch().then(() => close())
                                                        },
                                                        (response) => {
                                                            throw new SubmissionError(
                                                                processAPIerrorResponseToFormErrors(response),
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
                        </UserRolesManager>
                    </Modal.Container>
                )}
            </RouteManager>
        )
    }
}

export default AddModalView
