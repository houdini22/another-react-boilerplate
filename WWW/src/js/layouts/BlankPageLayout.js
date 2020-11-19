import React from 'react'
import { Route } from 'react-router'
import PropTypes from 'prop-types'
import { BlankPageLayoutContainer } from './BlankPageLayout/BlankPageLayoutContainer'
import { connect } from 'react-redux'

const BlankPageLayoutBase = ({ component: Component, ...rest }) => {
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

BlankPageLayoutBase.propTypes = {
    component: PropTypes.func.isRequired,
}

const BlankPageLayout = connect((state) => {
    return {}
})(BlankPageLayoutBase)

export { BlankPageLayout }
export default { BlankPageLayout }
