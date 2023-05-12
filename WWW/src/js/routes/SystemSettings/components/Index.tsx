import * as React from 'react'
import { Col, Row } from '../../../components'
import { PageContent } from '../../../layouts/PageLayout/components'
import { Header } from './Header'
import { TitleManager, RouteManager } from '../../../containers'
import { MediaManager } from '../../Media/containers/MediaManager'
import { EditSettings } from './Edit/Index'

export class SystemSettings extends React.Component<null, null> {
    render() {
        return (
            <TitleManager>
                {({ setTitleSegments }) => {
                    setTitleSegments(['Users', 'System', 'Settings'])

                    return (
                        <RouteManager>
                            {({}) => (
                                <MediaManager>
                                    {({ isLoading, setIsLoading, uploadFiles, setUploadProgress, uploadProgress }) => (
                                        <PageContent>
                                            <Header />
                                            <Row>
                                                <Col xs={12}>
                                                    <EditSettings
                                                        isLoading={isLoading}
                                                        setIsLoading={setIsLoading}
                                                        uploadFiles={uploadFiles}
                                                        setUploadProgress={setUploadProgress}
                                                        uploadProgress={uploadProgress}
                                                    />
                                                </Col>
                                            </Row>
                                        </PageContent>
                                    )}
                                </MediaManager>
                            )}
                        </RouteManager>
                    )
                }}
            </TitleManager>
        )
    }
}

export default SystemSettings
