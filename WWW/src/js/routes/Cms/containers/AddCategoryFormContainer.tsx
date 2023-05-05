import * as React from 'react'
import { bindActionCreators, compose } from 'redux'
import { connect } from 'react-redux'
import { AddCategoryForm } from '../components/AddCategory/AddCategoryForm'
import { reduxForm, SubmissionError } from 'redux-form'
import { actions } from '../../../reducers/cms-pages'
import { processAPIerrorResponseToFormErrors } from '../../../modules/http'
import { withRouter } from '../../../helpers/router'

export const FORM_NAME = 'add-category-form'

interface AddCategoryFormContainerBaseState {
    categories: Array<any>
    indexDocuments: Array<any>
}

class AddCategoryFormContainerBase extends React.Component<null, AddCategoryFormContainerBaseState> {
    state = {
        categories: [],
        indexDocuments: [],
    }

    componentDidMount() {
        this.fetchParentCategorySelectOptions()
    }

    fetchParentCategorySelectOptions() {
        const { fetchParentCategorySelectOptions } = this.props

        return fetchParentCategorySelectOptions().then((options) => {
            this.setState({
                categories: [...options],
            })
        })
    }

    fetchIndexDocumentSelectOptions() {
        const { fetchIndexDocumentSelectOptions } = this.props

        return fetchIndexDocumentSelectOptions().then((options) => {
            this.setState({
                indexDocuments: options,
            })
        })
    }

    render() {
        return <AddCategoryForm {...this.props} {...this.state} />
    }
}

const AddCategoryFormContainer = compose(
    withRouter,
    connect(
        (state) => {
            return {}
        },
        (dispatch) => {
            return bindActionCreators(
                {
                    fetchParentCategorySelectOptions: actions.fetchParentCategorySelectOptions,
                    fetchIndexDocumentsSelectOptions: actions.fetchIndexDocumentsSelectOptions,
                    addCategory: actions.addCategory,
                },
                dispatch,
            )
        },
    ),
    reduxForm({
        form: FORM_NAME,
        onSubmit: (values, dispatch, { addCategory, navigate }) => {
            return addCategory(values).then(
                () => {
                    navigate('/cms/pages')
                },
                (response) => {
                    throw new SubmissionError(processAPIerrorResponseToFormErrors(response))
                },
            )
        },
        enableReinitialize: true,
        destroyOnUnmount: false,
    }),
)(AddCategoryFormContainerBase)

export { AddCategoryFormContainer }
export default { AddCategoryFormContainer }
