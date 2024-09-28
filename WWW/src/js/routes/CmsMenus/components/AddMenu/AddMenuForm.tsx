import * as React from 'react'
import { Field } from 'redux-form'
import { Badge, Card, Col, FormField, LoadingOverlay, Row, Tabs } from '../../../../components'
import { isPublished } from '../../../../helpers/cms'
import { LinkIcon, MenuIcon } from '../../../../components/icons'
import { ButtonSave } from '../../../../components/common/ButtonSave'
import { AddLinkFormContainer } from '../../containers/AddLinkFormContainer'
import SimpleModelCell from '../../../../components/common/SimpleModelCell'

class AddMenuForm extends React.Component {
    render() {
        const {
            handleSubmit,
            formValues: { tree: formValues },
            isLoading,
            addNewMenuLink,
            newMenuLinks,
            removeNewMenuLink,
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
                                <MenuIcon /> Add Menu
                            </h1>
                        }
                        color={'success'}
                    >
                        <Tabs.Container color={'secondary'}>
                            <Tabs.Tab name="main">
                                <Tabs.Trigger>Main</Tabs.Trigger>
                                <Tabs.Content>
                                    {({ changeTab }) => (
                                        <Row>
                                            <Col xs={12} md={6}>
                                                <form onSubmit={handleSubmit}>
                                                    <div>
                                                        <Field
                                                            name="tree.tree_display_name"
                                                            label="Menu Name"
                                                            placeholder={'Menu Name'}
                                                            type="text"
                                                            component={FormField}
                                                        />
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
                                                        <Card header={<h1>Links</h1>} color={'secondary'}>
                                                            <div>
                                                                {newMenuLinks.map((link) => {
                                                                    return (
                                                                        <SimpleModelCell
                                                                            key={link.link.link_name}
                                                                            outline
                                                                            block
                                                                            color={'primary'}
                                                                            icon={<LinkIcon />}
                                                                            actions={[
                                                                                {
                                                                                    name: 'delete',
                                                                                    onClick: () => {
                                                                                        removeNewMenuLink(link)
                                                                                    },
                                                                                },
                                                                            ]}
                                                                        >
                                                                            <span>{link.link.link_name}</span>
                                                                        </SimpleModelCell>
                                                                    )
                                                                })}
                                                            </div>
                                                        </Card>
                                                        <ButtonSave />
                                                    </div>
                                                </form>
                                            </Col>
                                            <Col xs={12} md={6}>
                                                <div>
                                                    <AddLinkFormContainer
                                                        onSubmit={(values) => {
                                                            addNewMenuLink(values)
                                                        }}
                                                        initialValues={{
                                                            target: null,
                                                            link: {
                                                                link_name: '',
                                                                link_url: '',
                                                                category_id: 0,
                                                                document_id: 0,
                                                                link_target: '_self',
                                                            },
                                                        }}
                                                    />
                                                </div>
                                            </Col>
                                        </Row>
                                    )}
                                </Tabs.Content>
                            </Tabs.Tab>
                        </Tabs.Container>
                        {isLoading && <LoadingOverlay />}
                    </Card>
                </Col>
            </Row>
        )
    }
}

export { AddMenuForm }
export default { AddLinkForm: AddMenuForm }
