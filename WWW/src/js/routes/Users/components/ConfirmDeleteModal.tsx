import * as React from 'react'
import { Button, Col, Modal, Row } from '../../../components'
interface ConfirmDeleteModalProps {
    visible: boolean
    id: number | boolean
    close?(): Function
    fetch(): Promise<void>
    deleteUser(id: number): Promise<void>
}

export class ConfirmDeleteModal extends React.Component<ConfirmDeleteModalProps, null> {
    render() {
        const { visible, id, close, fetch, deleteUser, addToastNotification } = this.props

        return (
            <Modal.Container visible={visible} color={'danger'}>
                <Modal.Header closeIcon close={() => close()}>
                    Confirm Delete
                </Modal.Header>
                <Modal.Body>
                    <p>Do you really want to delete this element?</p>
                </Modal.Body>
                <Modal.Footer>
                    <Row>
                        <Col xs={6}>
                            <Button color={'secondary'} onClick={() => close()} block>
                                Cancel
                            </Button>
                        </Col>
                        <Col xs={6}>
                            <Button
                                color={'success'}
                                onClick={() => {
                                    deleteUser(id).then(() => {
                                        fetch().then(() => {
                                            close()
                                            addToastNotification({
                                                title: 'Delete success.',
                                                text: 'User has been removed.',
                                                type: 'success',
                                            })
                                        })
                                    })
                                }}
                                block
                            >
                                OK
                            </Button>
                        </Col>
                    </Row>
                </Modal.Footer>
            </Modal.Container>
        )
    }
}

export default ConfirmDeleteModal
