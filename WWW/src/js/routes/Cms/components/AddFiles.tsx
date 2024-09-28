import * as React from 'react'
import {PageContent} from '../../../layouts/PageLayout/components'
import Manager from './Manager'
import {RouteManager, AuthorizationManager, NotificationsManager} from '../../../containers'
import {Header} from './Header'
import {LinkIcon} from '../../../components/icons'
import {Card} from "../../../components";
import {UploadTreeFileFormContainer} from "./AddFiles/UploadTreeFileFormContainer";
import {MediaManager} from "../../Media/containers/MediaManager";

export class AddFilesView extends React.Component {
    render() {
        return (
            <NotificationsManager>
                {({addToastNotification}) => (
                    <RouteManager>
                        {({navigate, query: {parent_id}}) => (
                            <AuthorizationManager>
                                {({canByPermission}) => (
                                    <PageContent>
                                        <Manager id={parent_id}>
                                            {({setIsLoading, currentNode, isLoading, currentNodeParents, addLink}) => {
                                                return (
                                                    <div>
                                                        <Header
                                                            currentNodeParents={currentNodeParents}
                                                            currentNode={currentNode}
                                                            title={'CMS - Add Files'}
                                                            actionTitle={'Add Files'}
                                                            action={'add'}
                                                            canByPermission={canByPermission}
                                                            icon={<LinkIcon/>}
                                                        />
                                                        <Card header={<h1>Add files</h1>}>
                                                            <MediaManager>
                                                                {({
                                                                      uploadFiles,
                                                                      uploadProgress,
                                                                      isLoading,
                                                                      setIsLoading
                                                                  }) => (
                                                                    <UploadTreeFileFormContainer
                                                                        uploadFiles={uploadFiles}
                                                                        uploadProgress={uploadProgress}
                                                                        addToastNotification={addToastNotification}
                                                                        setIsLoading={setIsLoading}
                                                                        treeParentId={parent_id}
                                                                    />
                                                                )}
                                                            </MediaManager>
                                                        </Card>
                                                    </div>
                                                )
                                            }}
                                        </Manager>
                                    </PageContent>
                                )}
                            </AuthorizationManager>
                        )}
                    </RouteManager>
                )}
            </NotificationsManager>

        )
    }
}

export default AddFilesView
