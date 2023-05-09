import * as React from 'react'
import { ModalContainer, ModalHeader, ModalBody } from '../../ui/Modal'
import { SaveFiltersFormContainer } from './SaveFiltersFormContainer'

interface SaveFiltersModalProps {}

class SaveFiltersModal extends React.Component<SaveFiltersModalProps, null> {
    render() {
        const { close, filters, saveFilters } = this.props

        return (
            <ModalContainer visible={true} color={'primary'}>
                <ModalHeader closeIcon close={close}>
                    Save filters
                </ModalHeader>
                <ModalBody>
                    <SaveFiltersFormContainer close={close} filters={filters} saveFilters={saveFilters} />
                </ModalBody>
            </ModalContainer>
        )
    }
}

export { SaveFiltersModal }
