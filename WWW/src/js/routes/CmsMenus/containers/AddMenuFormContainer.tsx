import * as React from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { AddMenuForm } from '../components/AddMenu/AddMenuForm'
import { reduxForm, SubmissionError, formValueSelector } from 'redux-form'
import { processAPIerrorResponseToFormErrors } from '../../../modules/http'
import { withRouter } from '../../../helpers/router'

export const FORM_NAME = 'add-menu-form-container'
const selector = formValueSelector(FORM_NAME)

class AddMenuFormContainerBase extends React.Component<null, null> {
    render() {
        return <AddMenuForm {...this.props} />
    }
}

const AddMenuFormContainer = compose(
    withRouter,
    connect((state) => {
        const formValues = selector(state, 'tree.tree_is_published', 'tree.tree_published_from', 'tree.tree_published_to')
        return {
            formValues,
        }
    }, null),
    reduxForm({
        form: FORM_NAME,
        onSubmit: (values, dispatch, { save, navigate, setIsLoading, newMenuLinks, clearNewMenuLinks }) => {
            return setIsLoading(true).then(() => {
                return save(values, newMenuLinks).then(
                    (data) => {
                        setIsLoading(false)
                        //navigate(`/cms/menus/edit?id=${data.id}`)
                        navigate('/cms/menus/add')
                        clearNewMenuLinks()
                    },
                    (response) => {
                        setIsLoading(false)
                        throw new SubmissionError(processAPIerrorResponseToFormErrors(response))
                    },
                )
            })
        },
        enableReinitialize: true,
        destroyOnUnmount: false,
    }),
)(AddMenuFormContainerBase)

export { AddMenuFormContainer }
export default { AddMenuFormContainer }
