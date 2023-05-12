import * as React from 'react'
import { Field } from 'redux-form'
import { Badge, Card, Col, FormField, LoadingOverlay, Row, Tabs } from '../../../../components'
import { isPublished } from '../../../../helpers/cms'
import { LinkIcon } from '../../../../components/icons'
import { ButtonSave } from '../../../../components/common/ButtonSave'

class AddLinkForm extends React.Component {
    render() {
        const {
            handleSubmit,
            categories,
            documents,
            linkCategories,
            formValues: { tree: formValues, target },
            isLoading,
        } = this.props

        const linkTargets = [
            { label: '_self', value: '_self' },
            { label: '_blank', value: '_blank' },
            { label: '_top', value: '_top' },
        ]

        return (
            <Row>
                <Col xs={12}>
                    <Card
                        header={
                            <h1>
                                <LinkIcon /> Add Link
                            </h1>
                        }
                        color={'primary'}
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
                                                            label="Link Name"
                                                            placeholder={'Display Name'}
                                                            type="text"
                                                            component={FormField}
                                                        />
                                                        <Field
                                                            name="target"
                                                            label="URL to"
                                                            type="select"
                                                            placeholder={'--- choose ---'}
                                                            component={FormField}
                                                            options={[
                                                                {
                                                                    label: 'Category',
                                                                    value: 'category',
                                                                },
                                                                {
                                                                    label: 'Document',
                                                                    value: 'document',
                                                                },
                                                                {
                                                                    label: 'Enter URL manually',
                                                                    value: 'manually',
                                                                },
                                                            ]}
                                                        />
                                                        {target === 'manually' && (
                                                            <Field
                                                                name="link.link_url"
                                                                label="URL"
                                                                type="text"
                                                                placeholder={'URL'}
                                                                component={FormField}
                                                            />
                                                        )}
                                                        {target === 'category' && (
                                                            <Field
                                                                name="link.category_id"
                                                                label="URL to Category"
                                                                type="select"
                                                                placeholder={'--- choose ---'}
                                                                component={FormField}
                                                                options={linkCategories}
                                                            />
                                                        )}
                                                        {target === 'document' && (
                                                            <Field
                                                                name="link.document_id"
                                                                label="URL to Document"
                                                                type="select"
                                                                placeholder={'--- choose ---'}
                                                                component={FormField}
                                                                options={documents}
                                                            />
                                                        )}
                                                        <Field
                                                            name="link.link_target"
                                                            label="Target"
                                                            type="select"
                                                            placeholder={'--- choose ---'}
                                                            component={FormField}
                                                            options={linkTargets}
                                                        />
                                                    </div>
                                                </Col>
                                                <Col xs={12} md={6}>
                                                    <div>
                                                        <Card header={<h1>Content</h1>} color={'secondary'}>
                                                            <Field
                                                                name="link.link_name"
                                                                label="Display Name"
                                                                type="text"
                                                                placeholder={'Link Name'}
                                                                component={FormField}
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
                                                            <Field
                                                                name="tree.tree_published_to"
                                                                label="Published to"
                                                                type="text"
                                                                component={FormField}
                                                            />
                                                        </Card>
                                                    </div>
                                                </Col>
                                                <Col xs={12}>
                                                    <ButtonSave />
                                                </Col>
                                            </Row>
                                        )}
                                    </Tabs.Content>
                                </Tabs.Tab>
                            </Tabs.Container>
                        </form>
                        {isLoading && <LoadingOverlay />}
                    </Card>
                </Col>
            </Row>
        )
    }
}

export { AddLinkForm }
export default { AddLinkForm }
