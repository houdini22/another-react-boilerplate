import * as React from 'react'
import { bindActionCreators, compose } from 'redux'
import { connect } from 'react-redux'
import { AddLinkForm } from '../components/AddLink/AddLinkForm'
import { reduxForm, SubmissionError, formValueSelector } from 'redux-form'
import { actions } from '../../../reducers/cms-pages'
import { processAPIerrorResponseToFormErrors } from '../../../modules/http'
import { withRouter } from '../../../helpers/router'

export const FORM_NAME = 'add-link-form-container'
const selector = formValueSelector(FORM_NAME)

class AddLinkFormContainerBase extends React.Component<null, null> {
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
        return <AddLinkForm {...this.props} {...this.state} />
    }
}

const AddLinkFormContainer = compose(
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
                    addLink: actions.addLink,
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
)(AddLinkFormContainerBase)

export { AddLinkFormContainer }
export default { AddLinkFormContainer }
