import * as React from 'react'
import { ModalContainer, ModalHeader, ModalBody } from '../../ui/Modal'
import { SaveFiltersFormContainer } from './SaveFiltersFormContainer'

interface SaveFiltersModalProps {}

class SaveFiltersModal extends React.Component<SaveFiltersModalProps, null> {
    render() {
        const { closeModal, name, filters } = this.props

        return (
            <ModalContainer visible={true} color={'primary'}>
                <ModalHeader closeIcon close={() => closeModal('save-filters')}>
                    Save filters
                </ModalHeader>
                <ModalBody>
                    <SaveFiltersFormContainer closeModal={closeModal} name={name} filters={filters} />
                </ModalBody>
            </ModalContainer>
        )
    }
}

export default { SaveFiltersModal }
export { SaveFiltersModal }
