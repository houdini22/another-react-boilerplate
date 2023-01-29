import { reduxForm, formValueSelector } from 'redux-form'
import { connect } from 'react-redux'
import LoginForm from './LoginForm'
import { actions as authActions } from '../../../reducers/auth'
import { withRouter } from '../../../helpers/router'
import { compose } from 'redux'
const { login } = authActions
import { LocalStorage } from '../../../modules/database'

const onSubmit = (values, dispatch, props) => {
    return dispatch(login(values['username'], values['password'])).then(() => {
        const {
            navigate,
            searchParams: { back },
        } = props

        navigate(`${back}`)
    })
}
export const FORM_NAME = 'LoginForm'
const selector = formValueSelector(FORM_NAME)

const LoginFormContainer = compose(
    connect((state) => {
        const { username, password } = selector(state, 'user', 'password')
        return {
            username,
            password,
            initialValues: {
                username: LocalStorage.queryAll('LoginFormContainer', {
                    query: { ID: 1 },
                })[0]['email'],
                password: '',
            },
        }
    }),
    withRouter,
    reduxForm({
        form: FORM_NAME,
        onSubmit,
    }),
)(LoginForm)

export { LoginFormContainer }
export default { LoginFormContainer }
