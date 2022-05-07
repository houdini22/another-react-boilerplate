import * as React from 'react'
import { Field } from 'redux-form'
import { Button, Card, Col, FormField, Row, Tabs } from '../../../components'

class AddCategoryForm extends React.Component {
    render() {
        return (
            <Row>
                <Col xs={6}>
                    <Card header={<h1>Form</h1>}>
                        <form>
                            <Tabs.Container>
                                <Tabs.Tab name="main">
                                    <Tabs.Trigger>Main</Tabs.Trigger>
                                    <Tabs.Content>
                                        {({ changeTab }) => (
                                            <>
                                                <Field
                                                    name="tree[parent_id]"
                                                    label="Parent Category"
                                                    type="select"
                                                    component={FormField}
                                                    options={[]}
                                                />
                                                <Field
                                                    name="category[category_name]"
                                                    label="Category Name"
                                                    type="text"
                                                    component={FormField}
                                                />
                                                <Field
                                                    name="category[tree_index_document_id]"
                                                    label="Index Document"
                                                    type="select"
                                                    component={FormField}
                                                    options={[]}
                                                />
                                                <Field
                                                    name="category[tree_menu_category_id]"
                                                    label="Display menu from"
                                                    type="select"
                                                    component={FormField}
                                                    options={[]}
                                                />
                                                <Field
                                                    name="tree[tree_is_published]"
                                                    label="Is published?"
                                                    type="checkbox"
                                                    component={FormField}
                                                />
                                                <Field
                                                    name="tree[tree_published_from]"
                                                    label="Published from"
                                                    type="text"
                                                    component={FormField}
                                                />
                                                <Field
                                                    name="tree[tree_published_to]"
                                                    label="Published to"
                                                    type="text"
                                                    component={FormField}
                                                />
                                                <Field
                                                    name="category[category_url]"
                                                    label="URL"
                                                    type="text"
                                                    component={FormField}
                                                />

                                                <div>
                                                    <Button color="success">
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
