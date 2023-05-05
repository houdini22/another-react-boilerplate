import * as React from 'react'
import { PageContent } from '../../../layouts/PageLayout/components'
import Manager from './Manager'
import { RouteManager } from '../../../containers/RouteManager'
import Header from './Pages/Header'
import { Button, Card, LoadingOverlay, Modal } from '../../../components'
import classNames from 'classnames/bind'
import styles from '../../../../assets/scss/routes/cms.scss'
import { FiltersFormContainer } from '../containers/FiltersFormContainer'

import List from './Pages/List'
import { ModalManager } from '../../../components/ui/Modal'
import { AuthorizationManager } from '../../../containers/AuthorizationManager'

const cx = classNames.bind(styles)

export class CmsPagesView extends React.Component<null, null> {
    render() {
        return (
            <RouteManager>
                {({ navigate, query: { parent_id } }) => (
                    <AuthorizationManager>
                        {({ canByPermission }) => (
                            <ModalManager>
                                {({ registerModal, openModal, closeModal }) => (
                                    <Manager currentId={parent_id}>
                                        {({
                                            nodes,
                                            currentNode,
                                            isLoading,
                                            publish,
                                            unpublish,
                                            deleteNode,
                                            currentNodeParents,
                                            setIsLoading,
                                        }) => {
                                            return (
                                                <PageContent>
                                                    <div className={cx('route--cms')}>
                                                        <Header
                                                            currentNodeParents={currentNodeParents}
                                                            currentNode={currentNode}
                                                        />

                                                        <Card header={<h1>Filters</h1>} withMinimizeIcon>
                                                            <FiltersFormContainer />
                                                            {isLoading && <LoadingOverlay />}
                                                        </Card>

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
                                                            />
                                                        )}
                                                    </div>
                                                </PageContent>
                                            )
                                        }}
                                    </Manager>
                                )}
                            </ModalManager>
                        )}
                    </AuthorizationManager>
                )}
            </RouteManager>
        )
    }
}

export default CmsPagesView
