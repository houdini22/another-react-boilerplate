import * as React from 'react'
import { Modal } from '../../../components'
import classNames from 'classnames/bind'
import styles from '../../../../assets/scss/layout/_layout.scss'

const cx = classNames.bind(styles)

interface ConnectionFetchErrorModalProps {
    visible: boolean
    message: string | null
    close: Function
    data: {
        message: string
        file: string
        line: number
    }
}

class ConnectionFetchErrorModal extends React.Component<ConnectionFetchErrorModalProps, null> {
    render() {
        const { visible, message, close, data: { message: dataMessage, file, line } = {} } = this.props
        return (
            <Modal.Container visible={visible} color={'danger'}>
                <Modal.Header closeIcon close={close}>
                    500 Internal Server Error
                </Modal.Header>
                <Modal.Body>
                    <div>
                        <p>{message}</p>
                        <p>{dataMessage}</p>
                        <p>File: {file}</p>
                        <p>Line: {line}</p>
                    </div>
                </Modal.Body>
            </Modal.Container>
        )
    }
}

export { ConnectionFetchErrorModal }
