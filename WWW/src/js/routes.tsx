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
import AddFilesView from "./routes/Cms/components/AddFiles";
import { UsersView } from './routes/Users'
import { UserRolesView } from './routes/UserRoles'
import { UsersAccountActivated } from './routes/UsersAccountActivated'
import { MediaView } from './routes/Media'
import { UsersEditView } from './routes/UsersEdit'
import UsersAddView from './routes/UsersAdd/components/Index'
import { UserRolesEdit } from './routes/UserRolesEdit'
import { UsersPermissions } from './routes/UsersPermissions'
import { UsersPermissionsEditView } from './routes/UsersPermissionsEdit'
import { UsersPermissionsAddView } from './routes/UsersPermissionsAdd'
import { UserRolesAdd } from './routes/UserRolesAdd'
import { WebsocketsManager } from './containers'
import { EditCategoryView } from './routes/Cms/components/EditCategory'
import EditDocumentView from './routes/Cms/components/EditDocument'
import EditLinkView from './routes/Cms/components/EditLink'
import { LogsView } from './routes/Logs'
import { Container } from './containers/Config'
import { CmsSettingsView } from './routes/CmsSettings'
import { RegisterView } from './routes/Register'
import { SystemSettings } from './routes/SystemSettings'
import { CmsAddMenuView, CmsMenusView, CmsEditMenuView } from './routes/CmsMenus'

