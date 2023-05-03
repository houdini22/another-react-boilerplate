import { reduxForm } from 'redux-form'
import { NotificationsForm } from './NotificationsForm'
import { compose } from 'redux'
import { actions } from '../../../reducers/notifications'

const onSubmit = (values, dispatch) => {
    dispatch(
        actions.addNotification({
            type: values['type'],
            text: values['text'],
            href: values['href'],
            title: values['title'],
        }),
    )
}
export const FORM_NAME = 'NotificationsForm'

const NotificationsFormContainer = compose(
    reduxForm({
        form: FORM_NAME,
        onSubmit,
        initialValues: {
            type: 'info',
            text: 'Text',
            href: '/href',
            title: 'Title',
        },
    }),
)(NotificationsForm)

export { NotificationsFormContainer }
export default { NotificationsFormContainer }
