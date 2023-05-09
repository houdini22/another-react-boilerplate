import * as React from 'react'
import { Button, Col, Modal, Row } from '../../../components'
interface ModalInfoProps {
    children: any
    close: () => void
}

export class ModalInfo extends React.Component<ModalInfoProps, null> {
    render() {
        const { close, children, visible } = this.props

        return (
            <Modal.Container visible={visible} color={'info'}>
                <Modal.Header closeIcon close={() => close()}>
                    Information
                </Modal.Header>
                <Modal.Body>{children}</Modal.Body>
                <Modal.Footer>
                    <Row>
                        <Col xs={12}>
                            <Button color={'success'} onClick={() => close()} block>
                                <span>OK</span>
                            </Button>
                        </Col>
                    </Row>
                </Modal.Footer>
            </Modal.Container>
        )
    }
}

export default ModalInfo
