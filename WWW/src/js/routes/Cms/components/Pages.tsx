import * as React from 'react'
import { PageContent } from '../../../layouts/PageLayout/components'
import Manager from './Manager'
import { RouteManager } from '../../../containers/RouteManager'
import Header from './Header'
import { Alert, Button, Card, LoadingOverlay, Modal } from '../../../components'
import { Table } from '../../../components'
import { CgArrowsVAlt } from 'react-icons/cg'
import { BsPencil } from 'react-icons/bs'
import { AiFillDelete } from 'react-icons/ai'
import { MdTableRows } from 'react-icons/md'
import { GrDocument } from 'react-icons/gr'
import { AiOutlineLink } from 'react-icons/ai'

export class CmsPagesView extends React.Component {
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
                                            {isLoading && <LoadingOverlay />}
                                        </Card>
                                        <Card header={<h1>Tree</h1>}>
                                            {isLoading && <LoadingOverlay />}
                                            <Table.Container>
                                                <Table.THead>
                                                    <Table.Tr>
                                                        <Table.Th xs={1}>
                                                            Type
                                                        </Table.Th>
                                                        <Table.Th xs={3}>
                                                            Name
                                                        </Table.Th>
                                                        <Table.Th xs={3}>
                                                            URL
                                                        </Table.Th>
                                                        <Table.Th xs={3}>
                                                            Ordering
                                                        </Table.Th>
                                                        <Table.Th xs={2}>
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
                                                            >
                                                                <Alert color="info">
                                                                    No results
                                                                </Alert>
                                                            </Table.Td>
                                                        </Table.Tr>
                                                    )}
                                                    {currentNode.depth > 0 && (
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
                                                                <Button
                                                                    block
                                                                    color={
                                                                        'default'
                                                                    }
                                                                >
                                                                    Up
                                                                </Button>
                                                            </Table.Td>
                                                        </Table.Tr>
                                                    )}
                                                    {nodes.map((node) => {
                                                        return (
                                                            <Table.Tr
                                                                onClick={
                                                                    node.tree_object_type ===
                                                                    'category'
                                                                        ? () => {
                                                                              setCurrentId(
                                                                                  node.id,
                                                                              )
                                                                          }
                                                                        : null
                                                                }
                                                            >
                                                                <Table.Td
                                                                    xs={1}
                                                                    alignCenter
                                                                >
                                                                    {node.tree_object_type ===
                                                                        'category' && (
                                                                        <MdTableRows />
                                                                    )}
                                                                    {node.tree_object_type ===
                                                                        'document' && (
                                                                        <GrDocument />
                                                                    )}
                                                                    {node.tree_object_type ===
                                                                        'link' && (
                                                                        <AiOutlineLink />
                                                                    )}
                                                                </Table.Td>
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
                                                                    <Button
                                                                        icon={
                                                                            <CgArrowsVAlt />
                                                                        }
                                                                        iconOnly
                                                                        style={{
                                                                            cursor: 'move',
                                                                        }}
                                                                    />
                                                                </Table.Td>
                                                                <Table.Td
                                                                    xs={2}
                                                                >
                                                                    {!!node.tree_is_editable && (
                                                                        <Button
                                                                            color="warning"
                                                                            icon={
                                                                                <BsPencil />
                                                                            }
                                                                            iconOnly
                                                                        />
                                                                    )}
                                                                    {!!node.tree_is_deletable && (
                                                                        <Button
                                                                            color="danger"
                                                                            icon={
                                                                                <AiFillDelete />
                                                                            }
                                                                            iconOnly
                                                                            onClick={(
                                                                                e,
                                                                            ) => {
                                                                                e.stopPropagation()
                                                                                this.setState(
                                                                                    {
                                                                                        confirmDeleteVisible:
                                                                                            true,
                                                                                    },
                                                                                )
                                                                            }}
                                                                        />
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
