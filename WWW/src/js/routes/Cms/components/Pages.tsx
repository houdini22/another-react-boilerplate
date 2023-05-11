import * as React from 'react'
import { PageContent } from '../../../layouts/PageLayout/components'
import Manager from './Manager'
import { RouteManager, AuthorizationManager, FiltersManager } from '../../../containers'
import Header from './Header'
import classNames from 'classnames/bind'
import styles from '../../../../assets/scss/routes/cms.scss'
import List from './Pages/List'
import { FiltersCard } from '../../../components/common/FiltersCard'
import { getDefaultFilters } from '../../../helpers/cms'
import { LoadingOverlay } from '../../../components'
import { PagesIcon } from '../../../components/icons'

const cx = classNames.bind(styles)

export class CmsPagesView extends React.Component<null, null> {
    render() {
        return (
            <RouteManager>
                {({ query: { parent_id } }) => (
                    <AuthorizationManager>
                        {({ canByPermission }) => (
                            <FiltersManager defaultFilters={getDefaultFilters()} name={'cms-filters'}>
                                {({
                                    filters,
                                    setFilter,
                                    setFilters,
                                    resetFilters,
                                    saveFilters,
                                    restoreSavedFilter,
                                    deleteSavedFilter,
                                    savedFilters,
                                    defaultFilters,
                                }) => (
                                    <Manager id={parent_id} filters={filters}>
                                        {({
                                            nodes,
                                            currentNode,
                                            isLoading,
                                            publish,
                                            unpublish,
                                            deleteNode,
                                            currentNodeParents,
                                            setIsLoading,
                                            fetch,
                                            setCurrentId,
                                            filtersData,
                                        }) => {
                                            return (
                                                <PageContent>
                                                    <div className={cx('route--cms')}>
                                                        <Header
                                                            currentNodeParents={currentNodeParents}
                                                            currentNode={currentNode}
                                                            title={'CMS - Pages'}
                                                            icon={<PagesIcon />}
                                                        />

                                                        <FiltersCard
                                                            name={'CmsPages'}
                                                            filters={filters}
                                                            setFilter={setFilter}
                                                            setFilters={setFilters}
                                                            resetFilters={resetFilters}
                                                            fetch={fetch}
                                                            isLoading={isLoading}
                                                            filtersData={filtersData}
                                                            saveFilters={saveFilters}
                                                            restoreSavedFilter={restoreSavedFilter}
                                                            deleteSavedFilter={deleteSavedFilter}
                                                            savedFilters={savedFilters}
                                                            defaultFilters={defaultFilters}
                                                            filtersToRender={[
                                                                {
                                                                    type: 'text',
                                                                    name: 'search',
                                                                    label: 'Search',
                                                                    placeholder: 'Search phrase',
                                                                },
                                                                {
                                                                    options: [
                                                                        {
                                                                            label: 'current category',
                                                                            value: 'current',
                                                                        },
                                                                        {
                                                                            label: 'everywhere',
                                                                            value: 'everywhere',
                                                                        },
                                                                        {
                                                                            label: 'descendants of current node',
                                                                            value: 'descendants',
                                                                        },
                                                                    ],
                                                                    type: 'radio',
                                                                    name: 'search_in',
                                                                    label: 'Search in',
                                                                },
                                                                {
                                                                    options: [
                                                                        {
                                                                            label: 'all',
                                                                            value: 'all',
                                                                        },
                                                                        {
                                                                            label: 'Category',
                                                                            value: 'category',
                                                                        },
                                                                        {
                                                                            label: 'Document',
                                                                            value: 'document',
                                                                        },
                                                                        {
                                                                            label: 'Link',
                                                                            value: 'link',
                                                                        },
                                                                    ],
                                                                    type: 'radio',
                                                                    name: 'type',
                                                                    label: 'Type',
                                                                },
                                                                {
                                                                    options: [
                                                                        {
                                                                            label: 'yes or no',
                                                                            value: 'yes_or_no',
                                                                        },
                                                                        {
                                                                            label: 'yes',
                                                                            value: 'yes',
                                                                        },
                                                                        {
                                                                            label: 'no',
                                                                            value: 'no',
                                                                        },
                                                                    ],
                                                                    type: 'radio',
                                                                    name: 'is_published',
                                                                    label: 'Is published',
                                                                },
                                                            ]}
                                                        >
                                                            {isLoading && <LoadingOverlay />}
                                                        </FiltersCard>

                                                        {canByPermission('cms.list') && (
                                                            <List
                                                                nodes={nodes}
                                                                isLoading={isLoading}
                                                                currentNode={currentNode}
                                                                setIsLoading={setIsLoading}
                                                                publish={publish}
                                                                unpublish={unpublish}
                                                                deleteNode={deleteNode}
                                                                canByPermission={canByPermission}
                                                                setCurrentId={setCurrentId}
                                                                fetch={fetch}
                                                                filters={filters}
                                                            />
                                                        )}
                                                    </div>
                                                </PageContent>
                                            )
                                        }}
                                    </Manager>
                                )}
                            </FiltersManager>
                        )}
                    </AuthorizationManager>
                )}
            </RouteManager>
        )
    }
}

export default CmsPagesView
