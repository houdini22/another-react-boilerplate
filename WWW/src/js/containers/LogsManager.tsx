import * as React from 'react'
import { selectors as logsSelectors, actions as logsActions } from '../reducers/logs'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { AuthManager } from './AuthManager'

interface LogsManagerProps {
    children: (renderProps: Object) => any
    setIsLoading: Function
    isLoading: boolean
}

class LogsManagerBase extends React.Component<LogsManagerProps, null> {
    render() {
        const { children, setIsLoading, isLoading } = this.props

        const renderProps = {
            setIsLoading,
            isLoading,
        }

        return (
            <>
                <AuthManager>{() => <>{children(renderProps)}</>}</AuthManager>
            </>
        )
    }
}

const mapStateToProps = (state) => ({
    isLoading: logsSelectors['getIsLoading'](state),
})

const LogsManager = connect(mapStateToProps, (dispatch) => {
    return bindActionCreators(
        {
            setIsLoading: logsActions.setIsLoading,
        },
        dispatch,
    )
})(LogsManagerBase)

export { LogsManager }
