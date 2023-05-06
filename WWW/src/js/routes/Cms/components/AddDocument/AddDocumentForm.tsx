import * as React from 'react'
import { Field } from 'redux-form'
import { Badge, Button, Card, Col, FormField, Row, Tabs } from '../../../../components'
import { generateUrl, isPublished } from '../../../../helpers/cms'

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
            formValues: { tree: formValues },
        } = this.props

        return (
            <Row>
                <Col xs={12}>
                    <Card header={<h1>Add Document</h1>} color={'primary'}>
                        <form onSubmit={handleSubmit}>
                            <Tabs.Container color={'secondary'}>
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
                                                    placeholder={'Document Name'}
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
                                                <Card header={<h1>Content</h1>}>
                                                    <Field
                                                        name="tree.tree_display_name"
                                                        label="Display Name"
                                                        placeholder={'Display Name'}
                                                        type="text"
                                                        component={FormField}
                                                    />
                                                    <Field
                                                        name="document.document_content"
                                                        label="Content"
                                                        placeholder={'Content'}
                                                        type="textarea"
                                                        component={FormField}
                                                    />
                                                </Card>
                                                <Card
                                                    header={
                                                        <h1>
                                                            Publishing{' '}
                                                            <Badge
                                                                color={isPublished(formValues) ? 'success' : 'warning'}
                                                            >
                                                                {isPublished(formValues)
                                                                    ? 'Is published'
                                                                    : 'Is not Published'}
                                                            </Badge>
                                                        </h1>
                                                    }
                                                >
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
                                                </Card>
                                                <Field
                                                    name="document.document_url"
                                                    label="URL"
                                                    placeholder={'URL'}
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
                                                    placeholder={'Meta Title'}
                                                    component={FormField}
                                                />
                                                <Field
                                                    name="document.document_meta_description"
                                                    label="Description"
                                                    type="textarea"
                                                    placeholder={'Meta Description'}
                                                    component={FormField}
                                                />
                                                <Field
                                                    name="document.document_meta_keywords"
                                                    label="Keywords"
                                                    type="textarea"
                                                    placeholder={'Meta Keywords'}
                                                    component={FormField}
                                                />
                                                <Field
                                                    name="document.document_meta_robots"
                                                    label="Robots"
                                                    type="text"
                                                    placeholder={'Meta Robots'}
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
