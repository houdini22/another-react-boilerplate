import * as React from 'react'
import { Modal } from '../../../components'
import classNames from 'classnames/bind'
import styles from '../../../../assets/scss/layout/_layout.scss'

const cx = classNames.bind(styles)

interface ConnectionErrorModalProps {
    visible: boolean
    message: string | null
    close: Function
}

class ConnectionErrorModal extends React.Component<ConnectionErrorModalProps, null> {
    render() {
        const { visible, message, close } = this.props
        return (
            <Modal.Container visible={visible} color={'danger'}>
                <Modal.Header closeIcon close={close}>
                    Connection Error
                </Modal.Header>
                <Modal.Body>
                    <div>
                        <p>{message}</p>
                    </div>
                </Modal.Body>
            </Modal.Container>
        )
    }
}

export { ConnectionErrorModal }
export default { ConnectionErrorModal }
