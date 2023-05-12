import * as React from 'react'
import { Field } from 'redux-form'
import { FormField } from '../../../../components'
import { ButtonSave } from '../../../../components/common/ButtonSave'

class EditForm extends React.Component<null, null> {
    render() {
        const { handleSubmit } = this.props
        return (
            <form onSubmit={handleSubmit}>
                <Field name="title" label="Title" type="text" placeholder={'Meta Title'} component={FormField} />
                <Field name="description" label="Description" type="textarea" placeholder={'Meta Description'} component={FormField} />
                <Field name="robots" label="Keywords" type="textarea" placeholder={'Meta Keywords'} component={FormField} />
                <Field name="robots" label="Robots" type="text" placeholder={'Meta Robots'} component={FormField} />
                <ButtonSave />
            </form>
        )
    }
}

export { EditForm }
export default { EditForm }
