import * as React from 'react'
import { Field } from 'redux-form'
import { Button, Card, Col, FormField, Row, Tabs } from '../../../../components'
import { generateUrl } from '../../../../helpers/cms'

class AddCategoryForm extends React.Component {
    render() {
        const { handleSubmit, categories, indexDocuments, change, currentNode } = this.props

        console.log(this.props)

        return (
            <Row>
                <Col xs={12}>
                    <Card header={<h1>Add Category</h1>} color={'primary'}>
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
                                                    name="category.category_name"
                                                    label="Category Name"
                                                    type="text"
                                                    component={FormField}
                                                    onChange={(e, value) => {
                                                        change(
                                                            'category.category_url',
                                                            generateUrl(currentNode.category.category_url, value),
                                                        )
                                                    }}
                                                />
                                                <Field
                                                    name="category.index_document_id"
                                                    label="Index Document"
                                                    type="select"
                                                    component={FormField}
                                                    options={indexDocuments}
                                                    placeholder={'None'}
                                                />
                                                <Field
                                                    name="category.menu_category_id"
                                                    label="Display menu from"
                                                    type="select"
                                                    component={FormField}
                                                    options={categories}
                                                    placeholder={'Do not display menu'}
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
                                                    name="category.category_url"
                                                    label="URL"
                                                    type="text"
                                                    component={FormField}
                                                />

                                                <div>
                                                    <Button color="success" type="submit">
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

export { AddCategoryForm }
export default { AddCategoryForm }
