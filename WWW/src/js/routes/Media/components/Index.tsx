import * as React from 'react'
import { PageContent } from '../../../layouts/PageLayout/components'
import { RouteManager } from '../../../containers/RouteManager'
import { Button, Card, Col, LoadingOverlay, PageHeader, Row } from '../../../components'
import { MediaManager } from '../containers/MediaManager'
import File from './File'
import { UploadFileFormContainer } from './UploadFileFormContainer'

export class UsersView extends React.Component {
    state = {
        addVisible: false,
    }

    render() {
        const { addVisible } = this.state

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
                        <MediaManager>
                            {({ files, deleteFile, fetch, uploadFiles, uploadProgress, isLoading, editFile }) => {
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

                                        <Card header={<h1>Files</h1>}>
                                            {isLoading && <LoadingOverlay />}
                                            <Row>
                                                {files?.map((file) => (
                                                    <Col xs={6} sm={4} md={2} key={file.id}>
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
                                        </Card>
                                    </>
                                )
                            }}
                        </MediaManager>
                    </PageContent>
                )}
            </RouteManager>
        )
    }
}

export default UsersView
