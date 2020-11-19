import React from 'react'
import { AlertModal } from '../../ui/Modal'

class ConnectionErrorModal extends React.Component {
    render() {
        const { close, id } = this.props

        return (
            <AlertModal
                close={close}
                id={id}
                color="danger"
                animation="sweet"
                title={<span>Connection error!</span>}
                body={<div>Connection error. Reload page and try again.</div>}
            />
        )
    }
}

export { ConnectionErrorModal }
export default { ConnectionErrorModal }
