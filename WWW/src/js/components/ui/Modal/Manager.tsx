import * as React from 'react'
interface ModalManagerProps {
    children: any
}

class ModalManager extends React.Component<ModalManagerProps, null> {
    state = {
        openedModal: '',
    }
    modals = {}
    registerModal(name, modal) {
        this.modals[name] = modal
    }
    renderModals() {
        const { openedModal } = this.state

        if (this.modals[openedModal]) {
            return this.modals[openedModal]
        }

        return null
    }
    openModal(name) {
        if (!this.modals[name]) {
            console.error(`Modal ${name} not registered.`)
        }
        this.setState({ openedModal: name })
    }
    closeModal(name) {
        const { openedModal } = this.state

        if (openedModal === name) {
            this.setState({ openedModal: '' })
        }
    }
    render() {
        const { children } = this.props

        const renderProps = {
            registerModal: this.registerModal.bind(this),
            openModal: this.openModal.bind(this),
            closeModal: this.closeModal.bind(this),
        }

        return (
            <>
                {children(renderProps)}
                {this.renderModals()}
            </>
        )
    }
}

export { ModalManager }
export default {
    ModalManager,
}