const App = () => (
    <Router>
        <WebsocketsManager>
            {() => (
                <Container>
                    <Routes>
                        <Route
                            path="/cms/pages"
                            element={
                                <PageLayout>
                                    <UserIsAuthenticatedRoute permission={'cms.list'}>
                                        <CmsPagesView />
                                    </UserIsAuthenticatedRoute>
                                </PageLayout>
                            }
                        />
                        <Route
                            path="/cms/pages/add_category"
                            element={
                                <PageLayout>
                                    <UserIsAuthenticatedRoute permission={'cms.add_category'}>
                                        <AddCategoryView />
                                    </UserIsAuthenticatedRoute>
                                </PageLayout>
                            }
                        />
                        <Route
                            path="/cms/pages/edit_category"
                            element={
                                <PageLayout>
                                    <UserIsAuthenticatedRoute permission={'cms.edit_category'}>
                                        <EditCategoryView />
                                    </UserIsAuthenticatedRoute>
                                </PageLayout>
                            }
                        />
                        <Route
                            path="/cms/pages/add_link"
                            element={
                                <PageLayout>
                                    <UserIsAuthenticatedRoute permission={'cms.add_link'}>
                                        <AddLinkView />
                                    </UserIsAuthenticatedRoute>
                                </PageLayout>
                            }
                        />
                        <Route
                            path="/cms/pages/add_files"
                            element={
                                <PageLayout>
                                    <UserIsAuthenticatedRoute permission={'cms.add_file'}>
                                        <AddFilesView />
                                    </UserIsAuthenticatedRoute>
                                </PageLayout>
                            }
                        />
                        <Route
                            path="/cms/pages/edit_link"
                            element={
                                <PageLayout>
                                    <UserIsAuthenticatedRoute permission={'cms.edit_link'}>
                                        <EditLinkView />
                                    </UserIsAuthenticatedRoute>
                                </PageLayout>
                            }
                        />
                        <Route
                            path="/cms/pages/add_document"
                            element={
                                <PageLayout>
                                    <UserIsAuthenticatedRoute permission={'cms.add_document'}>
                                        <AddDocumentView />
                                    </UserIsAuthenticatedRoute>
                                </PageLayout>
                            }
                        />
                        <Route
                            path="/cms/pages/edit_document"
                            element={
                                <PageLayout>
                                    <UserIsAuthenticatedRoute permission={'cms.edit_document'}>
                                        <EditDocumentView />
                                    </UserIsAuthenticatedRoute>
                                </PageLayout>
                            }
                        />
                        <Route
                            path="/cms/settings"
                            element={
                                <PageLayout>
                                    <UserIsAuthenticatedRoute permission={'cms.settings'}>
                                        <CmsSettingsView />
                                    </UserIsAuthenticatedRoute>
                                </PageLayout>
                            }
                        />
                        <Route
                            path="/cms/menus"
                            element={
                                <PageLayout>
                                    <UserIsAuthenticatedRoute permission={'cms.menus'}>
                                        <CmsMenusView />
                                    </UserIsAuthenticatedRoute>
                                </PageLayout>
                            }
                        />
                        <Route
                            path="/cms/menus/add"
                            element={
                                <PageLayout>
                                    <UserIsAuthenticatedRoute permission={'cms.menus.add'}>
                                        <CmsAddMenuView />
                                    </UserIsAuthenticatedRoute>
                                </PageLayout>
                            }
                        />
                        <Route
                            path="/cms/menus/edit"
                            element={
                                <PageLayout>
                                    <UserIsAuthenticatedRoute permission={'cms.menus.edit'}>
                                        <CmsEditMenuView />
                                    </UserIsAuthenticatedRoute>
                                </PageLayout>
                            }
                        />
                        <Route
                            path="/users"
                            element={
                                <PageLayout>
                                    <UserIsAuthenticatedRoute permission={'users.list'}>
                                        <UsersView />
                                    </UserIsAuthenticatedRoute>
                                </PageLayout>
                            }
                        />
                        <Route
                            path="/users/edit"
                            element={
                                <PageLayout>
                                    <UserIsAuthenticatedRoute permission={'users.edit'}>
                                        <UsersEditView />
                                    </UserIsAuthenticatedRoute>
                                </PageLayout>
                            }
                        />
                        <Route
                            path="/users/add"
                            element={
                                <PageLayout>
                                    <UserIsAuthenticatedRoute permission={'users.add'}>
                                        <UsersAddView />
                                    </UserIsAuthenticatedRoute>
                                </PageLayout>
                            }
                        />
                        <Route
                            path="/logs"
                            element={
                                <PageLayout>
                                    <UserIsAuthenticatedRoute permission={'logs.list'}>
                                        <LogsView />
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
                                    <UserIsAuthenticatedRoute permission={'roles.list'}>
                                        <UserRolesView />
                                    </UserIsAuthenticatedRoute>
                                </PageLayout>
                            }
                        />
                        <Route
                            path="/roles/add"
                            element={
                                <PageLayout>
                                    <UserIsAuthenticatedRoute permission={'roles.add'}>
                                        <UserRolesAdd />
                                    </UserIsAuthenticatedRoute>
                                </PageLayout>
                            }
                        />
                        <Route
                            path="/roles/edit"
                            element={
                                <PageLayout>
                                    <UserIsAuthenticatedRoute permission={'roles.edit'}>
                                        <UserRolesEdit />
                                    </UserIsAuthenticatedRoute>
                                </PageLayout>
                            }
                        />
                        <Route
                            path="/permissions"
                            element={
                                <PageLayout>
                                    <UserIsAuthenticatedRoute permission={'permissions.list'}>
                                        <UsersPermissions />
                                    </UserIsAuthenticatedRoute>
                                </PageLayout>
                            }
                        />
                        <Route
                            path="/permissions/add"
                            element={
                                <PageLayout>
                                    <UserIsAuthenticatedRoute permission={'permissions.add'}>
                                        <UsersPermissionsAddView />
                                    </UserIsAuthenticatedRoute>
                                </PageLayout>
                            }
                        />
                        <Route
                            path="/permissions/edit"
                            element={
                                <PageLayout>
                                    <UserIsAuthenticatedRoute permission={'permissions.edit'}>
                                        <UsersPermissionsEditView />
                                    </UserIsAuthenticatedRoute>
                                </PageLayout>
                            }
                        />
                        <Route
                            path="/media"
                            element={
                                <PageLayout>
                                    <UserIsAuthenticatedRoute permission={'media.list'}>
                                        <MediaView />
                                    </UserIsAuthenticatedRoute>
                                </PageLayout>
                            }
                        />
                        <Route
                            path="/settings"
                            element={
                                <PageLayout>
                                    <UserIsAuthenticatedRoute permission={'system.edit_settings'}>
                                        <SystemSettings />
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
                        <Route
                            path="/register"
                            element={
                                <BlankPageLayout>
                                    <RegisterView />
                                </BlankPageLayout>
                            }
                        />
                    </Routes>
                </Container>
            )}
        </WebsocketsManager>
    </Router>
)

export { App }
export default App
