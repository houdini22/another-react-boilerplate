import * as React from 'react'
import { Field } from 'redux-form'
import { Badge, Card, Col, FormField, LoadingOverlay, Row, Tabs } from '../../../../components'
import { generateUrl, isPublished } from '../../../../helpers/cms'
import { DocumentIcon } from '../../../../components/icons'
import { ButtonSave } from '../../../../components/common/ButtonSave'

class AddDocumentForm extends React.Component {
    render() {
        const {
            handleSubmit,
            categories,
            currentNode,
            change,
            initialValues: {
                tree: { id, tree_url_is_editable, tree_publishing_is_editable },
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
                                <DocumentIcon /> Add Document
                            </h1>
                        }
                        color={'success'}
                    >
                        <form onSubmit={handleSubmit}>
                            <Tabs.Container color={'secondary'}>
                                <Tabs.Tab name="main">
                                    <Tabs.Trigger>Main</Tabs.Trigger>
                                    <Tabs.Content>
                                        {({ changeTab }) => (
                                            <Row>
                                                <Col xs={12} md={6}>
                                                    <div>
                                                        <Field
                                                            name="parent_id"
                                                            label="Parent Category"
                                                            type="select"
                                                            component={FormField}
                                                            options={categories}
                                                        />
                                                        <Field
                                                            name="tree.tree_display_name"
                                                            label="Document Name"
                                                            placeholder={'Display Name'}
                                                            type="text"
                                                            component={FormField}
                                                        />
                                                        {!!tree_url_is_editable && (
                                                            <Field
                                                                name="document.document_url"
                                                                label="URL"
                                                                placeholder={'URL'}
                                                                type="text"
                                                                component={FormField}
                                                            />
                                                        )}
                                                    </div>
                                                </Col>
                                                <Col xs={12} md={6}>
                                                    <div>
                                                        <Card header={<h1>Content</h1>} color={'secondary'}>
                                                            <Field
                                                                name="document.document_name"
                                                                label="Display Name"
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
                                                            <Field
                                                                name="document.document_content"
                                                                label="Content"
                                                                placeholder={'Content'}
                                                                type="textarea"
                                                                component={FormField}
                                                            />
                                                            <Field
                                                                name="document.menu_category_id"
                                                                label="Display Menu"
                                                                placeholder={'Do not display Menu'}
                                                                type="select"
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
                                                                component={FormField}
                                                            />
                                                        </Card>
                                                        {!!tree_publishing_is_editable && (
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
                                                                <Field
                                                                    name="tree.tree_published_to"
                                                                    label="Published to"
                                                                    type="text"
                                                                    component={FormField}
                                                                />
                                                            </Card>
                                                        )}
                                                    </div>
                                                </Col>
                                            </Row>
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

                            <Row>
                                <Col xs={12}>
                                    <ButtonSave />
                                </Col>
                            </Row>
                        </form>
                        {isLoading && <LoadingOverlay />}
                    </Card>
                </Col>
            </Row>
        )
    }
}

export { AddDocumentForm }
export default { AddDocumentForm }
