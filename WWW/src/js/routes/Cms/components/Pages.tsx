import * as React from 'react'
import { PageContent } from '../../../layouts/PageLayout/components'
import Manager from './Manager'
import { RouteManager } from '../../../containers/RouteManager'
import Header from './Header'
import { Button, Card, LoadingOverlay, Modal } from '../../../components'
import classNames from 'classnames/bind'
import styles from '../../../../assets/scss/routes/cms.scss'
import { FiltersFormContainer } from '../containers/FiltersFormContainer'

import List from './Pages/List'
import { ModalManager } from '../../../components/ui/Modal'
import { AuthorizationManager } from '../../../containers/AuthorizationManager'
import { FiltersCard } from '../../../components/common/FiltersCard'

const cx = classNames.bind(styles)

export class CmsPagesView extends React.Component<null, null> {
    render() {
        return (
            <RouteManager>
                {({ navigate, query: { parent_id } }) => (
                    <AuthorizationManager>
                        {({ canByPermission }) => (
                            <ModalManager>
                                {({ registerModal, openModal, closeModal }) => {
                                    const defaultFilters = {
                                        search_in: 'current',
                                        is_published: 'yes_or_no',
                                        search: '',
                                    }

                                    return (
                                        <Manager id={parent_id} defaultFilters={defaultFilters}>
                                            {({
                                                nodes,
                                                currentNode,
                                                isLoading,
                                                publish,
                                                unpublish,
                                                deleteNode,
                                                currentNodeParents,
                                                setIsLoading,
                                                filters,
                                                setFilter,
                                                setFilters,
                                                resetFilters,
                                                fetch,
                                                setCurrentId,
                                            }) => {
                                                return (
                                                    <PageContent>
                                                        <div className={cx('route--cms')}>
                                                            <Header
                                                                currentNodeParents={currentNodeParents}
                                                                currentNode={currentNode}
                                                                title={'CMS - Pages'}
                                                                canByPermission={canByPermission}
                                                            />

                                                            <FiltersCard
                                                                name={'CmsPages'}
                                                                filters={filters}
                                                                setFilter={setFilter}
                                                                setFilters={setFilters}
                                                                resetFilters={resetFilters}
                                                                fetch={fetch}
                                                                defaultFilters={defaultFilters}
                                                                isLoading={isLoading}
                                                                filtersToRender={[
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
                                                                    {
                                                                        type: 'text',
                                                                        name: 'search',
                                                                        label: 'Search',
                                                                    },
                                                                ]}
                                                            />

                                                            {canByPermission('cms.list') && (
                                                                <List
                                                                    nodes={nodes}
                                                                    isLoading={isLoading}
                                                                    currentNode={currentNode}
                                                                    setIsLoading={setIsLoading}
                                                                    publish={publish}
                                                                    unpublish={unpublish}
                                                                    deleteNode={deleteNode}
                                                                    navigate={navigate}
                                                                    registerModal={registerModal}
                                                                    openModal={openModal}
                                                                    closeModal={closeModal}
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
                                    )
                                }}
                            </ModalManager>
                        )}
                    </AuthorizationManager>
                )}
            </RouteManager>
        )
    }
}

export default CmsPagesView
