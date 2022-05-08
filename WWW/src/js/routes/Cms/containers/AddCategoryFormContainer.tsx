import * as React from 'react'
import { bindActionCreators, compose } from 'redux'
import { connect } from 'react-redux'
import { AddCategoryForm } from '../components/AddCategoryForm'
import {
    reduxForm,
    getFormValues as getFormValuesRedux,
    SubmissionError,
} from 'redux-form'
import { getFormValues } from '../../../utils/forms/auto-save'
import * as moment from 'moment'
import { formatDateTimeAPI } from '../../../helpers/date-time'
import { actions } from '../../../reducers/cms-pages'

export const FORM_NAME = 'add-category-form-container'

class AddCategoryFormContainerBase extends React.Component {
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
    connect(
        ({ cmsPages: { currentId } }, props) => {
            return {
                initialValues: {
                    category: {
                        category_name: '',
                        category_url: null,
                        index_document_id: null,
                        menu_category_id: null,
                    },
                    parent_id: currentId,
                    tree: {
                        tree_is_published: true,
                        tree_published_from: formatDateTimeAPI(moment()),
                        tree_published_to: null,
                    },
                },
            }
        },
        (dispatch) => {
            return bindActionCreators(
                {
                    fetchParentCategorySelectOptions:
                        actions.fetchParentCategorySelectOptions,
                    fetchIndexDocumentsSelectOptions:
                        actions.fetchIndexDocumentsSelectOptions,
                    addCategory: actions.addCategory,
                },
                dispatch,
            )
        },
    ),
    reduxForm({
        form: FORM_NAME,
        onSubmit: (values, dispatch, { addCategory }) => {
            return addCategory(values).then(() => {
                console.log('ok')
            })
        },
    }),
)(AddCategoryFormContainerBase)

export { AddCategoryFormContainer }
export default { AddCategoryFormContainer }
