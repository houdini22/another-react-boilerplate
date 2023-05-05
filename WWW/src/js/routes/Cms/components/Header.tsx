import * as React from 'react'
import { Dropdown, PageHeader, Button } from '../../../components'
import { FaHome as HomeIcon } from 'react-icons/fa'

interface HeaderProps {
    currentNodeParents: Array<Object>
    currentNode: Object
    title: string
    actionTitle?: string
    action?: string
}

export class Header extends React.Component<HeaderProps, null> {
    render() {
        const { currentNodeParents, currentNode, title, actionTitle, action, canByPermission } = this.props
        return (
            <PageHeader.Container>
                <PageHeader.Title>{title}</PageHeader.Title>
                <PageHeader.Breadcrumbs>
                    <PageHeader.BreadcrumbsItem href="/">
                        <HomeIcon /> Home
                    </PageHeader.BreadcrumbsItem>
                    <PageHeader.BreadcrumbsItem href="/cms/pages">CMS</PageHeader.BreadcrumbsItem>
                    {currentNodeParents.map(({ category: { category_name }, id }) => (
                        <PageHeader.BreadcrumbsItem key={`${id}${category_name}`} href={`/cms/pages?parent_id=${id}`}>
                            <Dropdown.Container size={'sm'} placement={'right'}>
                                <Dropdown.Trigger component={Button} transparent>
                                    {category_name}
                                </Dropdown.Trigger>
                                <Dropdown.Menu>
                                    <Dropdown.Item href={`/cms/pages?parent_id=${id}`}>Show Items</Dropdown.Item>
                                    {canByPermission('cms.add_category') && (
                                        <Dropdown.Item href={`/cms/pages/add_category?parent_id=${id}`}>
                                            Add Category
                                        </Dropdown.Item>
                                    )}
                                    {canByPermission('cms.add_document') && (
                                        <Dropdown.Item href={`/cms/pages/add_document?parent_id=${id}`}>
                                            Add Document
                                        </Dropdown.Item>
                                    )}
                                    {canByPermission('cms.add_link') && (
                                        <Dropdown.Item href={`/cms/pages/add_link?parent_id=${id}`}>
                                            Add Link
                                        </Dropdown.Item>
                                    )}
                                </Dropdown.Menu>
                            </Dropdown.Container>
                        </PageHeader.BreadcrumbsItem>
                    ))}
                    {!!currentNode?.parent?.category && (
                        <PageHeader.BreadcrumbsItem
                            href={
                                currentNode?.tree_object_type === 'category'
                                    ? `/cms/pages?parent_id=${currentNode.id}`
                                    : undefined
                            }
                        >
                            {currentNode?.tree_object_type === 'category' && (
                                <PageHeader.BreadcrumbsItem href={`/cms/pages?parent_id=${currentNode?.id}`}>
                                    <Dropdown.Container size={'sm'} placement={'right'}>
                                        <Dropdown.Trigger component={Button} transparent>
                                            {
                                                currentNode?.[currentNode?.tree_object_type]?.[
                                                    `${currentNode?.tree_object_type}_name`
                                                ]
                                            }
                                        </Dropdown.Trigger>
                                        <Dropdown.Menu>
                                            <Dropdown.Item href={`/cms/pages?parent_id=${currentNode?.id}`}>
                                                Show Items
                                            </Dropdown.Item>
                                            {canByPermission('cms.add_category') && (
                                                <Dropdown.Item
                                                    href={`/cms/pages/add_category?parent_id=${currentNode?.id}`}
                                                >
                                                    Add Category
                                                </Dropdown.Item>
                                            )}
                                            {canByPermission('cms.add_document') && (
                                                <Dropdown.Item
                                                    href={`/cms/pages/add_document?parent_id=${currentNode?.id}`}
                                                >
                                                    Add Document
                                                </Dropdown.Item>
                                            )}
                                            {canByPermission('cms.add_link') && (
                                                <Dropdown.Item
                                                    href={`/cms/pages/add_link?parent_id=${currentNode?.id}`}
                                                >
                                                    Add Link
                                                </Dropdown.Item>
                                            )}
                                        </Dropdown.Menu>
                                    </Dropdown.Container>
                                </PageHeader.BreadcrumbsItem>
                            )}
                            {currentNode?.tree_object_type !== 'category' && (
                                <>
                                    {
                                        currentNode?.[currentNode?.tree_object_type]?.[
                                            `${currentNode?.tree_object_type}_name`
                                        ]
                                    }
                                </>
                            )}
                        </PageHeader.BreadcrumbsItem>
                    )}
                    {!!action && !!actionTitle && (
                        <PageHeader.BreadcrumbsItem href={`/cms/pages/${action}_category?parent_id=${currentNode.id}`}>
                            {actionTitle}
                        </PageHeader.BreadcrumbsItem>
                    )}
                </PageHeader.Breadcrumbs>
            </PageHeader.Container>
        )
    }
}

export default Header
