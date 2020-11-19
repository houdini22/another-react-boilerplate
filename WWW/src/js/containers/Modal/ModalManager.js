import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { v4 as uuid } from 'uuid'
import {
    selectors as modalSelectors,
    actions as modalActions,
} from '../../reducers/modal'
import { ConfirmModal, Modal, AlertModal } from '../../components/ui/Modal'

class ModalManagerBase extends React.Component {
    constructor(props) {
        super(props)
        this.openModal = this.openModal.bind(this)
        this.closeModal = this.closeModal.bind(this)
    }

    openModal({
        id,
        type,
        title,
        body,
        footer,
        onConfirm,
        onCancel,
        color,
        closeIcon,
        size,
        placement,
        onOK,
        animation,
    }) {
        const { openModal } = this.props

        if (!id) {
            id = uuid()
        }

        let component = null

        if (type === 'confirm') {
            component = (
                <ConfirmModal
                    id={id}
                    title={title}
                    body={body}
                    onCancel={onCancel}
                    onConfirm={onConfirm}
                    color={color}
                    close={() => {
                        this.closeModal(id)
                    }}
                    size={size}
                    placement={placement}
                    animation={animation}
                />
            )
        } else if (type === 'alert') {
            component = (
                <AlertModal
                    id={id}
                    title={title}
                    body={body}
                    onOK={onOK}
                    color={color}
                    close={() => {
                        this.closeModal(id)
                    }}
                    size={size}
                    placement={placement}
                    animation={animation}
                />
            )
        } else {
            component = (
                <Modal
                    id={id}
                    title={title}
                    body={body}
                    footer={footer}
                    color={color}
                    close={() => {
                        this.closeModal(id)
                    }}
                    closeIcon={closeIcon}
                    size={size}
                    placement={placement}
                    animation={animation}
                />
            )
        }

        openModal({
            id,
            component,
        })
    }

    closeModal(id) {
        const { closeModal } = this.props
        closeModal(id)
    }

    render() {
        const { children } = this.props
        const renderProps = {
            openModal: this.openModal,
        }

        return children(renderProps)
    }
}

ModalManagerBase.propTypes = {
    children: PropTypes.func.isRequired,
    modal: PropTypes.object.isRequired,
    openModal: PropTypes.func.isRequired,
    closeModal: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
    modal: modalSelectors.getState(state),
})

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators(
        {
            openModal: modalActions.openModal,
            closeModal: modalActions.closeModal,
        },
        dispatch,
    )
}

const ModalManager = connect(
    mapStateToProps,
    mapDispatchToProps,
)(ModalManagerBase)

export { ModalManager }
export default { ModalManager }
