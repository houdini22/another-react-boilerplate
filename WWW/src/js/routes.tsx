import React from 'react'
import { Switch, withRouter, HashRouter as Router } from 'react-router-dom'

import { PageLayout, BlankPageLayout } from './layouts'

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

const AppContainer = () => (
    <Router>
        <Switch>
            <PageLayout path="/faq" component={FaqView} />
            <PageLayout path="/contact-me" component={AboutView} />
            <PageLayout
                path="/restricted-area"
                component={userIsAuthenticated(RateView)}
            />
            <PageLayout
                path="/components/accordion"
                component={AccordionView}
            />
            <PageLayout path="/components/alert" component={AlertView} />
            <PageLayout path="/components/badge" component={BadgeView} />
            <PageLayout path="/components/button" component={ButtonView} />
            <PageLayout
                path="/components/button-group"
                component={ButtonGroupView}
            />
            <PageLayout path="/components/card" component={CardView} />
            <PageLayout path="/components/dropdown" component={DropdownView} />
            <PageLayout path="/components/header" component={HeaderView} />
            <PageLayout path="/components/iconbox" component={IconBoxView} />
            <PageLayout path="/components/label" component={LabelView} />
            <PageLayout path="/components/list" component={ListView} />
            <PageLayout
                path="/components/loading-overlay"
                component={LoadingOverlayView}
            />
            <PageLayout path="/components/modal" component={ModalView} />
            <PageLayout
                path="/components/page-header"
                component={PageHeaderView}
            />
            <PageLayout
                path="/components/notifications"
                component={NotificationsView}
            />
            <PageLayout path="/components/progress" component={ProgressView} />
            <PageLayout path="/components/popover" component={PopoverView} />
            <PageLayout path="/components/tabs" component={TabsView} />
            <PageLayout path="/components/table" component={TableView} />
            <PageLayout path="/components/tooltip" component={TooltipView} />
            <PageLayout path="/components/column" component={ColumnView} />
            <PageLayout
                path="/components/typography"
                component={TypographyView}
            />
            <PageLayout path="/forms" component={FormsView} />
            <BlankPageLayout path="/pages/login-page" component={IndexView} />
            <PageLayout path="/pages" component={PagesView} />
            <PageLayout exact path="/" component={FaqView} />
        </Switch>
    </Router>
)

export const App = withRouter(AppContainer)
export default App
