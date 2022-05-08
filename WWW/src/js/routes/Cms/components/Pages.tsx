import * as React from 'react'
import { PageContent } from '../../../layouts/PageLayout/components'
import Manager from './Manager'
import { RouteManager } from '../../../containers/RouteManager'
import Header from './Header'
import { Alert, Button, Card } from '../../../components'
import { Table } from '../../../components'

export class CmsPagesView extends React.Component {
    render() {
        return (
            <RouteManager>
                {({ navigate }) => (
                    <PageContent>
                        <Header title="CMS Pages" />
                        <Manager>
                            {({
                                nodes,
                                currentNode,
                                isLoading,
                                isLoaded,
                                fetchError,
                                setCurrentId,
                            }) => {
                                console.log(
                                    nodes,
                                    currentNode,
                                    isLoaded,
                                    isLoading,
                                    fetchError,
                                )

                                return (
                                    <>
                                        <Card header={<h1>Filters</h1>}>
                                            Here will be filters
                                        </Card>
                                        <Card header={<h1>Tree</h1>}>
                                            <Table.Container>
                                                <Table.THead>
                                                    <Table.Tr>
                                                        <Table.Th xs={3}>
                                                            Name
                                                        </Table.Th>
                                                        <Table.Th xs={3}>
                                                            URL
                                                        </Table.Th>
                                                        <Table.Th xs={3}>
                                                            Ordering
                                                        </Table.Th>
                                                        <Table.Th xs={3}>
                                                            Actions
                                                        </Table.Th>
                                                    </Table.Tr>
                                                </Table.THead>
                                                <Table.TBody>
                                                    {!nodes.length && (
                                                        <Table.Tr>
                                                            <Table.Td
                                                                xs={12}
                                                                alignCenter
                                                                onClick={() => {
                                                                    setCurrentId(
                                                                        currentNode.parent_id,
                                                                    )
                                                                }}
                                                            >
                                                                Up
                                                            </Table.Td>
                                                            <Table.Td
                                                                xs={12}
                                                                alignCenter
                                                            >
                                                                <Alert color="info">
                                                                    No results
                                                                </Alert>
                                                            </Table.Td>
                                                        </Table.Tr>
                                                    )}
                                                    {nodes.map((node) => {
                                                        return (
                                                            <Table.Tr
                                                                onClick={() => {
                                                                    setCurrentId(
                                                                        node.id,
                                                                    )
                                                                }}
                                                            >
                                                                <Table.Td
                                                                    xs={3}
                                                                >
                                                                    {node.tree_object_type ===
                                                                        'category' &&
                                                                        node
                                                                            .category
                                                                            .category_name}
                                                                    {node.tree_object_type ===
                                                                        'document' &&
                                                                        node
                                                                            .document
                                                                            .document_name}
                                                                    {node.tree_object_type ===
                                                                        'link' &&
                                                                        node
                                                                            .link
                                                                            .link_name}
                                                                </Table.Td>
                                                                <Table.Td
                                                                    xs={3}
                                                                >
                                                                    {node.tree_object_type ===
                                                                        'category' &&
                                                                        (node
                                                                            .category
                                                                            .category_url ||
                                                                            '---')}
                                                                    {node.tree_object_type ===
                                                                        'document' &&
                                                                        node
                                                                            .document
                                                                            .document_url}
                                                                    {node.tree_object_type ===
                                                                        'link' &&
                                                                        node
                                                                            .link
                                                                            .link_url}
                                                                </Table.Td>
                                                                <Table.Td
                                                                    xs={3}
                                                                >
                                                                    up down
                                                                </Table.Td>
                                                                <Table.Td
                                                                    xs={3}
                                                                >
                                                                    {node.is_editable && (
                                                                        <Button>
                                                                            Edit
                                                                        </Button>
                                                                    )}
                                                                    {node.is_deletable && (
                                                                        <Button color="danger">
                                                                            Delete
                                                                        </Button>
                                                                    )}
                                                                </Table.Td>
                                                            </Table.Tr>
                                                        )
                                                    })}
                                                </Table.TBody>
                                            </Table.Container>
                                        </Card>
                                    </>
                                )
                            }}
                        </Manager>
                    </PageContent>
                )}
            </RouteManager>
        )
    }
}

export default CmsPagesView
