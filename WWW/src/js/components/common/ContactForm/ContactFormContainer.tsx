import { reduxForm, formValueSelector, SubmissionError } from 'redux-form'
import { connect } from 'react-redux'
import ContactForm from './ContactForm'
import { bindActionCreators, compose } from 'redux'
import { withRouter } from '../../../helpers/router'
import {
    http,
    processAPIerrorResponseToFormErrors,
} from '../../../modules/http'
import { actions, selectors } from '../../../reducers/contactform'

const onSubmit = (values, dispatch, props) => {
    const {
        reset,
        setContactFormIsLoading,
        setContactFormMessage,
        resetContactFormCaptcha,
    } = props

    setContactFormIsLoading(true)
    setContactFormMessage({
        message: null,
        type: null,
    })

    return http
        .post('/contact', values)
        .then(() => {
            reset()
            setContactFormIsLoading(false)
            setContactFormMessage({
                message: 'Your e-mail was sent.',
                type: 'success',
            })
            resetContactFormCaptcha()
        })
        .catch((response) => {
            setContactFormMessage({
                message: 'Error occurred during form validation error!',
                type: 'danger',
            })
            setContactFormIsLoading(false)
            resetContactFormCaptcha()
            throw new SubmissionError(
                processAPIerrorResponseToFormErrors(response),
            )
        })
}
export const FORM_NAME = 'ContactForm'
const selector = formValueSelector(FORM_NAME)

const ContactFormContainer = compose(
    connect(
        (state) => ({
            isLoading: selectors.getContactFormIsLoading(state),
            message: selectors.getContactFormMessage(state),
            captcha: selectors.getContactFormCaptcha(state),
        }),
        (dispatch) => {
            return bindActionCreators(
                {
                    setContactFormIsLoading: actions.setContactFormIsLoading,
                    setContactFormMessage: actions.setContactFormMessage,
                    resetContactFormCaptcha: actions.resetContactFormCaptcha,
                },
                dispatch,
            )
        },
    ),
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
