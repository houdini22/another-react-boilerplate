import * as React from 'react'
import { Field } from 'redux-form'
import { Badge, Button, Card, Col, FormField, LoadingOverlay, Row, Tabs } from '../../../../components'
import { generateUrl, isPublished } from '../../../../helpers/cms'

class AddCategoryForm extends React.Component {
    render() {
        const {
            handleSubmit,
            categories,
            indexDocuments,
            change,
            currentNode,
            initialValues: {
                tree: { id },
            },
            formValues: { tree: formValues },
            isLoading,
        } = this.props

        return (
            <Row>
                <Col xs={12}>
                    <Card header={<h1>Add Category</h1>} color={'primary'}>
                        <form onSubmit={handleSubmit}>
                            <Tabs.Container color={'secondary'}>
                                <Tabs.Tab name="main">
                                    <Tabs.Trigger>Main</Tabs.Trigger>
                                    <Tabs.Content>
                                        <Field name="tree.id" type="hidden" component={FormField} inputOnly style={{ display: 'none' }} />
                                        <Field name="parent_id" label="Parent Category" type="select" component={FormField} options={categories} />
                                        <Field
                                            name="category.category_name"
                                            label="Category Name"
                                            placeholder={'Category Name'}
                                            type="text"
                                            component={FormField}
                                            onChange={(e, value) => {
                                                change(
                                                    'category.category_url',
                                                    generateUrl(
                                                        id ? currentNode.parent.category.category_url : currentNode.category.category_url,
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
                                                name="category.index_document_id"
                                                label="Index Document"
                                                type="select"
                                                component={FormField}
                                                options={indexDocuments.map(({ id, depth, document: { document_name } }) => {
                                                    return {
                                                        label: ' - '.repeat(depth) + document_name,
                                                        value: id,
                                                    }
                                                })}
                                                placeholder={'None'}
                                            />
                                            <Field
                                                name="category.menu_category_id"
                                                label="Display menu from"
                                                type="select"
                                                component={FormField}
                                                options={[
                                                    {
                                                        label: 'This category',
                                                        value: 'new',
                                                    },
                                                    ...categories,
                                                ]}
                                                placeholder={'Do not display menu'}
                                            />
                                        </Card>
                                        <Card
                                            header={
                                                <h1>
                                                    Publishing{' '}
                                                    <Badge color={isPublished(formValues) ? 'success' : 'warning'}>
                                                        {isPublished(formValues) ? 'Is published' : 'Is not Published'}
                                                    </Badge>
                                                </h1>
                                            }
                                        >
                                            <Field name="tree.tree_is_published" label="Is published?" type="checkbox" component={FormField} />
                                            <Field name="tree.tree_published_from" label="Published from" type="text" component={FormField} />
                                            <Field name="tree.tree_published_to" label="Published to" type="text" component={FormField} />
                                        </Card>
                                        <Field name="category.category_url" label="URL" placeholder={'URL'} type="text" component={FormField} />
                                    </Tabs.Content>
                                </Tabs.Tab>
                                <Tabs.Tab name="meta">
                                    <Tabs.Trigger>Meta</Tabs.Trigger>
                                    <Tabs.Content>
                                        <Field
                                            name="category.category_meta_title"
                                            label="Title"
                                            type="text"
                                            placeholder={'Meta Title'}
                                            component={FormField}
                                        />
                                        <Field
                                            name="category.category_meta_description"
                                            label="Description"
                                            type="textarea"
                                            placeholder={'Meta Description'}
                                            component={FormField}
                                        />
                                        <Field
                                            name="category.category_meta_keywords"
                                            label="Keywords"
                                            type="textarea"
                                            placeholder={'Meta Keywords'}
                                            component={FormField}
                                        />
                                        <Field
                                            name="category.category_meta_robots"
                                            label="Robots"
                                            type="text"
                                            placeholder={'Meta Robots'}
                                            component={FormField}
                                        />
                                    </Tabs.Content>
                                </Tabs.Tab>
                            </Tabs.Container>
                            <div>
                                <Button color="success" type="submit" block>
                                    Save
                                </Button>
                            </div>
                        </form>
                        {isLoading && <LoadingOverlay />}
                    </Card>
                </Col>
            </Row>
        )
    }
}

export { AddCategoryForm }
export default { AddCategoryForm }
