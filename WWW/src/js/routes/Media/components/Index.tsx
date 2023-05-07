import * as React from 'react'
import { PageContent } from '../../../layouts/PageLayout/components'
import { RouteManager } from '../../../containers/RouteManager'
import { Card, Col, LoadingOverlay, Row } from '../../../components'
import { MediaManager } from '../containers/MediaManager'
import File from './File'
import { UploadFileFormContainer } from './UploadFileFormContainer'
import { ListManager } from '../../../components/common/List/ListManager'
import { Pagination } from '../../../components/common/List/Pagination'
import FilesFilters from './FilesFilters'
import { NotificationsManager } from '../../../containers/NotificationsManager'
import { TitleManager } from '../../../containers/TitleManager'
import Header from './Header'
import { FiltersManager } from '../../../containers/FiltersManager'
import { getDefaultFilters } from '../../../helpers/media'

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
            <NotificationsManager>
                {({ addToastNotification }) => (
                    <RouteManager>
                        {({ query: { user = '' } }) => {
                            return (
                                <TitleManager>
                                    {({ setTitleSegments }) => {
                                        setTitleSegments(['Media'])

                                        return (
                                            <PageContent>
                                                <Header
                                                    openAddModal={() => {
                                                        this.setState({ addVisible: true })
                                                    }}
                                                />
                                                <MediaManager>
                                                    {({ deleteFile, uploadFiles, uploadProgress, editFile, isLoading, setIsLoading }) => {
                                                        return (
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
                                                                <FiltersManager defaultFilters={getDefaultFilters()} name={'media-filters'}>
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
                                                                        filtersData,
                                                                    }) => (
                                                                        <ListManager
                                                                            url={'/files/list'}
                                                                            defaultFilters={defaultFilters}
                                                                            urlFilters={{ user }}
                                                                            filters={filters}
                                                                            setIsLoading={setIsLoading}
                                                                        >
                                                                            {({
                                                                                data,
                                                                                fetch,
                                                                                links,
                                                                                page,
                                                                                setPage,
                                                                                hasNextPage,
                                                                                hasPrevPage,
                                                                                totalPages,
                                                                                perPage,
                                                                                total,
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
                                                                                                {(page - 1) * perPage + 1} -{' '}
                                                                                                {Math.min(perPage * page, total)} / {total}
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
                                                        )
                                                    }}
                                                </MediaManager>
                                            </PageContent>
                                        )
                                    }}
                                </TitleManager>
                            )
                        }}
                    </RouteManager>
                )}
            </NotificationsManager>
        )
    }
}

export default Index
