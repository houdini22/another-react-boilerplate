import * as React from 'react'
import { bindActionCreators, compose } from 'redux'
import { connect } from 'react-redux'
import { AddCategoryForm } from '../components/AddCategoryForm'
import { reduxForm, SubmissionError } from 'redux-form'
import * as moment from 'moment'
import { formatDateTimeAPI } from '../../../helpers/date-time'
import { actions } from '../../../reducers/cms-pages'
import { processAPIerrorResponseToFormErrors } from '../../../modules/http'
import { withRouter } from '../../../helpers/router'

export const FORM_NAME = 'add-category-form-container'

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
                categories: options,
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
        ({ cmsPages: { currentId } }, props) => {
            return {
                initialValues: {
                    category: {
                        category_name: null,
                        category_url: null,
                        index_document_id: null,
                        menu_category_id: null,
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
            return addCategory(values)
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
)(AddCategoryFormContainerBase)

export { AddCategoryFormContainer }
export default { AddCategoryFormContainer }
