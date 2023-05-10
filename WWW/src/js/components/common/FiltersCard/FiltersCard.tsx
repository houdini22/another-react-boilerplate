import * as React from 'react'
import { Button } from '../../../components'
import { Card } from '../../ui/Card'
import { ifDeepDiff } from '../../../utils/javascript'
import { FiltersFactory } from '../List/FiltersFactory'
import { ModalManager } from '../../ui/Modal'
import { SaveFiltersModal } from './SaveFiltersModal'
import { DropdownContainer, DropdownItem, DropdownMenu, DropdownTrigger } from '../../ui/Dropdown'
import { DeleteIcon, FiltersIcon, ResetIcon, RestoreIcon, SaveIcon } from '../../icons'
import { ResetFilters, Filters, SetFilter, DeleteSavedFilter, SaveFilters, RestoreSavedFilter, SavedFilters } from '../../../../types.d'

interface FiltersCardProps {
    name: string
    resetFilters: ResetFilters
    defaultFilters: Filters
    filters: Filters
    setFilter: SetFilter
    filtersToRender: Array<any>
    savedFilters: SavedFilters
    deleteSavedFilter: DeleteSavedFilter
    saveFilters: SaveFilters
    restoreSavedFilter: RestoreSavedFilter
    children: any
    filtersData: Object
}

class FiltersCard extends React.Component<FiltersCardProps, null> {
    render() {
        const {
            name,
            resetFilters,
            defaultFilters,
            filters,
            setFilter,
            filtersToRender,
            savedFilters,
            deleteSavedFilter,
            saveFilters,
            restoreSavedFilter,
            children,
            filtersData,
        } = this.props

        return (
            <ModalManager>
                {({ registerModal, openModal, closeModal }) => {
                    registerModal(
                        'save-filters',
                        <SaveFiltersModal
                            close={() => {
                                closeModal('save-filters')
                            }}
                            filters={filters}
                            saveFilters={saveFilters}
                        />,
                    )

                    return (
                        <Card
                            name={name}
                            header={
                                <h1>
                                    <FiltersIcon /> Filters
                                </h1>
                            }
                            withMinimizeIcon
                            headerActions={[
                                <Button
                                    key={'reset-filters'}
                                    color={'warning'}
                                    icon={<ResetIcon />}
                                    iconOnly
                                    onClick={() => resetFilters()}
                                    disabled={!ifDeepDiff(defaultFilters, filters)}
                                />,
                                <DropdownContainer key={'restore-filters'} placement={'right'}>
                                    <DropdownTrigger
                                        component={Button}
                                        componentProps={{
                                            icon: <RestoreIcon />,
                                            iconOnly: true,
                                        }}
                                    />
                                    <DropdownMenu>
                                        {savedFilters.map(({ list_name }) => (
                                            <DropdownItem
                                                key={list_name}
                                                onClick={() => {
                                                    restoreSavedFilter(list_name)
                                                }}
                                            >
                                                <span>{list_name}</span>
                                                <Button
                                                    size={'xs'}
                                                    color={'danger'}
                                                    iconOnly
                                                    icon={<DeleteIcon />}
                                                    style={{ marginLeft: 'auto' }}
                                                    onClick={(e) => {
                                                        e.stopPropagation()
                                                        deleteSavedFilter(list_name)
                                                    }}
                                                />
                                            </DropdownItem>
                                        ))}
                                    </DropdownMenu>
                                </DropdownContainer>,
                                <Button
                                    icon={<SaveIcon />}
                                    key={'save-filters'}
                                    color={'success'}
                                    onClick={() => openModal('save-filters')}
                                    disabled={!ifDeepDiff(defaultFilters, filters)}
                                    iconOnly
                                />,
                            ]}
                        >
                            <FiltersFactory
                                filtersData={filtersData}
                                filters={filters}
                                setFilter={setFilter}
                                defaultFilters={defaultFilters}
                                body={filtersToRender}
                            />
                            {children}
                        </Card>
                    )
                }}
            </ModalManager>
        )
    }
}

export { FiltersCard }
