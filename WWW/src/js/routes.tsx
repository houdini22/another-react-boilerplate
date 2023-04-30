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
const App = () => (
    <Router>
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
    </Router>
)

export { App }
export default App
