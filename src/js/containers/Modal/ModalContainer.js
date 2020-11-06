import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { selectors as modalSelectors } from '../../reducers/modal'

class ModalContainerBase extends React.Component {
  render() {
    const {
      modal: { modals },
    } = this.props

    return (
      <div className="container-modal">
        {modals.map(({ id, component }) => (
          <div key={id}>{component}</div>
        ))}
      </div>
    )
  }
}

ModalContainerBase.propTypes = {
  modal: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
  modal: modalSelectors.getState(state),
})

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({}, dispatch)
}

const ModalContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ModalContainerBase)

export { ModalContainer }
export default { ModalContainer }
