import * as React from 'react'
import { bindActionCreators, compose } from 'redux'
import { connect } from 'react-redux'
import { AddDocumentForm } from '../components/AddDocumentForm'
import { reduxForm, SubmissionError } from 'redux-form'
import * as moment from 'moment'
import { formatDateTimeAPI } from '../../../helpers/date-time'
import { actions } from '../../../reducers/cms-pages'
import { processAPIerrorResponseToFormErrors } from '../../../modules/http'
import { withRouter } from '../../../helpers/router'

export const FORM_NAME = 'add-document-form-container'

class AddDocumentFormContainerBase extends React.Component {
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
        ({ cmsPages: { currentId } }, props) => {
            return {
                initialValues: {
                    document: {
                        document_name: null,
                        document_url: null,
                        document_meta_title: null,
                        document_meta_keywords: null,
                        document_meta_description: null,
                        document_meta_robots: null,
                    },
                    parent_id: currentId,
                    tree: {
                        tree_is_published: true,
                        tree_published_from: formatDateTimeAPI(moment()),
                        tree_published_to: formatDateTimeAPI(moment(new Date(2099, 12)).format('YYYY')),
                    },
                },
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
        onSubmit: (values, dispatch, { addDocument, navigate }) => {
            return addDocument(values)
                .then(() => {
                    navigate('/cms/pages')
                })
                .catch(
                    ({
                        response: {
                            data: { errors },
                        },
                    }) => {
                        throw new SubmissionError(processAPIerrorResponseToFormErrors(errors))
                    },
                )
        },
    }),
)(AddDocumentFormContainerBase)

export { AddDocumentFormContainer }
export default { AddDocumentFormContainer }
