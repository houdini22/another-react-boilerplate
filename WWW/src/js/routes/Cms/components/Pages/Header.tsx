import * as React from 'react'
import { PageHeader } from '../../../../components'
import { FaHome as HomeIcon } from 'react-icons/fa'

interface HeaderProps {
    currentNodeParents: Array<Object>
}

export class Header extends React.Component<HeaderProps, null> {
    render() {
        const { currentNodeParents, currentNode } = this.props
        return (
            <PageHeader.Container>
                <PageHeader.Title>CMS</PageHeader.Title>
                <PageHeader.Breadcrumbs>
                    <PageHeader.BreadcrumbsItem href="/">
                        <HomeIcon /> Home
                    </PageHeader.BreadcrumbsItem>
                    <PageHeader.BreadcrumbsItem href="/cms/pages">CMS</PageHeader.BreadcrumbsItem>
                    {currentNodeParents.map(({ category: { category_name }, id }) => (
                        <PageHeader.BreadcrumbsItem key={`${id}${category_name}`} href={`/cms/pages?parent_id=${id}`}>
                            {category_name}
                        </PageHeader.BreadcrumbsItem>
                    ))}
                    <PageHeader.BreadcrumbsItem href={`/cms/pages?parent_id=${currentNode.id}`}>
                        {currentNode?.category?.category_name}
                    </PageHeader.BreadcrumbsItem>
                </PageHeader.Breadcrumbs>
            </PageHeader.Container>
        )
    }
}

export default Header
