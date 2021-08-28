import * as React from "react"
import { Route } from 'react-router'
import { PageLayoutContainer } from './PageLayout/PageLayoutContainer'
import { connect } from 'react-redux'
import { selectors } from '../reducers/common'

interface PageLayoutProps {
    component: any;
    layout: {
        disableHeader: boolean;
        disableFooter: boolean;
        disableSidebar: boolean;
    }
    path: string;
    exact?: boolean;
}

const PageLayoutBase = ({ component: Component, layout, ...rest } : PageLayoutProps) => {
    return (
        <Route
            {...rest}
            render={(matchProps) => (
                <PageLayoutContainer layout={layout}>
                    <Component {...matchProps} />
                </PageLayoutContainer>
            )}
        />
    )
}

const PageLayout = connect((state) => {
    return {
        layout: selectors.getLayout(state),
    }
})(PageLayoutBase)

export { PageLayout }
export default { PageLayout }
