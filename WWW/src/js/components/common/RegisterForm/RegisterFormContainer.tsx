import { reduxForm, formValueSelector, SubmissionError } from 'redux-form'
import { connect } from 'react-redux'
import RegisterForm from './RegisterForm'
import { actions as authActions, selectors as authSelectors } from '../../../reducers/auth'
import { withRouter } from '../../../helpers/router'
import { compose } from 'redux'
const { register } = authActions
import { processAPIerrorResponseToFormErrors } from '../../../modules/http'

const onSubmit = (values, dispatch, props) => {
    return dispatch(register(values)).then(
        () => {
            const { navigate } = props

            navigate(`/login?registered=ok`)
        },
        (response) => {
            throw new SubmissionError(processAPIerrorResponseToFormErrors(response))
        },
    )
}
export const FORM_NAME = 'RegisterForm'
const selector = formValueSelector(FORM_NAME)

const RegisterFormContainer = compose(
    connect((state) => {
        return {
            initialValues: {
                name: '',
                email: '',
                password: '',
                password_confirmation: '',
            },
            isLoading: authSelectors.getIsLoading(state),
        }
    }),
    withRouter,
    reduxForm({
        form: FORM_NAME,
        onSubmit,
    }),
)(RegisterForm)

export { RegisterFormContainer }
export default { LoginFormContainer: RegisterFormContainer }
