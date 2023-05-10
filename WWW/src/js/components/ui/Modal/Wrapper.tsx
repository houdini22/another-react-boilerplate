import * as React from 'react'

interface ModalWrapperProps {}

interface ModalWrapperState {
    modals: [{ name: string; value: any }]
}

export const ModalContext = React.createContext({ openModal: () => null, closeModal: () => null })

class ModalWrapper extends React.Component<ModalWrapperProps, ModalWrapperState> {
    state = {
        modals: [],
    }
    openModal(name: string, value: any) {
        const { modals } = this.state
        this.setState({
            modals: [
                ...modals,
                {
                    name,
                    value,
                },
            ],
        })
    }

    closeModal(name) {
        const { modals } = this.state

        this.setState({
            modals: modals.filter(({ name: n }) => n !== name),
        })
    }

    renderModals() {
        const { modals } = this.state

        return (
            <>
                {modals.map(({ name, value }) => {
                    return <>{value}</>
                })}
            </>
        )
    }

    render() {
        const { children } = this.props

        const renderProps = {
            openModal: this.openModal.bind(this),
            closeModal: this.closeModal.bind(this),
        }

        return (
            <ModalContext.Provider value={{ ...renderProps }}>
                {children}
                {this.renderModals()}
            </ModalContext.Provider>
        )
    }
}

export { ModalWrapper }
export default ModalWrapper
