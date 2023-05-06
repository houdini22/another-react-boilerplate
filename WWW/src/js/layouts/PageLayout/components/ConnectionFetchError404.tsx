import * as React from 'react'
import { Modal } from '../../../components'
import classNames from 'classnames/bind'
import styles from '../../../../assets/scss/layout/_layout.scss'

const cx = classNames.bind(styles)

interface ConnectionFetchErrorModalProps {
    visible: boolean
}

class ConnectionFetchError404 extends React.Component<ConnectionFetchErrorModalProps, null> {
    render() {
        const { visible, data: { data: { message, data } = {}, message: message2 } = {}, close } = this.props
        return (
            <Modal.Container visible={visible && message === 'NOT_FOUND'} color={'danger'}>
                <Modal.Header closeIcon close={close}>
                    {message2}
                </Modal.Header>
                <Modal.Body>
                    <div>
                        Model <b>{data?.model}</b> with ID: <b>{data?.id}</b> not found.
                    </div>
                </Modal.Body>
            </Modal.Container>
        )
    }
}

export { ConnectionFetchError404 }
