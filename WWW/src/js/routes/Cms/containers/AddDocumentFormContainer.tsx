import * as React from 'react'
import { bindActionCreators, compose } from 'redux'
import { connect } from 'react-redux'
import { AddDocumentForm } from '../components/AddDocument/AddDocumentForm'
import { reduxForm, SubmissionError } from 'redux-form'
import { actions } from '../../../reducers/cms-pages'
import { processAPIerrorResponseToFormErrors } from '../../../modules/http'
import { withRouter } from '../../../helpers/router'

export const FORM_NAME = 'add-document-form'

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
    connect(null, (dispatch) => {
        return bindActionCreators(
            {
                fetchParentCategorySelectOptions: actions.fetchParentCategorySelectOptions,
                addDocument: actions.addDocument,
            },
            dispatch,
        )
    }),
    reduxForm({
        form: FORM_NAME,
        onSubmit: (values, dispatch, { addDocument, navigate }) => {
            return addDocument(values).then(
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
)(AddDocumentFormContainerBase)

export { AddDocumentFormContainer }
export default { AddDocumentFormContainer }
