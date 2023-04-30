import { connect } from 'react-redux'
import { PageLayout } from './PageLayout'
import { actions as commonActions, selectors as commonSelectors } from '../../reducers/common'
import { bindActionCreators } from 'redux'

const { setLayoutOption, setConnectionErrorModalVisible, setFetchError } = commonActions

const mapStateToProps = (state) => ({
    common: commonSelectors['getState'](state),
    layout: commonSelectors['getState'](state)['layout'],
    connectionErrorModalVisible: commonSelectors['getIsConnectionErrorModalVisible'](state),
    connectionFetchError: commonSelectors.getConnectionFetchError(state),
})

const PageLayoutContainer = connect(mapStateToProps, (dispatch) => {
    return bindActionCreators(
        {
            setLayoutOption,
            setConnectionErrorModalVisible,
            setFetchError,
        },
        dispatch,
    )
})(PageLayout)

export { PageLayoutContainer }
export default { PageLayoutContainer }
