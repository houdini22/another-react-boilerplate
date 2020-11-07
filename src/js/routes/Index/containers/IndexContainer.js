import { connect } from 'react-redux'
import { IndexView } from '../components/Index'
import { actions } from '../../../reducers/socket'
import { bindActionCreators } from 'redux'

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators(
        {
            socketConnect: actions.connect,
        },
        dispatch,
    )
}

const mapStateToProps = null

export default connect(mapStateToProps, mapDispatchToProps)(IndexView)
