import * as React from 'react'
import { Field } from 'redux-form'
import { Button, Card, Col, FormField, Row, Tabs } from '../../../components'

class AddDocumentForm extends React.Component {
    render() {
        const { handleSubmit, categories } = this.props

        return (
            <Row>
                <Col xs={12}>
                    <Card header={<h1>Form</h1>}>
                        <form onSubmit={handleSubmit}>
                            <Tabs.Container>
                                <Tabs.Tab name="main">
                                    <Tabs.Trigger>Main</Tabs.Trigger>
                                    <Tabs.Content>
                                        {({ changeTab }) => (
                                            <>
                                                <Field
                                                    name="parent_id"
                                                    label="Parent Category"
                                                    type="select"
                                                    component={FormField}
                                                    options={categories}
                                                />
                                                <Field
                                                    name="document.document_name"
                                                    label="Document Name"
                                                    type="text"
                                                    component={FormField}
                                                />
                                                <Field
                                                    name="tree.tree_is_published"
                                                    label="Is published?"
                                                    type="checkbox"
                                                    component={FormField}
                                                />
                                                <Field
                                                    name="tree.tree_published_from"
                                                    label="Published from"
                                                    type="text"
                                                    component={FormField}
                                                />
                                                <Field
                                                    name="tree.tree_published_to"
                                                    label="Published to"
                                                    type="text"
                                                    component={FormField}
                                                />
                                                <Field
                                                    name="document.document_url"
                                                    label="URL"
                                                    type="text"
                                                    component={FormField}
                                                />

                                                <div>
                                                    <Button
                                                        color="success"
                                                        type="submit"
                                                    >
                                                        Save
                                                    </Button>
                                                </div>
                                            </>
                                        )}
                                    </Tabs.Content>
                                </Tabs.Tab>
                            </Tabs.Container>
                        </form>
                    </Card>
                </Col>
            </Row>
        )
    }
}

export { AddDocumentForm }
export default { AddDocumentForm }
