import React from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'

const parseQueryString = (queryString) => {
    const query = {}
    const pairs = (queryString[0] === '?'
        ? queryString.substr(1)
        : queryString
    ).split('&')
    for (let i = 0; i < pairs.length; i++) {
        const pair = pairs[i].split('=')
        query[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1] || null)
    }
    return query
}

class RouteManagerBase extends React.Component {
    render() {
        const { children, history, location, match } = this.props
        const query = parseQueryString(location['search'])

        const renderProps = {
            history,
            location,
            match,
            query,
        }

        return children(renderProps)
    }
}

RouteManagerBase.propTypes = {
    children: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    match: PropTypes.object.isRequired,
}

const RouteManager = withRouter(RouteManagerBase)

export { RouteManager }
export default { RouteManager }
