import * as React from 'react'
import { Field } from 'redux-form'
import { FormField } from '../../../components'

class FiltersForm extends React.Component {
    render() {
        const { handleSubmit } = this.props

        return (
            <form onSubmit={handleSubmit}>
                <Field
                    name="search_in"
                    label="Search in"
                    type="select"
                    component={FormField}
                    options={[
                        {
                            label: 'Current category',
                            value: 'current',
                        },
                        {
                            label: 'Everywhere',
                            value: 'everywhere',
                        },
                    ]}
                />
                <Field
                    name="is_published"
                    label="Is published?"
                    type="select"
                    component={FormField}
                    options={[
                        {
                            label: 'Yes or no',
                            value: '',
                        },
                        {
                            label: 'Yes',
                            value: '1',
                        },
                        {
                            label: 'No',
                            value: '0',
                        },
                    ]}
                />
                <Field name="phrase" label="Search phrase" type="text" component={FormField} />
            </form>
        )
    }
}

export { FiltersForm }
export default { FiltersForm }
