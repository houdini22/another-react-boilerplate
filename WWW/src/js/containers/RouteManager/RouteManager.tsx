import * as React from 'react'
import { withRouter } from '../../helpers/router'

const parseQueryString = (queryString) => {
    const query = {}
    const pairs = (queryString[0] === '?' ? queryString.substr(1) : queryString).split('&')
    for (let i = 0; i < pairs.length; i++) {
        const pair = pairs[i].split('=')
        query[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1] || null)
    }
    return query
}

interface RouteManagerProps {
    children(renderProps: { params: any; location: any; navigate: any; query: any }): any
    location: object
    navigate()
    params: object
}

class RouteManagerBase extends React.Component<RouteManagerProps> {
    render() {
        const { children, location, navigate, params } = this.props
        const query = parseQueryString(location['search'])

        const renderProps = {
            params,
            location,
            navigate,
            query,
        }

        return children(renderProps)
    }
}

const RouteManager = withRouter(RouteManagerBase)

export { RouteManager }
export default { RouteManager }
