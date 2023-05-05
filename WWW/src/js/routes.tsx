import * as React from 'react'
import { Routes, HashRouter as Router, Route } from 'react-router-dom'
import { PageLayout } from './layouts'
import { BlankPageLayout } from './layouts'

import { IndexView } from './routes/Index'
import { IndexView as LoginView } from './routes/Login'
import { CmsPagesView } from './routes/Cms'

import { UserIsAuthenticatedRoute } from './modules/auth'
import AddCategoryView from './routes/Cms/components/AddCategory'
import AddDocumentView from './routes/Cms/components/AddDocument'
import AddLinkView from './routes/Cms/components/AddLink'
import { UsersView } from './routes/Users'
import { UserRolesView } from './routes/UserRoles'
import { UsersAccountActivated } from './routes/UsersAccountActivated'
import { MediaView } from './routes/Media'
import { UsersEditView } from './routes/UsersEdit'
import UsersAddView from './routes/UsersAdd/components/Index'
import { UserRolesEdit } from './routes/UserRolesEdit'
import { UsersPermissions } from './routes/UsersPermissions'
import { UsersPermissionsEdit } from './routes/UsersPermissionsEdit'
import { UsersPermissionsAdd } from './routes/UsersPermissionsAdd'
import { UserRolesAdd } from './routes/UserRolesAdd'
import { WebsocketsManager } from './containers/WebsocketsManager'
import { EditCategoryView } from './routes/Cms/components/EditCategory'
import EditDocumentView from './routes/Cms/components/EditDocument'
import EditLinkView from './routes/Cms/components/EditLink'

const App = () => (
    <Router>
        <WebsocketsManager>
            {() => (
                <Routes>
                    <Route
                        path="/cms/pages"
                        element={
                            <PageLayout>
                                <UserIsAuthenticatedRoute>
                                    <CmsPagesView />
                                </UserIsAuthenticatedRoute>
                            </PageLayout>
                        }
                    />
                    <Route
                        path="/cms/pages/add_category"
                        element={
                            <PageLayout>
                                <UserIsAuthenticatedRoute>
                                    <AddCategoryView />
                                </UserIsAuthenticatedRoute>
                            </PageLayout>
                        }
                    />
                    <Route
                        path="/cms/pages/edit_category"
                        element={
                            <PageLayout>
                                <UserIsAuthenticatedRoute>
                                    <EditCategoryView />
                                </UserIsAuthenticatedRoute>
                            </PageLayout>
                        }
                    />
                    <Route
                        path="/cms/pages/add_link"
                        element={
                            <PageLayout>
                                <UserIsAuthenticatedRoute>
                                    <AddLinkView />
                                </UserIsAuthenticatedRoute>
                            </PageLayout>
                        }
                    />
                    <Route
                        path="/cms/pages/edit_link"
                        element={
                            <PageLayout>
                                <UserIsAuthenticatedRoute>
                                    <EditLinkView />
                                </UserIsAuthenticatedRoute>
                            </PageLayout>
                        }
                    />
                    <Route
                        path="/cms/pages/add_document"
                        element={
                            <PageLayout>
                                <UserIsAuthenticatedRoute>
                                    <AddDocumentView />
                                </UserIsAuthenticatedRoute>
                            </PageLayout>
                        }
                    />
                    <Route
                        path="/cms/pages/edit_document"
                        element={
                            <PageLayout>
                                <UserIsAuthenticatedRoute>
                                    <EditDocumentView />
                                </UserIsAuthenticatedRoute>
                            </PageLayout>
                        }
                    />
                    <Route
                        path="/users"
                        element={
                            <PageLayout>
                                <UserIsAuthenticatedRoute>
                                    <UsersView />
                                </UserIsAuthenticatedRoute>
                            </PageLayout>
                        }
                    />
                    <Route
                        path="/users/edit"
                        element={
                            <PageLayout>
                                <UserIsAuthenticatedRoute>
                                    <UsersEditView />
                                </UserIsAuthenticatedRoute>
                            </PageLayout>
                        }
                    />
                    <Route
                        path="/users/add"
                        element={
                            <PageLayout>
                                <UserIsAuthenticatedRoute>
                                    <UsersAddView />
                                </UserIsAuthenticatedRoute>
                            </PageLayout>
                        }
                    />
                    <Route
                        path="/users/account_activated"
                        element={
                            <BlankPageLayout>
                                <UsersAccountActivated />
                            </BlankPageLayout>
                        }
                    />
                    <Route
                        path="/login"
                        element={
                            <BlankPageLayout>
                                <LoginView />
                            </BlankPageLayout>
                        }
                    />
                    <Route
                        path="/roles"
                        element={
                            <PageLayout>
                                <UserIsAuthenticatedRoute>
                                    <UserRolesView />
                                </UserIsAuthenticatedRoute>
                            </PageLayout>
                        }
                    />
                    <Route
                        path="/roles/add"
                        element={
                            <PageLayout>
                                <UserIsAuthenticatedRoute>
                                    <UserRolesAdd />
                                </UserIsAuthenticatedRoute>
                            </PageLayout>
                        }
                    />
                    <Route
                        path="/roles/edit"
                        element={
                            <PageLayout>
                                <UserIsAuthenticatedRoute>
                                    <UserRolesEdit />
                                </UserIsAuthenticatedRoute>
                            </PageLayout>
                        }
                    />
                    <Route
                        path="/permissions"
                        element={
                            <PageLayout>
                                <UserIsAuthenticatedRoute>
                                    <UsersPermissions />
                                </UserIsAuthenticatedRoute>
                            </PageLayout>
                        }
                    />
                    <Route
                        path="/permissions/add"
                        element={
                            <PageLayout>
                                <UserIsAuthenticatedRoute>
                                    <UsersPermissionsAdd />
                                </UserIsAuthenticatedRoute>
                            </PageLayout>
                        }
                    />
                    <Route
                        path="/permissions/edit"
                        element={
                            <PageLayout>
                                <UserIsAuthenticatedRoute>
                                    <UsersPermissionsEdit />
                                </UserIsAuthenticatedRoute>
                            </PageLayout>
                        }
                    />
                    <Route
                        path="/media"
                        element={
                            <PageLayout>
                                <UserIsAuthenticatedRoute>
                                    <MediaView />
                                </UserIsAuthenticatedRoute>
                            </PageLayout>
                        }
                    />
                    <Route
                        path="/"
                        element={
                            <PageLayout>
                                <UserIsAuthenticatedRoute>
                                    <IndexView />
                                </UserIsAuthenticatedRoute>
                            </PageLayout>
                        }
                    />
                </Routes>
            )}
        </WebsocketsManager>
    </Router>
)

export { App }
export default App
