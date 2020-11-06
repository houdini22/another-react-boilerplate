import React from 'react'
import { Switch, withRouter, HashRouter as Router } from 'react-router-dom'

import { PageLayout } from './layouts'

import { LoginView } from './routes/Login'
import { FaqView } from './routes/Faq'
import { RateView } from './routes/Rate'
import { FormsView } from './routes/Forms'
import { AboutView } from './routes/About'
import { BuilderView } from './routes/Builder/components/Builder'

import {
    AlertView,
    BadgeView,
    ButtonView,
    CardView,
    HeaderView,
    IconBoxView,
    LoadingOverlayView,
    LabelView,
    ModalView,
    DropdownView,
    ButtonGroupView,
    PageHeaderView,
    TabsView,
    PopoverView,
    TypographyView,
    ProgressView,
    AccordionView,
    ListView,
} from './routes/StyleGuide'

import { userIsAuthenticated } from './modules/auth'
import { ModalContainer } from './containers/Modal'

import { actions } from './reducers/common'
const { setLayoutOption } = actions

const AppContainer = () => (
    <Router>
        <Switch>
            <PageLayout path="/login" component={LoginView} />
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
            <PageLayout path="/components/progress" component={ProgressView} />
            <PageLayout path="/components/popover" component={PopoverView} />
            <PageLayout path="/components/tabs" component={TabsView} />
            <PageLayout path="/components/table" component={ListView} />
            <PageLayout
                path="/components/typography"
                component={TypographyView}
            />
            <PageLayout path="/forms" component={FormsView} />
            <PageLayout path="/builder" component={BuilderView} />
            <PageLayout exact path="/" component={FaqView} />
        </Switch>
        <ModalContainer />
    </Router>
)

export const App = withRouter(AppContainer)
export default App
