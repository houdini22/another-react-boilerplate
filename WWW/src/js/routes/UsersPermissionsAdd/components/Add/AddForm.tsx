import * as React from 'react'
import { Field } from 'redux-form'
import { Button, FormField } from '../../../../components'

class AddForm extends React.Component<null, null> {
    render() {
        const { handleSubmit, roles } = this.props

        return (
            <form onSubmit={handleSubmit}>
                <Field
                    name="role_id"
                    label="Role"
                    type="select"
                    placeholder={'--- choose ---'}
                    options={roles
                        ?.sort(({ name: labelA }, { name: labelB }) => labelA.localeCompare(labelB))
                        .map(({ id, name }) => {
                            return {
                                label: `${name}`,
                                value: id,
                            }
                        })}
                    component={FormField}
                />
                <Field name="name" label="Name" type="text" component={FormField} autoFocus />
                <Field name="guard_name" label="Guard" type="hidden" inputOnly value={'web'} component={FormField} />
                <Button color="success" type="submit" block>
                    Save
                </Button>
            </form>
        )
    }
}

export { AddForm }
export default { EditForm: AddForm }
