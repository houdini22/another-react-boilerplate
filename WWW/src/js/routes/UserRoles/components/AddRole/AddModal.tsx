import * as React from 'react'
import { LoadingOverlay, Modal } from '../../../../components'
import { UserRolesManager } from '../../containers/UserRolesManager'
import { AddIcon } from '../../../../components/icons'
import { EditFormContainer } from '../../../UserRolesEdit/components/Edit/EditFormContainer'

interface EditModalViewProps {
    visible: boolean

    close?(): Function
}

export class AddModalView extends React.Component<EditModalViewProps> {
    render() {
        const { close, fetch, addToastNotification, setIsLoading, addRole, isLoading } = this.props

        return (
            <Modal.Container color={'primary'} visible={true}>
                <Modal.Header close={close} closeIcon>
                    <AddIcon /> Add Role
                </Modal.Header>
                <Modal.Body>
                    <EditFormContainer
                        initialValues={{}}
                        fetch={fetch}
                        close={close}
                        addToastNotification={addToastNotification}
                        setIsLoading={setIsLoading}
                        save={addRole}
                    />
                </Modal.Body>
                {isLoading && <LoadingOverlay />}
            </Modal.Container>
        )
    }
}

export default AddModalView
