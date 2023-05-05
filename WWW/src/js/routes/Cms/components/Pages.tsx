import * as React from 'react'
import { PageContent } from '../../../layouts/PageLayout/components'
import Manager from './Manager'
import { RouteManager } from '../../../containers/RouteManager'
import Header from './Pages/Header'
import { Alert, Button, Card, Dropdown, LoadingOverlay, Modal, Tooltip } from '../../../components'
import { Table } from '../../../components'
import { formatDateTime } from '../../../helpers/date-time'
import classNames from 'classnames/bind'
import styles from '../../../../assets/scss/routes/cms.scss'
import { FiltersFormContainer } from '../containers/FiltersFormContainer'
import {
    OrderingIcon,
    EditIcon,
    DeleteIcon,
    AddIcon,
    CategoryIcon,
    DocumentIcon,
    LinkIcon,
    UnpublishIcon,
    PublishIcon,
    WarningIcon,
} from '../../../components/icons'

const cx = classNames.bind(styles)

export class CmsPagesView extends React.Component {
    state = {
        confirmDeleteVisible: false,
        nodeToDelete: null,
    }

    render() {
        const { confirmDeleteVisible, nodeToDelete } = this.state

        return (
            <RouteManager>
                {({ navigate, query: { parent_id } }) => (
                    <Manager currentId={parent_id}>
                        {({
                            nodes,
                            currentNode,
                            isLoading,
                            isLoaded,
                            fetchError,
                            setCurrentId,
                            publish,
                            unpublish,
                            deleteNode,
                            currentNodeParents,
                        }) => {
                            console.log(nodes, currentNode, isLoaded, isLoading, fetchError, currentNodeParents)

                            return (
                                <PageContent>
                                    <div className={cx('route--cms')}>
                                        <Header currentNodeParents={currentNodeParents} currentNode={currentNode} />

                                        <Modal.Container visible={confirmDeleteVisible} color={'danger'}>
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
                                                <p>Do you really want to delete this element?</p>
                                                <p>All children of this element will be removed.</p>
                                            </Modal.Body>
                                            <Modal.Footer>
                                                <Button
                                                    color={'success'}
                                                    block
                                                    onClick={(e, { setIsLoading }) => {
                                                        setIsLoading(true)
                                                        deleteNode(nodeToDelete).then(() => {
                                                            this.setState(
                                                                {
                                                                    confirmDeleteVisible: false,
                                                                    nodeToDelete: null,
                                                                },
                                                                () => {
                                                                    setIsLoading(false)
                                                                },
                                                            )
                                                        })
                                                    }}
                                                >
                                                    OK
                                                </Button>
                                            </Modal.Footer>
                                        </Modal.Container>
                                        <Card header={<h1>Filters</h1>} withMinimizeIcon>
                                            <FiltersFormContainer />
                                            {isLoading && <LoadingOverlay />}
                                        </Card>
                                        <Card
                                            color={'primary'}
                                            header={<h1>Pages - {currentNode?.category?.category_name}</h1>}
                                            headerActions={[
                                                <Dropdown.Container triggerColor={'success'} placement={'right'}>
                                                    <Dropdown.Trigger
                                                        component={Button}
                                                        componentProps={{
                                                            icon: <AddIcon />,
                                                        }}
                                                    >
                                                        Add
                                                    </Dropdown.Trigger>
                                                    <Dropdown.Menu>
                                                        <Dropdown.Item
                                                            onClick={() => {
                                                                navigate(
                                                                    `/cms/pages/add_category?parent_id=${currentNode.id}`,
                                                                )
                                                            }}
                                                        >
                                                            Category
                                                        </Dropdown.Item>
                                                        <Dropdown.Item
                                                            onClick={() => {
                                                                navigate(
                                                                    `/cms/pages/add_document?parent_id=${currentNode.id}`,
                                                                )
                                                            }}
                                                        >
                                                            Document
                                                        </Dropdown.Item>
                                                        <Dropdown.Item
                                                            onClick={() => {
                                                                navigate(
                                                                    `/cms/pages/add_link?parent_id=${currentNode.id}`,
                                                                )
                                                            }}
                                                        >
                                                            Link
                                                        </Dropdown.Item>
                                                    </Dropdown.Menu>
                                                </Dropdown.Container>,
                                            ]}
                                        >
                                            <Table.Container>
                                                <Table.THead>
                                                    <Table.Tr>
                                                        <Table.Th xs={1}>Type</Table.Th>
                                                        <Table.Th xs={3}>Name</Table.Th>
                                                        <Table.Th xs={3}>URL</Table.Th>
                                                        <Table.Th xs={1}>Statuses</Table.Th>
                                                        <Table.Th xs={1}>Ordering</Table.Th>
                                                        <Table.Th xs={3}>Actions</Table.Th>
                                                    </Table.Tr>
                                                </Table.THead>
                                                <Table.TBody>
                                                    {currentNode.depth > 0 && (
                                                        <Table.Tr>
                                                            <Table.Td
                                                                xs={12}
                                                                alignCenter
                                                                onClick={() => {
                                                                    setCurrentId(currentNode.parent_id)
                                                                }}
                                                            >
                                                                <Button block color={'primary'}>
                                                                    Up
                                                                </Button>
                                                            </Table.Td>
                                                        </Table.Tr>
                                                    )}
                                                    {!nodes.length && (
                                                        <Table.Tr>
                                                            <Table.Td xs={12} alignCenter>
                                                                <Alert color="warning" alignCenter>
                                                                    No results
                                                                </Alert>
                                                            </Table.Td>
                                                        </Table.Tr>
                                                    )}
                                                    {nodes.map((node) => {
                                                        return (
                                                            <Table.Tr
                                                                onClick={
                                                                    node.tree_object_type === 'category'
                                                                        ? () => {
                                                                              navigate(
                                                                                  `/cms/pages?parent_id=${node.id}`,
                                                                              )
                                                                          }
                                                                        : null
                                                                }
                                                                color={
                                                                    node.tree_object_type === 'category'
                                                                        ? 'default'
                                                                        : null
                                                                }
                                                                key={node.id}
                                                            >
                                                                <Table.Td
                                                                    xs={1}
                                                                    alignCenter
                                                                    className={cx('tree-type-icon')}
                                                                >
                                                                    {node.tree_object_type === 'category' && (
                                                                        <CategoryIcon />
                                                                    )}
                                                                    {node.tree_object_type === 'document' && (
                                                                        <DocumentIcon />
                                                                    )}
                                                                    {node.tree_object_type === 'link' && <LinkIcon />}
                                                                </Table.Td>
                                                                <Table.Td xs={3}>
                                                                    {node.tree_object_type === 'category' &&
                                                                        node?.category?.category_name}
                                                                    {node.tree_object_type === 'document' &&
                                                                        node?.document?.document_name}
                                                                    {node.tree_object_type === 'link' &&
                                                                        node?.link?.link_name}
                                                                </Table.Td>
                                                                <Table.Td xs={3}>
                                                                    {node.tree_object_type === 'category' &&
                                                                        (node?.category?.category_url || '---')}
                                                                    {node.tree_object_type === 'document' &&
                                                                        node?.document?.document_url}
                                                                    {node.tree_object_type === 'link' &&
                                                                        node?.link?.link_url}
                                                                </Table.Td>
                                                                <Table.Td xs={1}>
                                                                    {!node.tree_is_published && (
                                                                        <Tooltip
                                                                            tooltip={
                                                                                <>
                                                                                    <p>
                                                                                        Published from:{' '}
                                                                                        {node.tree_published_from
                                                                                            ? formatDateTime(
                                                                                                  node.tree_published_from,
                                                                                              )
                                                                                            : 'never'}
                                                                                    </p>
                                                                                    <p>
                                                                                        Published to:{' '}
                                                                                        {node.tree_published_to
                                                                                            ? formatDateTime(
                                                                                                  node.tree_published_to,
                                                                                              )
                                                                                            : 'never'}
                                                                                    </p>
                                                                                </>
                                                                            }
                                                                            placement={'top'}
                                                                        >
                                                                            <UnpublishIcon
                                                                                className={cx('text-danger')}
                                                                            />
                                                                        </Tooltip>
                                                                    )}
                                                                    {!!node.tree_is_published && (
                                                                        <Tooltip
                                                                            tooltip={
                                                                                <>
                                                                                    <p>
                                                                                        Published from:{' '}
                                                                                        {node.tree_published_from
                                                                                            ? formatDateTime(
                                                                                                  node.tree_published_from,
                                                                                              )
                                                                                            : 'never'}
                                                                                    </p>
                                                                                    <p>
                                                                                        Published to:{' '}
                                                                                        {node.tree_published_to
                                                                                            ? formatDateTime(
                                                                                                  node.tree_published_to,
                                                                                              )
                                                                                            : 'never'}
                                                                                    </p>
                                                                                </>
                                                                            }
                                                                            placement={'top'}
                                                                        >
                                                                            <PublishIcon
                                                                                className={cx('text-success')}
                                                                            />
                                                                        </Tooltip>
                                                                    )}
                                                                </Table.Td>
                                                                <Table.Td xs={1}>
                                                                    <Button
                                                                        icon={<OrderingIcon />}
                                                                        iconOnly
                                                                        style={{
                                                                            cursor: 'move',
                                                                        }}
                                                                    />
                                                                </Table.Td>
                                                                <Table.Td xs={3}>
                                                                    <div>
                                                                        {!!(
                                                                            node.tree_class !== 'system_page' &&
                                                                            node.tree_is_editable &&
                                                                            !node.tree_is_published
                                                                        ) && (
                                                                            <Button
                                                                                color="success"
                                                                                icon={<PublishIcon />}
                                                                                iconOnly
                                                                                onClick={(e, { setIsLoading }) => {
                                                                                    e.stopPropagation()
                                                                                    setIsLoading(true)
                                                                                    publish(node.id).then(() => {
                                                                                        setIsLoading(false)
                                                                                    })
                                                                                }}
                                                                            />
                                                                        )}
                                                                        {!!(
                                                                            node.tree_class !== 'system_page' &&
                                                                            node.tree_is_editable &&
                                                                            !!node.tree_is_published
                                                                        ) && (
                                                                            <Button
                                                                                color="danger"
                                                                                icon={<UnpublishIcon />}
                                                                                iconOnly
                                                                                onClick={(e, { setIsLoading }) => {
                                                                                    e.stopPropagation()
                                                                                    setIsLoading(true)
                                                                                    unpublish(node.id).then(() => {
                                                                                        setIsLoading(false)
                                                                                    })
                                                                                }}
                                                                            />
                                                                        )}

                                                                        {!!node.tree_is_editable &&
                                                                            node.tree_object_type === 'category' && (
                                                                                <Dropdown.Container
                                                                                    triggerColor={'success'}
                                                                                    placement={'right'}
                                                                                >
                                                                                    <Dropdown.Trigger
                                                                                        component={Button}
                                                                                        componentProps={{
                                                                                            icon: <AddIcon />,
                                                                                            iconOnly: true,
                                                                                        }}
                                                                                    />
                                                                                    <Dropdown.Menu>
                                                                                        <Dropdown.Item
                                                                                            onClick={() => {
                                                                                                navigate(
                                                                                                    `/cms/pages/add_category?parent_id=${node.id}`,
                                                                                                )
                                                                                            }}
                                                                                        >
                                                                                            Category
                                                                                        </Dropdown.Item>
                                                                                        <Dropdown.Item
                                                                                            onClick={() => {
                                                                                                navigate(
                                                                                                    `/cms/pages/add_document?parent_id=${node.id}`,
                                                                                                )
                                                                                            }}
                                                                                        >
                                                                                            Document
                                                                                        </Dropdown.Item>
                                                                                        <Dropdown.Item
                                                                                            onClick={() => {
                                                                                                navigate(
                                                                                                    `/cms/pages/add_link?parent_id=${node.id}`,
                                                                                                )
                                                                                            }}
                                                                                        >
                                                                                            Link
                                                                                        </Dropdown.Item>
                                                                                    </Dropdown.Menu>
                                                                                </Dropdown.Container>
                                                                            )}
                                                                        {!!node.tree_is_editable && (
                                                                            <Button
                                                                                color="warning"
                                                                                icon={<EditIcon />}
                                                                                iconOnly
                                                                                onClick={(e) => {
                                                                                    e.stopPropagation()
                                                                                    navigate(
                                                                                        `/cms/pages/edit_category?id=${node.id}`,
                                                                                    )
                                                                                }}
                                                                            />
                                                                        )}
                                                                        {!!node.tree_is_deletable && (
                                                                            <Button
                                                                                color="danger"
                                                                                icon={<DeleteIcon />}
                                                                                iconOnly
                                                                                onClick={(e) => {
                                                                                    e.stopPropagation()
                                                                                    this.setState({
                                                                                        confirmDeleteVisible: true,
                                                                                        nodeToDelete: node,
                                                                                    })
                                                                                }}
                                                                            />
                                                                        )}
                                                                    </div>
                                                                </Table.Td>
                                                            </Table.Tr>
                                                        )
                                                    })}
                                                </Table.TBody>
                                            </Table.Container>
                                            {isLoading && <LoadingOverlay />}
                                        </Card>
                                    </div>
                                </PageContent>
                            )
                        }}
                    </Manager>
                )}
            </RouteManager>
        )
    }
}

export default CmsPagesView
