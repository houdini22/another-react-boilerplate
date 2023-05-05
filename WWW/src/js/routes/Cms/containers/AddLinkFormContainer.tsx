import * as React from 'react'
import { bindActionCreators, compose } from 'redux'
import { connect } from 'react-redux'
import { AddLinkForm } from '../components/AddLink/AddLinkForm'
import { reduxForm, SubmissionError } from 'redux-form'
import { actions } from '../../../reducers/cms-pages'
import { processAPIerrorResponseToFormErrors } from '../../../modules/http'
import { withRouter } from '../../../helpers/router'

export const FORM_NAME = 'add-link-form-container'

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
    connect(null, (dispatch) => {
        return bindActionCreators(
            {
                fetchParentCategorySelectOptions: actions.fetchParentCategorySelectOptions,
                addLink: actions.addLink,
            },
            dispatch,
        )
    }),
    reduxForm({
        form: FORM_NAME,
        onSubmit: (values, dispatch, { addLink, navigate, currentNode }) => {
            return addLink(values).then(
                () => {
                    navigate(`/cms/pages?parent_id=${currentNode.id}`)
                },
                (response) => {
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
