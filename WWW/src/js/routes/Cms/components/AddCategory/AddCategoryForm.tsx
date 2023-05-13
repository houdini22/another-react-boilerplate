import * as React from 'react'
import { Field } from 'redux-form'
import { Badge, Card, Col, FormField, LoadingOverlay, Row, Tabs } from '../../../../components'
import { generateUrl, isPublished } from '../../../../helpers/cms'
import { ButtonSave } from '../../../../components/common/ButtonSave'
import { CategoryIcon } from '../../../../components/icons'

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
            menus,
        } = this.props

        return (
            <Row>
                <Col xs={12}>
                    <Card
                        header={
                            <h1>
                                <CategoryIcon /> Add Category
                            </h1>
                        }
                        color={'success'}
                    >
                        <form onSubmit={handleSubmit}>
                            <Tabs.Container color={'secondary'}>
                                <Tabs.Tab name="main">
                                    <Tabs.Trigger>Main</Tabs.Trigger>
                                    <Tabs.Content>
                                        <Row>
                                            <Col xs={12} md={6}>
                                                <div>
                                                    <Field name="tree.id" type="hidden" component={FormField} inputOnly style={{ display: 'none' }} />
                                                    <Field
                                                        name="parent_id"
                                                        label="Parent Category"
                                                        type="select"
                                                        component={FormField}
                                                        options={categories}
                                                    />
                                                    <Field
                                                        name="tree.tree_display_name"
                                                        label="Category Name"
                                                        placeholder={'Display Name'}
                                                        type="text"
                                                        component={FormField}
                                                    />
                                                    <Field
                                                        name="category.category_url"
                                                        label="URL"
                                                        placeholder={'URL'}
                                                        type="text"
                                                        component={FormField}
                                                    />
                                                </div>
                                            </Col>
                                            <Col xs={12} md={6}>
                                                <div>
                                                    <Card header={<h1>Content</h1>} color={'secondary'}>
                                                        <Field
                                                            name="category.category_name"
                                                            label="Display Name"
                                                            placeholder={'Category Name'}
                                                            type="text"
                                                            component={FormField}
                                                            onChange={(e, value) => {
                                                                change(
                                                                    'category.category_url',
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
                                                                    label: 'Menus',
                                                                    children: menus.map(({ id, tree_display_name }) => {
                                                                        return {
                                                                            value: id,
                                                                            label: tree_display_name,
                                                                        }
                                                                    }),
                                                                },
                                                                {
                                                                    label: 'Display from Category',
                                                                    children: categories,
                                                                },
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
                                                        color={'secondary'}
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
                                                        <Field name="tree.tree_published_to" label="Published to" type="text" component={FormField} />
                                                    </Card>
                                                </div>
                                            </Col>
                                        </Row>
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
                                <ButtonSave />
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
