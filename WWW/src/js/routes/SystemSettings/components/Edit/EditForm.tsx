import * as React from 'react'
import { Field } from 'redux-form'
import { FormField, Progress } from '../../../../components'
import { ButtonSave } from '../../../../components/common/ButtonSave'

class EditForm extends React.Component<null, null> {
    render() {
        const { handleSubmit, onChangeLogo, uploadProgress, initialValues } = this.props
        console.log(initialValues['app:users:allow_register'])
        return (
            <form onSubmit={handleSubmit}>
                <Field name="app:name" label="Application Name" type="text" placeholder={'Application Name'} component={FormField} />
                <Field name={'app_logo'} type="hidden" component={FormField} inputOnly />
                <Field
                    name={'logo'}
                    label="Application Logo"
                    type="file"
                    placeholder={'Application Logo'}
                    component={FormField}
                    onChange={(e) => onChangeLogo(e)}
                    htmlAfter={() => <Progress progress={uploadProgress} />}
                />
                <Field
                    component={FormField}
                    name={'app:users:allow_register'}
                    type={'checkbox'}
                    label={'Allows User Registration'}
                    value={'1'}
                    checked={initialValues['app:users:allow_register']}
                />
                <Field
                    component={FormField}
                    name={'app:users:allow_login'}
                    type={'checkbox'}
                    label={'Allows User Login'}
                    value={'1'}
                    checked={initialValues['app:users:allow_login']}
                />
                <ButtonSave />
            </form>
        )
    }
}

export { EditForm }
export default { EditForm }
