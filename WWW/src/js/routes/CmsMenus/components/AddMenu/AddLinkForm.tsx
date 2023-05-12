import * as React from 'react'
import { Field } from 'redux-form'
import { Card, Col, FormField, Row } from '../../../../components'
import { LinkIcon } from '../../../../components/icons'
import { ButtonSave } from '../../../../components/common/ButtonSave'

class AddLinkForm extends React.Component {
    render() {
        const { handleSubmit, target, documents, linkCategories } = this.props

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
                        color={'success'}
                    >
                        <Row>
                            <Col xs={12} md={12}>
                                <form onSubmit={handleSubmit}>
                                    <div>
                                        <Field name="link.link_name" label="Link Name" type="text" component={FormField} />
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
                                            <Field name="link.link_url" label="URL" type="text" placeholder={'URL'} component={FormField} />
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
                                        <Field name="link.link_target" label="Target" type="select" component={FormField} options={linkTargets} />
                                        <ButtonSave />
                                    </div>
                                </form>
                            </Col>
                        </Row>
                    </Card>
                </Col>
            </Row>
        )
    }
}

export { AddLinkForm }
export default { AddLinkForm: AddLinkForm }
