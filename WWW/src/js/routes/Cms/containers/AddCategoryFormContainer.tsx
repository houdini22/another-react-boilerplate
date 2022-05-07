import * as React from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { AddCategoryForm } from '../components/AddCategoryForm'
import {
    reduxForm,
    getFormValues as getFormValuesRedux,
    SubmissionError,
} from 'redux-form'

export const FORM_NAME = 'add-category-form-container'

const AddCategoryFormContainer = compose(
    reduxForm((state, props) => {
        return {
            initialValues: {},
            form: FORM_NAME,
            submit: (...args) => {
                console.log(args)
            },
        }
    }),
)(AddCategoryForm)

export { AddCategoryFormContainer }
export default { AddCategoryFormContainer }
