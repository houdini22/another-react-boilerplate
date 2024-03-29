import * as React from 'react'
import { bindActionCreators, compose } from 'redux'
import { connect } from 'react-redux'
import { AddDocumentForm } from '../components/AddDocument/AddDocumentForm'
import { reduxForm, SubmissionError, formValueSelector } from 'redux-form'
import { actions } from '../../../reducers/cms-pages'
import { processAPIerrorResponseToFormErrors } from '../../../modules/http'
import { withRouter } from '../../../helpers/router'

export const FORM_NAME = 'add-document-form'
const selector = formValueSelector(FORM_NAME)
class AddDocumentFormContainerBase extends React.Component<null, null> {
    state = {
        categories: [],
    }

    componentDidMount() {
        this.fetchParentCategorySelectOptions()
    }

    fetchParentCategorySelectOptions() {
        const { fetchParentCategorySelectOptions } = this.props

        return fetchParentCategorySelectOptions().then((options) => {
            this.setState({
                categories: options,
            })
        })
    }

    render() {
        return <AddDocumentForm {...this.props} {...this.state} />
    }
}

const AddDocumentFormContainer = compose(
    withRouter,
    connect(
        (state) => {
            const formValues = selector(state, 'tree.tree_is_published', 'tree.tree_published_from', 'tree.tree_published_to')
            return {
                formValues,
            }
        },
        (dispatch) => {
            return bindActionCreators(
                {
                    fetchParentCategorySelectOptions: actions.fetchParentCategorySelectOptions,
                    addDocument: actions.addDocument,
                },
                dispatch,
            )
        },
    ),
    reduxForm({
        form: FORM_NAME,
        onSubmit: (values, dispatch, { save, navigate, setIsLoading }) => {
            return save(values).then(
                ({ data }) => {
                    setIsLoading(false)
                    navigate(`/cms/pages?parent_id=${data.parent_id}`)
                },
                (response) => {
                    setIsLoading(false)
                    throw new SubmissionError(processAPIerrorResponseToFormErrors(response))
                },
            )
        },
        enableReinitialize: true,
        destroyOnUnmount: false,
    }),
)(AddDocumentFormContainerBase)

export { AddDocumentFormContainer }
export default { AddDocumentFormContainer }
