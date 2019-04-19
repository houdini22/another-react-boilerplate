import { reduxForm, formValueSelector } from 'redux-form'
import { connect } from 'react-redux'
import ContactForm from './ContactForm'
import { withRouter } from 'react-router'
import { compose } from 'redux'
import _ from 'lodash'

const onSubmit = (values, dispatch, props) => {
  const { close } = props
  console.log(values)
  if (_.isFunction(close)) {
    close()
  }
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
    },
  }),
)(ContactForm)

export { ContactFormContainer }
export default { ContactFormContainer }
