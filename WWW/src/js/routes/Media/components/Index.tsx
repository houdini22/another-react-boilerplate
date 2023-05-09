import * as React from 'react'
import { PageContent } from '../../../layouts/PageLayout/components'
import { RouteManager, NotificationsManager, TitleManager, FiltersManager } from '../../../containers'
import { Card, Col, LoadingOverlay, Row } from '../../../components'
import { MediaManager } from '../containers/MediaManager'
import File from './File'
import { UploadFileFormContainer } from './UploadFileFormContainer'
import { ListManager } from '../../../components/common/List/ListManager'
import { Pagination } from '../../../components/common/List/Pagination'
import FilesFilters from './FilesFilters'
import Header from './Header'
import { getDefaultFilters } from '../../../helpers/media'
import { createUrlFilters } from '../../../helpers/filters'

interface UsersViewState {
    addVisible: boolean
}

export class Index extends React.Component<null, UsersViewState> {
    state = {
        addVisible: false,
    }

    render() {
        const { addVisible } = this.state

        return (
            <TitleManager>
                {({ setTitleSegments }) => {
                    setTitleSegments(['Media'])

                    return (
                        <NotificationsManager>
                            {({ addToastNotification }) => (
                                <RouteManager>
                                    {({ query: { user = '' } }) => (
                                        <PageContent>
                                            <Header
                                                openAddModal={() => {
                                                    this.setState({ addVisible: true })
                                                }}
                                            />
                                            <MediaManager>
                                                {({ deleteFile, uploadFiles, uploadProgress, editFile, isLoading, setIsLoading }) => (
                                                    <>
                                                        {addVisible && (
                                                            <Card header={<h1>Add files</h1>}>
                                                                <UploadFileFormContainer
                                                                    uploadFiles={uploadFiles}
                                                                    uploadProgress={uploadProgress}
                                                                    fetch={fetch}
                                                                    addToastNotification={addToastNotification}
                                                                />
                                                            </Card>
                                                        )}
                                                        <FiltersManager
                                                            defaultFilters={getDefaultFilters()}
                                                            name={'media-filters'}
                                                            urlFilters={createUrlFilters({ user })}
                                                        >
                                                            {({
                                                                defaultFilters,
                                                                filters,
                                                                setFilters,
                                                                resetFilters,
                                                                setFilter,
                                                                savedFilters,
                                                                deleteSavedFilter,
                                                                restoreSavedFilter,
                                                                saveFilters,
                                                            }) => (
                                                                <ListManager
                                                                    url={'/files/list'}
                                                                    defaultFilters={defaultFilters}
                                                                    urlFilters={createUrlFilters({ user })}
                                                                    filters={filters}
                                                                    setIsLoading={setIsLoading}
                                                                >
                                                                    {({
                                                                        data: {
                                                                            files: {
                                                                                data,
                                                                                links,
                                                                                hasNextPage,
                                                                                hasPrevPage,
                                                                                totalPages,
                                                                                per_page: perPage,
                                                                                total,
                                                                            } = {},
                                                                        } = {},
                                                                        filtersData,
                                                                        setPage,
                                                                        fetch,
                                                                        page,
                                                                    }) => (
                                                                        <>
                                                                            <FilesFilters
                                                                                filters={filters}
                                                                                setFilter={setFilter}
                                                                                fetch={fetch}
                                                                                resetFilters={resetFilters}
                                                                                defaultFilters={defaultFilters}
                                                                                setFilters={setFilters}
                                                                                isLoading={isLoading}
                                                                                savedFilters={savedFilters}
                                                                                deleteSavedFilter={deleteSavedFilter}
                                                                                restoreSavedFilter={restoreSavedFilter}
                                                                                saveFilters={saveFilters}
                                                                                filtersData={filtersData}
                                                                            />

                                                                            <Card>
                                                                                <Pagination
                                                                                    links={links}
                                                                                    page={page}
                                                                                    fetch={fetch}
                                                                                    setPage={setPage}
                                                                                    hasNextPage={hasNextPage}
                                                                                    hasPrevPage={hasPrevPage}
                                                                                    totalPages={totalPages}
                                                                                />
                                                                                <Row>
                                                                                    {data?.map((file) => (
                                                                                        <Col xs={2} sm={2} md={2} key={file.id}>
                                                                                            <File
                                                                                                file={file}
                                                                                                deleteFile={deleteFile}
                                                                                                fetch={fetch}
                                                                                                editFile={editFile}
                                                                                                isLoading={isLoading}
                                                                                                addToastNotification={addToastNotification}
                                                                                            />
                                                                                        </Col>
                                                                                    ))}
                                                                                </Row>
                                                                                <Pagination
                                                                                    links={links}
                                                                                    page={page}
                                                                                    fetch={fetch}
                                                                                    setPage={setPage}
                                                                                    hasNextPage={hasNextPage}
                                                                                    hasPrevPage={hasPrevPage}
                                                                                    totalPages={totalPages}
                                                                                />
                                                                                <div style={{ textAlign: 'right' }}>
                                                                                    Records:{' '}
                                                                                    <b>
                                                                                        {(page - 1) * perPage + 1} - {Math.min(perPage * page, total)}{' '}
                                                                                        / {total}
                                                                                    </b>
                                                                                    <br />
                                                                                    Total pages: <b>{totalPages}</b>
                                                                                </div>
                                                                                {isLoading && <LoadingOverlay />}
                                                                            </Card>
                                                                        </>
                                                                    )}
                                                                </ListManager>
                                                            )}
                                                        </FiltersManager>
                                                    </>
                                                )}
                                            </MediaManager>
                                        </PageContent>
                                    )}
                                </RouteManager>
                            )}
                        </NotificationsManager>
                    )
                }}
            </TitleManager>
        )
    }
}

export default Index
