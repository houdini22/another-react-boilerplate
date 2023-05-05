import * as React from 'react'
import { Field } from 'redux-form'
import { Button, Card, Col, FormField, Row, Tabs } from '../../../../components'

class AddLinkForm extends React.Component {
    render() {
        const { handleSubmit, categories } = this.props

        const linkTargets = [
            { label: '_self', value: '_self' },
            { label: '_blank', value: '_blank' },
            { label: '_top', value: '_top' },
        ]

        return (
            <Row>
                <Col xs={12}>
                    <Card header={<h1>Add Link</h1>} color={'primary'}>
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
                                                    name="link.link_name"
                                                    label="Link Name"
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
                                                    name="link.link_url"
                                                    label="URL"
                                                    type="text"
                                                    component={FormField}
                                                />
                                                <Field
                                                    name="link.link_target"
                                                    label="Target"
                                                    type="select"
                                                    placeholder={'--- choose ---'}
                                                    component={FormField}
                                                    options={linkTargets}
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

export { AddLinkForm }
export default { AddLinkForm }
