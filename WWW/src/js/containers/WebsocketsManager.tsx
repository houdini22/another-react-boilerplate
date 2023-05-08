import * as React from 'react'
import { bindActionCreators, compose } from 'redux'
import { connect } from 'react-redux'
import { selectors as authSelectors, actions as authActions } from '../reducers/auth'
import Echo from 'laravel-echo'
import Pusher from 'pusher-js'
import { withRouter } from '../helpers/router'

interface WebsocketsManagerBaseProps {
    auth: {
        isLoggedIn: boolean
        token: string
    }
}

class WebsocketsManagerBase extends React.Component<WebsocketsManagerBaseProps, null> {
    client = null

    token = ''

    componentDidMount() {
        const options = {
            broadcaster: 'pusher',
            key: '1dd515ef5639ec0eaa2e',
            cluster: 'eu',
        }

        this.client = new Echo({
            ...options,
            client: new Pusher(options.key, options),
        })
    }

    componentDidUpdate(prevProps: Readonly<WebsocketsManagerBaseProps>, prevState: Readonly<null>, snapshot?: any) {
        const {
            auth: { user: { token } = {}, isLoggedIn },
        } = this.props

        if (!prevProps.auth.isLoggedIn && isLoggedIn && token) {
            // user just logged in
            console.log(`listening user.${token}`)
            this.token = token
            const { setUserData } = this.props

            this.client
                ?.channel(`user.${token}`)
                .listen('.user_data_changed', (data) => {
                    setUserData(data)
                })
                .listen('.force_logout', () => {
                    console.log('force logout')

                    const { gentlyLogOff, navigate } = this.props

                    navigate('/login?reason=forced_by_admin')
                    gentlyLogOff()
                })
        } else if (prevProps.auth.isLoggedIn && !isLoggedIn) {
            this.client.leaveChannel(`user.${this.token}`)
            this.token = ''
        }
    }

    render() {
        const { children } = this.props
        const renderProps = {}

        return children(renderProps)
    }
}

const mapStateToProps = (state) => ({
    auth: authSelectors.getState(state),
})

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators(
        {
            setUserData: authActions.setUserData,
            gentlyLogOff: authActions.gentlyLogOff,
        },
        dispatch,
    )
}

const WebsocketsManager = compose(connect(mapStateToProps, mapDispatchToProps), withRouter)(WebsocketsManagerBase)

export { WebsocketsManager }
