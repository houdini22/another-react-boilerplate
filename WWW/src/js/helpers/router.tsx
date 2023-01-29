import * as React from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'

export const withRouter = (Component) => {
    const ComponentWithRouterProp = (props) => {
        let location = useLocation()
        let navigate = useNavigate()
        let params = useParams()
        let searchParams = { back: '/users' }
        return (
            <Component {...props} location={location} navigate={navigate} params={params} searchParams={searchParams} />
        )
    }

    return ComponentWithRouterProp
}
