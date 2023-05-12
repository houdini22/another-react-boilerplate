import * as React from 'react'
import { PageContent } from '../../../layouts/PageLayout/components'
import Manager from '../../Cms/components/Manager'
import { RouteManager, AuthorizationManager, FiltersManager } from '../../../containers'
import Header from './Header'
import classNames from 'classnames/bind'
import styles from '../../../../assets/scss/routes/cms.scss'
import List from './Pages/List'
import { FiltersCard } from '../../../components/common/FiltersCard'
import { LoadingOverlay } from '../../../components'
import { MenuIcon, PagesIcon } from '../../../components/icons'

const cx = classNames.bind(styles)

export class CmsMenusView extends React.Component<null, null> {
    render() {
        return (
            <RouteManager>
                {({ query }) => (
                    <AuthorizationManager>
                        {({ canByPermission }) => (
                            <FiltersManager defaultFilters={{}} name={'cms-menus-filters'}>
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
                                    <Manager getMenus filters={filters}>
                                        {({ menus, isLoading, setIsLoading, filtersData, deleteNode, fetchMenus, publish, unpublish }) => {
                                            return (
                                                <PageContent>
                                                    <div className={cx('route--cms')}>
                                                        <Header title={'CMS - Menus'} icon={<MenuIcon />} />

                                                        <FiltersCard
                                                            name={'CmsPages'}
                                                            filters={filters}
                                                            setFilter={setFilter}
                                                            setFilters={setFilters}
                                                            resetFilters={resetFilters}
                                                            fetch={fetchMenus}
                                                            isLoading={isLoading}
                                                            filtersData={filtersData}
                                                            saveFilters={saveFilters}
                                                            restoreSavedFilter={restoreSavedFilter}
                                                            deleteSavedFilter={deleteSavedFilter}
                                                            savedFilters={savedFilters}
                                                            defaultFilters={defaultFilters}
                                                            filtersToRender={[]}
                                                        >
                                                            {isLoading && <LoadingOverlay />}
                                                        </FiltersCard>

                                                        {canByPermission('cms.menus') && (
                                                            <List
                                                                menus={menus}
                                                                isLoading={isLoading}
                                                                setIsLoading={setIsLoading}
                                                                canByPermission={canByPermission}
                                                                deleteNode={deleteNode}
                                                                fetchMenus={fetchMenus}
                                                                publish={publish}
                                                                unpublish={unpublish}
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

export default CmsMenusView
