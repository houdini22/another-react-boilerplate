import * as React from 'react'
import { Button, LoadingOverlay } from '../../../components'
import { Card } from '../../ui/Card'
import { ifDeepDiff } from '../../../utils/javascript'
import { FiltersFactory } from '../List/FiltersFactory'
import { ModalManager } from '../../ui/Modal'
import { SaveFiltersModal } from './SaveFiltersModal'
import { DropdownContainer, DropdownItem, DropdownMenu, DropdownTrigger } from '../../ui/Dropdown'
import { LocalStorage } from '../../../modules/database'
import { DeleteIcon } from '../../icons'

interface FilterProps {}

class FiltersCard extends React.Component<FilterProps, null> {
    state = {
        savedFilters: [],
    }
    componentDidMount() {
        const savedFilters = this.getSavedFilters()

        this.setState({ savedFilters })
    }

    getSavedFilters() {
        const { name } = this.props
        return LocalStorage.queryAll('ListManagerFilters', { query: { name: name } })
    }

    render() {
        const {
            name,
            resetFilters,
            defaultFilters = {},
            filters = {},
            restoreFilters,
            setFilter,
            fetch,
            filtersToRender,
            isLoading,
            setFilters,
        } = this.props

        const { savedFilters } = this.state

        return (
            <ModalManager>
                {({ registerModal, openModal, closeModal }) => {
                    registerModal(
                        'save-filters',
                        <SaveFiltersModal
                            closeModal={() => {
                                closeModal('save-filters')
                                this.setState({ savedFilters: this.getSavedFilters() })
                            }}
                            name={name}
                            filters={filters}
                        />,
                    )

                    return (
                        <Card
                            name={name}
                            header={<h1>Filters</h1>}
                            withMinimizeIcon
                            headerActions={[
                                <Button
                                    key={'reset-filters'}
                                    color={'secondary'}
                                    onClick={() => resetFilters()}
                                    disabled={!ifDeepDiff(defaultFilters, filters)}
                                >
                                    Reset Filters
                                </Button>,
                                <DropdownContainer key={'restore-filters'}>
                                    <DropdownTrigger component={Button}>Restore Filters</DropdownTrigger>
                                    <DropdownMenu>
                                        {savedFilters.map(({ list_name, filters }) => (
                                            <DropdownItem
                                                key={list_name}
                                                onClick={() => {
                                                    setFilters(filters).then(() => {
                                                        fetch()
                                                    })
                                                }}
                                            >
                                                <span>{list_name}</span>
                                                <Button
                                                    color={'danger'}
                                                    iconOnly
                                                    icon={<DeleteIcon />}
                                                    style={{ marginLeft: 'auto' }}
                                                    onClick={(e) => {
                                                        e.stopPropagation()
                                                        LocalStorage.deleteRows('ListManagerFilters', (row) => {
                                                            if (row.name === name && row.list_name === list_name) {
                                                                return true
                                                            }
                                                            return false
                                                        })
                                                        LocalStorage.commit()

                                                        this.setState({ savedFilters: this.getSavedFilters() })
                                                    }}
                                                />
                                            </DropdownItem>
                                        ))}
                                    </DropdownMenu>
                                </DropdownContainer>,
                                <Button
                                    key={'save-filters'}
                                    color={'warning'}
                                    onClick={() => openModal('save-filters')}
                                    disabled={!ifDeepDiff(defaultFilters, filters)}
                                >
                                    Save Filters
                                </Button>,
                            ]}
                        >
                            <FiltersFactory
                                filters={filters}
                                setFilter={setFilter}
                                defaultFilters={defaultFilters}
                                fetch={fetch}
                                body={filtersToRender}
                            />
                            {isLoading && <LoadingOverlay />}
                        </Card>
                    )
                }}
            </ModalManager>
        )
    }
}

export default { FiltersCard }
export { FiltersCard }
