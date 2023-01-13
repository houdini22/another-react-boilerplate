import { reduxForm, formValueSelector, SubmissionError } from 'redux-form'
import { connect } from 'react-redux'
import ContactForm from './ContactForm'
import { compose } from 'redux'
import { withRouter } from '../../../helpers/router'
import {
    http,
    processAPIerrorResponseToFormErrors,
} from '../../../modules/http'

const onSubmit = (values, dispatch, props) => {
    const { resetForm } = props

    return http
        .post('/contact', values)
        .then(() => {
            resetForm()
        })
        .catch((response) => {
            throw new SubmissionError(
                processAPIerrorResponseToFormErrors(response),
            )
        })
}
export const FORM_NAME = 'ContactForm'
const selector = formValueSelector(FORM_NAME)

const ContactFormContainer = compose(
    connect(),
    withRouter,
    reduxForm({
        form: FORM_NAME,
        onSubmit,
        initialValues: {
            email: '',
            message: '',
            captcha: '',
        },
    }),
)(ContactForm)

export { ContactFormContainer }
export default { ContactFormContainer }
