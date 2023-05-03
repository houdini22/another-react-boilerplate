import * as React from 'react'
import { bindActionCreators, compose } from 'redux'
import { connect } from 'react-redux'
import { reduxForm } from 'redux-form'
import { FiltersForm } from '../components/FiltersForm'

export const FORM_NAME = 'cms-pages-filters-form'

class FiltersFormContainerBase extends React.Component {
    render() {
        return <FiltersForm {...this.props} {...this.state} />
    }
}

const FiltersFormContainer = compose(
    connect(
        ({ cmsPages: { currentId } }, props) => {
            return {}
        },
        (dispatch) => {
            return bindActionCreators({}, dispatch)
        },
    ),
    reduxForm({
        form: FORM_NAME,
        onSubmit: () => {},
    }),
)(FiltersFormContainerBase)

export { FiltersFormContainer }
export default { FiltersFormContainer }
