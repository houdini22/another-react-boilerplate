import * as React from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { parseQueryString } from '../containers/RouteManager/RouteManager'

export const withRouter = (Component) => {
    const ComponentWithRouterProp = (props) => {
        let location = useLocation()
        let navigate = useNavigate()
        let params = useParams()
        let searchParams = parseQueryString(location.search)
        return <Component {...props} location={location} navigate={navigate} params={params} searchParams={searchParams} />
    }

    return ComponentWithRouterProp
}
