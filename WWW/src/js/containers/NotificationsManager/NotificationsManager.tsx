import * as React from 'react'
import { actions as commonActions } from '../../reducers/notifications'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

interface NotificationsManagerProps {
    children: any
    addToastNotification: Function
}

class NotificationsManagerBase extends React.Component<NotificationsManagerProps, null> {
    render() {
        const { children, addToastNotification } = this.props
        const renderProps = {
            addToastNotification,
        }

        return children(renderProps)
    }
}

const mapStateToProps = () => ({})

const NotificationsManager = connect(mapStateToProps, (dispatch) => {
    return bindActionCreators(
        {
            addToastNotification: commonActions.addToastNotification,
        },
        dispatch,
    )
})(NotificationsManagerBase)

export { NotificationsManager }
export default { NotificationsManager }
