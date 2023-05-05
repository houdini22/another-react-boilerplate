import * as React from 'react'
import { Field } from 'redux-form'
import { Button, Card, Col, FormField, Row, Tabs } from '../../../../components'
import { generateUrl } from '../../../../helpers/cms'

class AddDocumentForm extends React.Component {
    render() {
        const {
            handleSubmit,
            categories,
            currentNode,
            change,
            initialValues: {
                tree: { id },
            },
        } = this.props

        return (
            <Row>
                <Col xs={12}>
                    <Card header={<h1>Add Document</h1>} color={'primary'}>
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
                                                    onChange={(e, value) => {
                                                        change(
                                                            'document.document_url',
                                                            generateUrl(
                                                                id
                                                                    ? currentNode.parent.category.category_url
                                                                    : currentNode.category.category_url,
                                                                value,
                                                            ),
                                                        )
                                                    }}
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
                                            </>
                                        )}
                                    </Tabs.Content>
                                </Tabs.Tab>
                                <Tabs.Tab name="meta">
                                    <Tabs.Trigger>Meta</Tabs.Trigger>
                                    <Tabs.Content>
                                        {({ changeTab }) => (
                                            <>
                                                <Field
                                                    name="document.document_meta_title"
                                                    label="Title"
                                                    type="text"
                                                    component={FormField}
                                                />
                                                <Field
                                                    name="document.document_meta_description"
                                                    label="Description"
                                                    type="textarea"
                                                    component={FormField}
                                                />
                                                <Field
                                                    name="document.document_meta_keywords"
                                                    label="Keywords"
                                                    type="textarea"
                                                    component={FormField}
                                                />
                                                <Field
                                                    name="document.document_meta_robots"
                                                    label="Robots"
                                                    type="text"
                                                    component={FormField}
                                                />
                                            </>
                                        )}
                                    </Tabs.Content>
                                </Tabs.Tab>
                            </Tabs.Container>

                            <div>
                                <Button color="success" type="submit" block>
                                    Save
                                </Button>
                            </div>
                        </form>
                    </Card>
                </Col>
            </Row>
        )
    }
}

export { AddDocumentForm }
export default { AddDocumentForm }
