import * as React from 'react'
import { PageHeader } from '../../../components'

interface HeaderProps {
    title: String
}

export class Header extends React.Component<HeaderProps, null> {
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
