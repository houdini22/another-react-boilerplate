import * as React from 'react'
import { RouteManager } from '../../../../containers/RouteManager'
import { Button, LoadingOverlay, Modal } from '../../../../components'
import { UserRolesManager } from '../../containers/UserRolesManager'
import { AddIcon } from '../../../../components/icons'
import { EditFormContainer } from '../../../UserRolesEdit/components/Edit/EditFormContainer'

interface EditModalViewProps {
    visible: boolean
    close?(): Function
}

export class AddModalView extends React.Component<EditModalViewProps> {
    render() {
        const { visible, close, fetch } = this.props

        return (
            <RouteManager>
                {({}) => (
                    <Modal.Container color={'primary'} visible={visible}>
                        <UserRolesManager>
                            {({ isLoading, setIsLoading, addRole }) => {
                                return (
                                    <>
                                        <Modal.Header close={close} closeIcon>
                                            <AddIcon /> Add Role
                                        </Modal.Header>
                                        <Modal.Body>
                                            <EditFormContainer
                                                initialValues={{}}
                                                setIsLoading={setIsLoading}
                                                save={addRole}
                                                fetch={fetch}
                                                close={close}
                                            />
                                        </Modal.Body>
                                        {isLoading && <LoadingOverlay />}
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
