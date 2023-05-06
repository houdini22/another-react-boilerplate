import * as React from 'react'
import { Alert, Button, Card, Dropdown, LoadingOverlay, Table, Tooltip, Typography } from '../../../../components'
import {
    AddIcon,
    CategoryIcon,
    DeleteIcon,
    DocumentIcon,
    EditIcon,
    LinkIcon,
    OrderingIcon,
    PublishIcon,
    UnpublishIcon,
} from '../../../../components/icons'
import { formatDateTime } from '../../../../helpers/date-time'
import styles from '../../../../../assets/scss/routes/cms.scss'
import classNames from 'classnames/bind'
import { ModalConfirm } from '../../../../components/common/ModalConfirm'
import { isPublished } from '../../../../helpers/cms'

const cx = classNames.bind(styles)

export class List extends React.Component<null, null> {
    render() {
        const {
            nodes,
            isLoading,
            currentNode,
            setIsLoading,
            publish,
            unpublish,
            deleteNode,
            navigate,
            registerModal,
            openModal,
            closeModal,
            canByPermission,
            setCurrentId,
            fetch,
            filters,
        } = this.props

        return (
            <Card
                color={'primary'}
                header={<h1>Pages - {currentNode?.category?.category_name}</h1>}
                headerActions={[
                    canByPermission(['cms.add_link', 'cms.add_document', 'cms.add_category']) ? (
                        <Dropdown.Container triggerColor={'success'} placement={'right'} key={'add'}>
                            <Dropdown.Trigger
                                component={Button}
                                componentProps={{
                                    icon: <AddIcon />,
                                    iconOnly: true,
                                }}
                            />
                            <Dropdown.Menu>
                                {canByPermission('cms.add_category') && (
                                    <Dropdown.Item
                                        onClick={() => {
                                            navigate(`/cms/pages/add_category?parent_id=${currentNode.id}`)
                                        }}
                                    >
                                        Category
                                    </Dropdown.Item>
                                )}
                                {canByPermission('cms.add_document') && (
                                    <Dropdown.Item
                                        onClick={() => {
                                            navigate(`/cms/pages/add_document?parent_id=${currentNode.id}`)
                                        }}
                                    >
                                        Document
                                    </Dropdown.Item>
                                )}
                                {canByPermission('cms.add_link') && (
                                    <Dropdown.Item
                                        onClick={() => {
                                            navigate(`/cms/pages/add_link?parent_id=${currentNode.id}`)
                                        }}
                                    >
                                        Link
                                    </Dropdown.Item>
                                )}
                            </Dropdown.Menu>
                        </Dropdown.Container>
                    ) : undefined,
                    currentNode.depth > 0 && canByPermission(`cms.edit_category`) ? (
                        <Button
                            icon={<EditIcon />}
                            iconOnly
                            color={'warning'}
                            onClick={() =>
                                navigate(`/cms/pages/edit_${currentNode.tree_object_type}?id=${currentNode.id}`)
                            }
                        />
                    ) : undefined,
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
                                        navigate(`/cms/pages?parent_id=${currentNode.parent_id}`)
                                        /*setCurrentId(currentNode.parent_id).then(() => {
                                            setIsLoading(true)
                                            fetch().then(() => setIsLoading(false));
                                        })*/
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
                            registerModal(
                                `tree-delete-${node.id}`,
                                <ModalConfirm
                                    onConfirm={() => {
                                        setIsLoading(true)
                                        deleteNode(node).then(() => {
                                            fetch().then(() => {
                                                setIsLoading(false)
                                                closeModal(`tree-delete-${node.id}`)
                                            })
                                        })
                                    }}
                                    onCancel={() => {
                                        closeModal(`tree-delete-${node.id}`)
                                    }}
                                >
                                    <p>Do you really want to delete this element?</p>
                                    {!!node.category_id && <p>All children of this element will be removed.</p>}
                                </ModalConfirm>,
                            )

                            return (
                                <Table.Tr
                                    onClick={
                                        node.tree_object_type === 'category'
                                            ? () => {
                                                  setCurrentId(node.id).then(() => {
                                                      navigate(`/cms/pages?parent_id=${node.id}`)
                                                      /*setIsLoading(true)
                                                    fetch().then(() => {
                                                        setIsLoading(false)
                                                    })*/
                                                  })
                                              }
                                            : null
                                    }
                                    color={node.tree_object_type === 'category' ? 'default' : null}
                                    key={node.id}
                                    style={{
                                        paddingLeft: ['everywhere', 'descendants'].includes(filters.search_in)
                                            ? 40 *
                                              (filters.search_in === 'descendants'
                                                  ? node.depth - currentNode.depth - 1
                                                  : node.depth - 1)
                                            : undefined,
                                    }}
                                >
                                    <Table.Td xs={1} alignCenter className={cx('tree-icon')}>
                                        {node.tree_object_type === 'category' && <CategoryIcon />}
                                        {node.tree_object_type === 'document' && <DocumentIcon />}
                                        {node.tree_object_type === 'link' && <LinkIcon />}
                                    </Table.Td>
                                    <Table.Td xs={3}>
                                        {node.tree_object_type === 'category' && node?.category?.category_name}
                                        {node.tree_object_type === 'document' && node?.document?.document_name}
                                        {node.tree_object_type === 'link' && node?.link?.link_name}
                                    </Table.Td>
                                    <Table.Td xs={3}>
                                        {node.tree_object_type === 'category' &&
                                            (node?.category?.category_url || '---')}
                                        {node.tree_object_type === 'document' && node?.document?.document_url}
                                        {node.tree_object_type === 'link' && node?.link?.link_url}
                                    </Table.Td>
                                    <Table.Td xs={1} className={cx('tree-icon')}>
                                        {!isPublished(node) && (
                                            <Tooltip
                                                tooltip={
                                                    <Typography.Container>
                                                        <p>
                                                            Published from:{' '}
                                                            {node.tree_published_from
                                                                ? formatDateTime(node.tree_published_from)
                                                                : 'never'}
                                                        </p>
                                                        <p>
                                                            Published to:{' '}
                                                            {node.tree_published_to
                                                                ? formatDateTime(node.tree_published_to)
                                                                : 'never'}
                                                        </p>
                                                        {!node.tree_is_published && <p>Publishing disabled.</p>}
                                                    </Typography.Container>
                                                }
                                                placement={'top'}
                                            >
                                                <UnpublishIcon className={cx('text-danger')} />
                                            </Tooltip>
                                        )}
                                        {isPublished(node) && (
                                            <Tooltip
                                                tooltip={
                                                    <Typography.Container>
                                                        <p>
                                                            Published from:{' '}
                                                            {node.tree_published_from
                                                                ? formatDateTime(node.tree_published_from)
                                                                : 'never'}
                                                        </p>
                                                        <p>
                                                            Published to:{' '}
                                                            {node.tree_published_to
                                                                ? formatDateTime(node.tree_published_to)
                                                                : 'never'}
                                                        </p>
                                                    </Typography.Container>
                                                }
                                                placement={'top'}
                                            >
                                                <PublishIcon className={cx('text-success')} />
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
                                                !isPublished(node) &&
                                                canByPermission(`cms.publish`)
                                            ) && (
                                                <Tooltip tooltip={'Publish'}>
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
                                                </Tooltip>
                                            )}
                                            {!!(
                                                node.tree_class !== 'system_page' &&
                                                node.tree_is_editable &&
                                                isPublished(node) &&
                                                canByPermission(`cms.unpublish`)
                                            ) && (
                                                <Tooltip tooltip={'Unpublish'}>
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
                                                </Tooltip>
                                            )}

                                            {!!node.tree_is_editable &&
                                                node.tree_object_type === 'category' &&
                                                canByPermission([
                                                    'cms.add_link',
                                                    'cms.add_document',
                                                    'cms.add_category',
                                                ]) && (
                                                    <Dropdown.Container triggerColor={'success'} placement={'right'}>
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
                                                                    navigate(`/cms/pages/add_link?parent_id=${node.id}`)
                                                                }}
                                                            >
                                                                Link
                                                            </Dropdown.Item>
                                                        </Dropdown.Menu>
                                                    </Dropdown.Container>
                                                )}
                                            {!!node.tree_is_editable &&
                                                canByPermission(`cms.edit_${node.tree_object_type}`) && (
                                                    <Button
                                                        color="warning"
                                                        icon={<EditIcon />}
                                                        iconOnly
                                                        onClick={(e) => {
                                                            e.stopPropagation()
                                                            navigate(
                                                                `/cms/pages/edit_${node.tree_object_type}?id=${node.id}`,
                                                            )
                                                        }}
                                                    />
                                                )}
                                            {!!node.tree_is_deletable &&
                                                canByPermission(`cms.delete_${node.tree_object_type}`) && (
                                                    <Button
                                                        color="danger"
                                                        icon={<DeleteIcon />}
                                                        iconOnly
                                                        onClick={(e) => {
                                                            e.stopPropagation()
                                                            openModal(`tree-delete-${node.id}`)
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
        )
    }
}

export default List