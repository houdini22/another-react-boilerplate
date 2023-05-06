import * as React from 'react'
import { bindActionCreators, compose } from 'redux'
import { connect } from 'react-redux'
import { AddCategoryForm } from '../components/AddCategory/AddCategoryForm'
import { reduxForm, SubmissionError, formValueSelector } from 'redux-form'
import { actions } from '../../../reducers/cms-pages'
import { processAPIerrorResponseToFormErrors } from '../../../modules/http'
import { withRouter } from '../../../helpers/router'

export const FORM_NAME = 'add-category-form'
const selector = formValueSelector(FORM_NAME)
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
        this.fetchIndexDocumentsSelectOptions()
    }

    fetchParentCategorySelectOptions() {
        const { fetchParentCategorySelectOptions } = this.props

        return fetchParentCategorySelectOptions().then((options) => {
            this.setState({
                categories: [...options],
            })
        })
    }

    fetchIndexDocumentsSelectOptions() {
        const { fetchIndexDocumentsSelectOptions } = this.props

        return fetchIndexDocumentsSelectOptions().then((options) => {
            this.setState({
                indexDocuments: [...options],
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
            const formValues = selector(
                state,
                'tree.tree_is_published',
                'tree.tree_published_from',
                'tree.tree_published_to',
            )
            return {
                formValues,
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
        onSubmit: (values, dispatch, { save, navigate, setIsLoading }) => {
            setIsLoading(true)
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
)(AddCategoryFormContainerBase)

export { AddCategoryFormContainer }
export default { AddCategoryFormContainer }
