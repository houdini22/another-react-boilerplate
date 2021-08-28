import React from 'react'
import { Route } from 'react-router'
import { BlankPageLayoutContainer } from './BlankPageLayout/BlankPageLayoutContainer'
import { connect } from 'react-redux'

interface BlankPageLayoutProps {
    component(): any;
}

const BlankPageLayoutBase = ({ component: Component, ...rest } : BlankPageLayoutProps) => {
    return (
        <Route
            {...rest}
            render={(matchProps) => (
                <BlankPageLayoutContainer>
                    <Component {...matchProps} />
                </BlankPageLayoutContainer>
            )}
        />
    )
}

const BlankPageLayout = connect((state) => {
    return {}
})(BlankPageLayoutBase)

export { BlankPageLayout }
export default { BlankPageLayout }
