import * as React from 'react'
import { Routes, HashRouter as Router, Route } from 'react-router-dom'
import { PageLayoutContainer } from './layouts/PageLayout/PageLayoutContainer'
import { BlankPageLayoutContainer } from './layouts/BlankPageLayout/BlankPageLayoutContainer'

import { FaqView } from './routes/Faq'
import { RateView } from './routes/Rate'
import { FormsView } from './routes/Forms'
import { AboutView } from './routes/About'
import { IndexView } from './routes/Index'

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

const App = () => (
    <Router>
        <Routes>
            <Route
                path="/contact-me"
                element={
                    <PageLayoutContainer>
                        <AboutView />
                    </PageLayoutContainer>
                }
            />
            <Route
                path="/restricted-area"
                element={
                    <PageLayoutContainer>
                        {userIsAuthenticated(RateView)}
                    </PageLayoutContainer>
                }
            />
            <Route
                path="/components/accordion"
                element={
                    <PageLayoutContainer>
                        <AccordionView />
                    </PageLayoutContainer>
                }
            />
            <Route
                path="/components/alert"
                element={
                    <PageLayoutContainer>
                        <AlertView />
                    </PageLayoutContainer>
                }
            />
            <Route
                path="/components/badge"
                element={
                    <PageLayoutContainer>
                        <BadgeView />
                    </PageLayoutContainer>
                }
            />
            <Route
                path="/components/button"
                element={
                    <PageLayoutContainer>
                        <ButtonView />
                    </PageLayoutContainer>
                }
            />
            <Route
                path="/components/button-group"
                element={
                    <PageLayoutContainer>
                        <ButtonGroupView />
                    </PageLayoutContainer>
                }
            />
            <Route
                path="/components/card"
                element={
                    <PageLayoutContainer>
                        <CardView />
                    </PageLayoutContainer>
                }
            />
            <Route
                path="/components/dropdown"
                element={
                    <PageLayoutContainer>
                        <DropdownView />
                    </PageLayoutContainer>
                }
            />
            <Route
                path="/components/header"
                element={
                    <PageLayoutContainer>
                        <HeaderView />
                    </PageLayoutContainer>
                }
            />
            <Route
                path="/components/iconbox"
                element={
                    <PageLayoutContainer>
                        <IconBoxView />
                    </PageLayoutContainer>
                }
            />
            <Route
                path="/components/label"
                element={
                    <PageLayoutContainer>
                        <LabelView />
                    </PageLayoutContainer>
                }
            />
            <Route
                path="/components/list"
                element={
                    <PageLayoutContainer>
                        <ListView />
                    </PageLayoutContainer>
                }
            />
            <Route
                path="/components/loading-overlay"
                element={
                    <PageLayoutContainer>
                        <LoadingOverlayView />
                    </PageLayoutContainer>
                }
            />
            <Route
                path="/components/modal"
                element={
                    <PageLayoutContainer>
                        <ModalView />
                    </PageLayoutContainer>
                }
            />
            <Route
                path="/components/page-header"
                element={
                    <PageLayoutContainer>
                        <PageHeaderView />
                    </PageLayoutContainer>
                }
            />
            <Route
                path="/components/notifications"
                element={
                    <PageLayoutContainer>
                        <NotificationsView />
                    </PageLayoutContainer>
                }
            />
            <Route
                path="/components/progress"
                element={
                    <PageLayoutContainer>
                        <ProgressView />
                    </PageLayoutContainer>
                }
            />
            <Route
                path="/components/popover"
                element={
                    <PageLayoutContainer>
                        <PopoverView />
                    </PageLayoutContainer>
                }
            />
            <Route
                path="/components/tabs"
                element={
                    <PageLayoutContainer>
                        <TabsView />
                    </PageLayoutContainer>
                }
            />
            <Route
                path="/components/table"
                element={
                    <PageLayoutContainer>
                        <TableView />
                    </PageLayoutContainer>
                }
            />
            <Route
                path="/components/tooltip"
                element={
                    <PageLayoutContainer>
                        <TooltipView />
                    </PageLayoutContainer>
                }
            />
            <Route
                path="/components/column"
                element={
                    <PageLayoutContainer>
                        <ColumnView />
                    </PageLayoutContainer>
                }
            />
            <Route
                path="/components/typography"
                element={
                    <PageLayoutContainer>
                        <TypographyView />
                    </PageLayoutContainer>
                }
            />
            <Route
                path="/forms"
                element={
                    <PageLayoutContainer>
                        <FormsView />
                    </PageLayoutContainer>
                }
            />
            <Route
                path="/pages"
                element={
                    <PageLayoutContainer>
                        <PagesView />
                    </PageLayoutContainer>
                }
            />
            <Route
                path="/pages/login-page"
                element={
                    <BlankPageLayoutContainer>
                        <IndexView />
                    </BlankPageLayoutContainer>
                }
            />
            <Route
                path="/"
                element={
                    <PageLayoutContainer>
                        <FaqView />
                    </PageLayoutContainer>
                }
            />
        </Routes>
    </Router>
)

export { App }
export default App
