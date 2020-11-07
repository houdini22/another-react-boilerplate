import { connect } from 'react-redux'
import { IndexView } from '../components/Index'
import { bindActionCreators } from 'redux'

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({}, dispatch)
}

const mapStateToProps = null

export default connect(mapStateToProps, mapDispatchToProps)(IndexView)
