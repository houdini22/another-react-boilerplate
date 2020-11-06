import React from 'react'
import { Route } from 'react-router'
import PropTypes from 'prop-types'
import { PageLayoutContainer } from './PageLayout/PageLayoutContainer'
import { connect } from 'react-redux'
import { selectors } from '../reducers/common'

const PageLayoutBase = ({ component: Component, layout, ...rest }) => {
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

PageLayoutBase.propTypes = {
  component: PropTypes.func.isRequired,
}

const PageLayout = connect((state) => {
  return {
    layout: selectors.getLayout(state),
  }
})(PageLayoutBase)

export { PageLayout }
export default { PageLayout }
