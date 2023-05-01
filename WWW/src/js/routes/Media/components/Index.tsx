import * as React from 'react'
import { PageContent } from '../../../layouts/PageLayout/components'
import { RouteManager } from '../../../containers/RouteManager'
import { Button, Card, Col, LoadingOverlay, PageHeader, Row } from '../../../components'
import { MediaManager } from '../containers/MediaManager'
import File from './File'
import { UploadFileFormContainer } from './UploadFileFormContainer'
import { ListManager } from '../../../components/common/List/ListManager'
import { Pagination } from '../../../components/common/List/Pagination'
import FilesFilters from './FilesFilters'
import { getReadableFileSizeString } from '../../../utils/javascript'

export class UsersView extends React.Component {
    state = {
        addVisible: false,
    }

    render() {
        const { addVisible } = this.state

        const defaultFilters = {
            user: '',
            items_per_page: 24,
            order_by: 'id',
            order_direction: 'asc',
            search: '',
        }

        return (
            <RouteManager>
                {({ navigate }) => (
                    <PageContent>
                        <PageHeader.Container>
                            <PageHeader.Title>Media</PageHeader.Title>
                            <PageHeader.Actions>
                                <Button
                                    color={'success'}
                                    onClick={() => {
                                        this.setState({
                                            addVisible: !addVisible,
                                        })
                                    }}
                                >
                                    Add
                                </Button>
                            </PageHeader.Actions>
                        </PageHeader.Container>
                        <ListManager url={'/files/list'} defaultFilters={defaultFilters}>
                            {({
                                data,
                                isLoading,
                                fetch,
                                links,
                                page,
                                setPage,
                                hasNextPage,
                                hasPrevPage,
                                totalPages,
                                filters,
                                setFilter,
                                perPage,
                                total,
                                resetFilters,
                            }) => (
                                <MediaManager>
                                    {({ deleteFile, uploadFiles, uploadProgress, editFile }) => {
                                        let totalSize = 0
                                        data.forEach(({ size }) => {
                                            totalSize += size
                                        })

                                        return (
                                            <>
                                                {addVisible && (
                                                    <Card header={<h1>Add files</h1>}>
                                                        <UploadFileFormContainer
                                                            uploadFiles={uploadFiles}
                                                            uploadProgress={uploadProgress}
                                                            fetch={fetch}
                                                        />
                                                    </Card>
                                                )}

                                                <FilesFilters
                                                    filters={filters}
                                                    setFilter={setFilter}
                                                    fetch={fetch}
                                                    resetFilters={resetFilters}
                                                    defaultFilters={defaultFilters}
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
                                                        <br />
                                                        Total size: <b>{getReadableFileSizeString(totalSize)}</b>
                                                    </div>
                                                    {isLoading && <LoadingOverlay />}
                                                </Card>
                                            </>
                                        )
                                    }}
                                </MediaManager>
                            )}
                        </ListManager>
                    </PageContent>
                )}
            </RouteManager>
        )
    }
}

export default UsersView
