import { connect } from 'react-redux'
import { IndexView } from '../components/Index'
import {
    actions as commonActions,
    selectors as commonSelectors,
} from '../../../reducers/common'
import { bindActionCreators } from 'redux'

const { setConnectionErrorModalVisible } = commonActions

const mapStateToProps = (state) => ({
    common: commonSelectors['getState'](state),
})

const BlankPageLayoutContainer = connect(mapStateToProps, (dispatch) => {
    return bindActionCreators(
        {
            setConnectionErrorModalVisible,
        },
        dispatch,
    )
})(IndexView)

export { BlankPageLayoutContainer }
export default { BlankPageLayoutContainer }
