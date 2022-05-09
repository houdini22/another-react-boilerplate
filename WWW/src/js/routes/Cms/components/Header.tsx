import * as React from 'react'
import { Badge, Button, Dropdown, Label, PageHeader } from '../../../components'
import { RouteManager } from '../../../containers/RouteManager'
import { FaFileImage as ImageIcon } from 'react-icons/fa'

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
                            <Dropdown.Container
                                triggerColor={'success'}
                                placement={'right'}
                            >
                                <Dropdown.Trigger component={Button}>
                                    Add
                                </Dropdown.Trigger>
                                <Dropdown.Menu>
                                    <Dropdown.Item
                                        onClick={() => {
                                            navigate('/cms/pages/add_category')
                                        }}
                                    >
                                        Category
                                    </Dropdown.Item>{' '}
                                    <Dropdown.Item
                                        onClick={() => {
                                            navigate('/cms/pages/add_document')
                                        }}
                                    >
                                        Document
                                    </Dropdown.Item>{' '}
                                    <Dropdown.Item
                                        onClick={() => {
                                            navigate('/cms/pages/add_link')
                                        }}
                                    >
                                        Link
                                    </Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown.Container>
                        </PageHeader.Actions>
                    </PageHeader.Container>
                )}
            </RouteManager>
        )
    }
}

export default Header
