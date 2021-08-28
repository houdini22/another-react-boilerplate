import React from 'react'
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

interface RouteManagerProps {
    children(): any;
    history: object;
    location: object;
    match: object;
}

class RouteManagerBase extends React.Component<RouteManagerProps> {
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

const RouteManager = withRouter(RouteManagerBase)

export { RouteManager }
export default { RouteManager }
