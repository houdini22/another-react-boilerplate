import * as React from 'react'
import { bindActionCreators, compose } from 'redux'
import { connect } from 'react-redux'
import { selectors as authSelectors, actions as authActions } from '../reducers/auth'
import Echo from 'laravel-echo'
import Pusher from 'pusher-js'
import { withRouter } from '../helpers/router'
import { ModalInfo } from '../components/common/ModalInfo'
import { ModalManager } from '../components/ui/Modal'

interface WebsocketsManagerBaseProps {
    auth: {
        isLoggedIn: boolean
        token: string
    }
}

class WebsocketsManagerBase extends React.Component<WebsocketsManagerBaseProps, null> {
    state = {
        modalInfoVisible: false,
    }
    client = null

    token = ''

    componentDidMount() {
        const options = {
            broadcaster: 'pusher',
            key: '17e6d04c486a8203ea16',
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
                    console.info('User data changed')
                    setUserData(data)
                    this.setState({
                        modalInfoVisible: true,
                    })
                })
                .listen('.force_logout', () => {
                    console.log('force logout')

                    const { gentlyLogOff, navigate } = this.props

                    navigate('/login?reason=forced_by_admin')
                    gentlyLogOff()
                })

            this.client?.channel('global').listen('.config_changed', (data) => {
                console.log('config changed data', data)
            })
        } else if (prevProps.auth.isLoggedIn && !isLoggedIn) {
            this.client.leaveChannel(`user.${this.token}`)
            this.token = ''
        }
    }

    render() {
        const { children } = this.props
        const { modalInfoVisible } = this.state
        const renderProps = {}

        return (
            <ModalManager>
                {({ openModal, closeModal, registerModal }) => {
                    if (modalInfoVisible) {
                        registerModal(
                            'modal_info',
                            <ModalInfo
                                close={() => {
                                    this.setState({
                                        modalInfoVisible: false,
                                    })
                                }}
                                visible={true}
                            >
                                Your User data has just changed.
                            </ModalInfo>,
                        )
                        openModal('modal_info')
                    } else {
                        closeModal('modal_info')
                    }

                    return <>{children(renderProps)}</>
                }}
            </ModalManager>
        )
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
