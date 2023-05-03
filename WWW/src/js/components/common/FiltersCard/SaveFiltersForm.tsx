import * as React from 'react'
import { Field } from 'redux-form'
import { FormField } from '../../form/FormField'
import { Col } from '../../ui/Col'
import { Button } from '../../ui/Button'
import { Row } from '../../ui/Row'
import { Alert } from '../../ui/Alert'
import { InfoIcon } from '../../icons'

class SaveFiltersForm extends React.Component<null, null> {
    render() {
        const { handleSubmit, closeModal } = this.props

        return (
            <form onSubmit={handleSubmit}>
                <Alert color={'info'} withIcon={<InfoIcon />}>
                    Filters will be saved only on your local machine.
                </Alert>
                <Field
                    name="list_name"
                    label="Filter List name"
                    type="text"
                    placeholder={'Filter List name'}
                    autoFocus
                    component={FormField}
                />
                <Row>
                    <Col xs={6}>
                        <Button color={'secondary'} onClick={() => closeModal('save-filters')} block>
                            Cancel
                        </Button>
                    </Col>
                    <Col xs={6}>
                        <Button onClick={() => null} block type={'submit'}>
                            Save
                        </Button>
                    </Col>
                </Row>
            </form>
        )
    }
}

export { SaveFiltersForm }
