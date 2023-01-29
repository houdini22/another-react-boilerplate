import * as React from 'react'
import { Routes, HashRouter as Router, Route } from 'react-router-dom'
import { PageLayout } from './layouts'
import { BlankPageLayout } from './layouts'

import { IndexView } from './routes/Index'
import { IndexView as LoginView } from './routes/Login'
import { CmsPagesView } from './routes/Cms'

import { userIsAuthenticated } from './modules/auth'
import AddCategoryView from './routes/Cms/components/AddCategory'
import AddDocumentView from './routes/Cms/components/AddDocument'
import AddLinkView from './routes/Cms/components/AddLink'
import { UsersView } from './routes/Users'
import { UserRolesView } from './routes/UserRoles'
import { UsersAccountActivated } from './routes/UsersAccountActivated'
const App = () => (
    <Router>
        <Routes>
            <Route
                path="/cms/pages"
                element={
                    <PageLayout>
                        <CmsPagesView />
                    </PageLayout>
                }
            />
            <Route
                path="/cms/pages/add_category"
                element={
                    <PageLayout>
                        <AddCategoryView />
                    </PageLayout>
                }
            />
            <Route
                path="/cms/pages/add_link"
                element={
                    <PageLayout>
                        <AddLinkView />
                    </PageLayout>
                }
            />
            <Route
                path="/cms/pages/add_document"
                element={
                    <PageLayout>
                        <AddDocumentView />
                    </PageLayout>
                }
            />
            <Route
                path="/users"
                element={
                    <PageLayout>
                        <UsersView />
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
                        <UserRolesView />
                    </PageLayout>
                }
            />
            <Route
                path="/"
                element={
                    <PageLayout>
                        <IndexView />
                    </PageLayout>
                }
            />
        </Routes>
    </Router>
)

export { App }
export default App
