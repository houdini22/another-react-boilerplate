import * as React from 'react'
import { Button, Col, Modal, Row } from '../../../components'
interface ModalConfirmProps {
    onConfirm: Function
    onCancel: Function
    children: any
}

export class ModalConfirm extends React.Component<ModalConfirmProps, null> {
    render() {
        const { onConfirm = () => null, onCancel = () => null, children } = this.props

        return (
            <Modal.Container visible={true} color={'danger'}>
                <Modal.Header closeIcon close={() => onCancel()}>
                    Confirmation
                </Modal.Header>
                <Modal.Body>{children}</Modal.Body>
                <Modal.Footer>
                    <Row>
                        <Col xs={6}>
                            <Button color={'secondary'} onClick={() => onCancel()} block>
                                Cancel
                            </Button>
                        </Col>
                        <Col xs={6}>
                            <Button color={'success'} onClick={() => onConfirm()} block>
                                OK
                            </Button>
                        </Col>
                    </Row>
                </Modal.Footer>
            </Modal.Container>
        )
    }
}

export default ModalConfirm
