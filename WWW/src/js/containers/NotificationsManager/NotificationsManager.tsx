import * as React from 'react'
import { selectors as commonSelectors, actions as commonActions } from '../../reducers/notifications'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

interface NotificationsManagerProps {
    children: any
    addToastNotification: Function
}

class NotificationsManagerBase extends React.Component<NotificationsManagerProps> {
    render() {
        const { children, addToastNotification } = this.props
        const renderProps = {
            addToastNotification,
        }

        return children(renderProps)
    }
}

const mapStateToProps = (state) => ({})

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
