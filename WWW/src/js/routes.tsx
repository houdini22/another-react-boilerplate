import * as React from 'react'
import { Routes, HashRouter as Router, Route } from 'react-router-dom'
import { PageLayout } from './layouts'
import { BlankPageLayout } from './layouts'

import { FaqView } from './routes/Faq'
import { RateView } from './routes/Rate'
import { FormsView } from './routes/Forms'
import { AboutView } from './routes/About'
import { IndexView } from './routes/Index'
import { CmsPagesView } from './routes/Cms'

import {
    AlertView,
    BadgeView,
    ButtonView,
    CardView,
    HeaderView,
    IconBoxView,
    LoadingOverlayView,
    LabelView,
    DropdownView,
    ButtonGroupView,
    PageHeaderView,
    TabsView,
    PopoverView,
    TypographyView,
    ProgressView,
    AccordionView,
    ListView,
    ColumnView,
    TableView,
    PagesView,
    NotificationsView,
    TooltipView,
    ModalView,
} from './routes/StyleGuide'

import { userIsAuthenticated } from './modules/auth'
import AddCategoryView from './routes/Cms/components/AddCategory'

const App = () => (
    <Router>
        <Routes>
            <Route
                path="/contact-me"
                element={
                    <PageLayout>
                        <AboutView />
                    </PageLayout>
                }
            />
            <Route
                path="/restricted-area"
                element={
                    <PageLayout>{userIsAuthenticated(RateView)}</PageLayout>
                }
            />
            <Route
                path="/components/accordion"
                element={
                    <PageLayout>
                        <AccordionView />
                    </PageLayout>
                }
            />
            <Route
                path="/components/alert"
                element={
                    <PageLayout>
                        <AlertView />
                    </PageLayout>
                }
            />
            <Route
                path="/components/badge"
                element={
                    <PageLayout>
                        <BadgeView />
                    </PageLayout>
                }
            />
            <Route
                path="/components/button"
                element={
                    <PageLayout>
                        <ButtonView />
                    </PageLayout>
                }
            />
            <Route
                path="/components/button-group"
                element={
                    <PageLayout>
                        <ButtonGroupView />
                    </PageLayout>
                }
            />
            <Route
                path="/components/card"
                element={
                    <PageLayout>
                        <CardView />
                    </PageLayout>
                }
            />
            <Route
                path="/components/dropdown"
                element={
                    <PageLayout>
                        <DropdownView />
                    </PageLayout>
                }
            />
            <Route
                path="/components/header"
                element={
                    <PageLayout>
                        <HeaderView />
                    </PageLayout>
                }
            />
            <Route
                path="/components/iconbox"
                element={
                    <PageLayout>
                        <IconBoxView />
                    </PageLayout>
                }
            />
            <Route
                path="/components/label"
                element={
                    <PageLayout>
                        <LabelView />
                    </PageLayout>
                }
            />
            <Route
                path="/components/list"
                element={
                    <PageLayout>
                        <ListView />
                    </PageLayout>
                }
            />
            <Route
                path="/components/loading-overlay"
                element={
                    <PageLayout>
                        <LoadingOverlayView />
                    </PageLayout>
                }
            />
            <Route
                path="/components/modal"
                element={
                    <PageLayout>
                        <ModalView />
                    </PageLayout>
                }
            />
            <Route
                path="/components/page-header"
                element={
                    <PageLayout>
                        <PageHeaderView />
                    </PageLayout>
                }
            />
            <Route
                path="/components/notifications"
                element={
                    <PageLayout>
                        <NotificationsView />
                    </PageLayout>
                }
            />
            <Route
                path="/components/progress"
                element={
                    <PageLayout>
                        <ProgressView />
                    </PageLayout>
                }
            />
            <Route
                path="/components/popover"
                element={
                    <PageLayout>
                        <PopoverView />
                    </PageLayout>
                }
            />
            <Route
                path="/components/tabs"
                element={
                    <PageLayout>
                        <TabsView />
                    </PageLayout>
                }
            />
            <Route
                path="/components/table"
                element={
                    <PageLayout>
                        <TableView />
                    </PageLayout>
                }
            />
            <Route
                path="/components/tooltip"
                element={
                    <PageLayout>
                        <TooltipView />
                    </PageLayout>
                }
            />
            <Route
                path="/components/column"
                element={
                    <PageLayout>
                        <ColumnView />
                    </PageLayout>
                }
            />
            <Route
                path="/components/typography"
                element={
                    <PageLayout>
                        <TypographyView />
                    </PageLayout>
                }
            />
            <Route
                path="/forms"
                element={
                    <PageLayout>
                        <FormsView />
                    </PageLayout>
                }
            />
            <Route
                path="/pages"
                element={
                    <PageLayout>
                        <PagesView />
                    </PageLayout>
                }
            />
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
                path="/pages/login-page"
                element={
                    <BlankPageLayout>
                        <IndexView />
                    </BlankPageLayout>
                }
            />
            <Route
                path="/"
                element={
                    <PageLayout>
                        <FaqView />
                    </PageLayout>
                }
            />
        </Routes>
    </Router>
)

export { App }
export default App
