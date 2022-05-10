import * as React from 'react'
import { Badge, Button, Dropdown, Label, PageHeader } from '../../../components'
import { RouteManager } from '../../../containers/RouteManager'

interface HeaderProps {
    title: String
}

export class Header extends React.Component<HeaderProps> {
    render() {
        const { title } = this.props
        return (
            <PageHeader.Container>
                <PageHeader.Title>{title}</PageHeader.Title>
            </PageHeader.Container>
        )
    }
}

export default Header
