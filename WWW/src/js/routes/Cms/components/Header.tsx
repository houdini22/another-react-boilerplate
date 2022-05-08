import * as React from 'react'
import { Button, PageHeader } from '../../../components'
import { RouteManager } from '../../../containers/RouteManager'

interface HeaderProps {
    title: String
}

export class Header extends React.Component<HeaderProps> {
    render() {
        const { title } = this.props
        return (
            <RouteManager>
                {({ navigate }) => (
                    <PageHeader.Container>
                        <PageHeader.Title>{title}</PageHeader.Title>
                        <PageHeader.Actions>
                            <Button
                                color="success"
                                onClick={() => {
                                    navigate('/cms/pages/add_category')
                                }}
                            >
                                Add Category
                            </Button>
                            <Button
                                color="success"
                                onClick={() => {
                                    navigate('/cms/pages/add_document')
                                }}
                            >
                                Add Document
                            </Button>
                            <Button
                                color="success"
                                onClick={() => {
                                    navigate('/cms/pages/add_link')
                                }}
                            >
                                Add Link
                            </Button>
                        </PageHeader.Actions>
                    </PageHeader.Container>
                )}
            </RouteManager>
        )
    }
}

export default Header
