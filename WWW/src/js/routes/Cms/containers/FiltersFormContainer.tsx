import * as React from 'react'
import { bindActionCreators, compose } from 'redux'
import { connect } from 'react-redux'
import { reduxForm, getFormValues as getFormValuesRedux, SubmissionError } from 'redux-form'
import { getFormValues } from '../../../utils/forms/auto-save'
import * as moment from 'moment'
import { processAPIerrorResponseToFormErrors } from '../../../modules/http'
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
        onSubmit: (values, dispatch, { addLink }) => {},
    }),
)(FiltersFormContainerBase)

export { FiltersFormContainer }
export default { FiltersFormContainer }
