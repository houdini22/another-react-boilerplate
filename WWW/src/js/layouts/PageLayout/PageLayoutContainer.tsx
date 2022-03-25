import { connect } from 'react-redux'
import { PageLayout } from './PageLayout'
import {
    actions as commonActions,
    selectors,
    selectors as commonSelectors,
} from '../../reducers/common'
import { bindActionCreators } from 'redux'

const { setConnectionErrorModalVisible, setLayoutOption } = commonActions

const mapStateToProps = (state) => ({
    common: commonSelectors['getState'](state),
    layout: commonSelectors['getState'](state)['layout'],
})

const PageLayoutContainer = connect(mapStateToProps, (dispatch) => {
    return bindActionCreators(
        {
            setConnectionErrorModalVisible,
            setLayoutOption,
        },
        dispatch,
    )
})(PageLayout)

export { PageLayoutContainer }
export default { PageLayoutContainer }
