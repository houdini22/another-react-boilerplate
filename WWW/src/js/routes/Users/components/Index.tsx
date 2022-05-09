import * as React from 'react'
import { PageContent } from '../../../layouts/PageLayout/components'
import { RouteManager } from '../../../containers/RouteManager'
import {
    Alert,
    Button,
    Card,
    Dropdown,
    LoadingOverlay,
    Modal,
    PageHeader,
} from '../../../components'
import { Table } from '../../../components'

export class UsersView extends React.Component {
    state = {
        confirmDeleteVisible: false,
    }

    render() {
        const { confirmDeleteVisible } = this.state

        return (
            <RouteManager>
                {({ navigate }) => (
                    <PageContent>
                        <Modal.Container
                            visible={confirmDeleteVisible}
                            color={'danger'}
                        >
                            <Modal.Header
                                closeIcon
                                close={() => {
                                    this.setState({
                                        confirmDeleteVisible: false,
                                    })
                                }}
                            >
                                Confirm Delete
                            </Modal.Header>
                            <Modal.Body>
                                <p>
                                    Do you really want to delete this element?
                                </p>
                                <p>
                                    All children of this element will be
                                    removed.
                                </p>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button color={'success'} block>
                                    OK
                                </Button>
                            </Modal.Footer>
                        </Modal.Container>
                        <PageHeader.Container>
                            <PageHeader.Title>Users</PageHeader.Title>
                            <PageHeader.Actions>
                                <Button color={'success'}>Add</Button>
                            </PageHeader.Actions>
                        </PageHeader.Container>
                    </PageContent>
                )}
            </RouteManager>
        )
    }
}

export default UsersView
