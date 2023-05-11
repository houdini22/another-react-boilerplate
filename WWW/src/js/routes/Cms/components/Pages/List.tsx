import * as React from 'react'
import { Alert, Button, Card, Dropdown, Label, LoadingOverlay, Table, Tooltip, Typography } from '../../../../components'
import {
    AddIcon,
    AlertIcon,
    CategoryIcon,
    DocumentIcon,
    EditIcon,
    LinkIcon,
    OrderingIcon,
    PublishIcon,
    UnpublishIcon,
    UpArrowIcon,
} from '../../../../components/icons'
import { formatDateTime } from '../../../../helpers/date-time'
import styles from '../../../../../assets/scss/routes/cms.scss'
import classNames from 'classnames/bind'
import { ModalConfirm } from '../../../../components/common/ModalConfirm'
import { isPublished } from '../../../../helpers/cms'
import { ModalManager } from '../../../../components/ui/Modal'
import { RouteManager } from '../../../../containers'
import { ButtonDelete } from '../../../../components/common/ButtonDelete'
import { ButtonEdit } from '../../../../components/common/ButtonEdit'
import moment from 'moment'
import config from '../../../../config'

const cx = classNames.bind(styles)

export class List extends React.Component<null, null> {
    render() {
        const { nodes, isLoading, currentNode, setIsLoading, publish, unpublish, deleteNode, canByPermission, setCurrentId, fetch, filters } =
            this.props

        return (
            <RouteManager>
                {({ navigate }) => (
                    <ModalManager>
                        {({ registerModal, openModal, closeModal }) => (
                            <Card
                                color={'primary'}
                                header={<h1>Pages - {currentNode?.category?.category_name}</h1>}
                                headerActions={[
                                    canByPermission(['cms.add_link', 'cms.add_document', 'cms.add_category']) ? (
                                        <Dropdown.Container placement={'right'} key={'add'}>
                                            <Dropdown.Trigger
                                                component={Button}
                                                componentProps={{
                                                    icon: <AddIcon />,
                                                    iconOnly: true,
                                                    color: 'success',
                                                }}
                                            />
                                            <Dropdown.Menu>
                                                {canByPermission('cms.add_category') && (
                                                    <Dropdown.Item
                                                        onClick={() => {
                                                            navigate(`/cms/pages/add_category?parent_id=${currentNode.id}`)
                                                        }}
                                                    >
                                                        <AddIcon /> Category
                                                    </Dropdown.Item>
                                                )}
                                                {canByPermission('cms.add_document') && (
                                                    <Dropdown.Item
                                                        onClick={() => {
                                                            navigate(`/cms/pages/add_document?parent_id=${currentNode.id}`)
                                                        }}
                                                    >
                                                        <AddIcon /> Document
                                                    </Dropdown.Item>
                                                )}
                                                {canByPermission('cms.add_link') && (
                                                    <Dropdown.Item
                                                        onClick={() => {
                                                            navigate(`/cms/pages/add_link?parent_id=${currentNode.id}`)
                                                        }}
                                                    >
                                                        <AddIcon /> Link
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
                                            onClick={() => navigate(`/cms/pages/edit_${currentNode.tree_object_type}?id=${currentNode.id}`)}
                                        />
                                    ) : undefined,
                                ]}
                            >
                                <Table.Container bordered>
                                    <Table.THead>
                                        <Table.Tr>
                                            <Table.Th xs={1}>Type</Table.Th>
                                            <Table.Th xs={11} md={3}>
                                                Name
                                            </Table.Th>
                                            <Table.Th xs={12} md={3}>
                                                URL
                                            </Table.Th>
                                            <Table.Th xs={4} md={2}>
                                                Statuses
                                            </Table.Th>
                                            <Table.Th xs={4} md={1}>
                                                Ordering
                                            </Table.Th>
                                            <Table.Th xs={4} md={2}>
                                                Actions
                                            </Table.Th>
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
                                                    }}
                                                >
                                                    <Button icon={<UpArrowIcon />} block color={'primary'}>
                                                        <span>Up</span>
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
                                                        setIsLoading(true).then(() => {
                                                            deleteNode(node).then(
                                                                () => {
                                                                    fetch(filters).then(() => {
                                                                        setIsLoading(false)
                                                                        closeModal(`tree-delete-${node.id}`)
                                                                    })
                                                                },
                                                                () => {
                                                                    setIsLoading(false)
                                                                    closeModal(`tree-delete-${node.id}`)
                                                                },
                                                            )
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

                                            const incomingPublishing =
                                                moment(node.tree_published_from, config.api.apiDateTimeFormat).subtract(3, 'd').isBefore(moment()) &&
                                                moment(node.tree_published_from, config.api.apiDateTimeFormat).isAfter(moment())

                                            const incomingExpiring = moment(node.tree_published_to, config.api.apiDateTimeFormat)
                                                .subtract(3, 'd')
                                                .isBefore(moment())

                                            return (
                                                <Table.Tr
                                                    onClick={
                                                        node.tree_object_type === 'category'
                                                            ? () => {
                                                                  setCurrentId(node.id).then(() => {
                                                                      navigate(`/cms/pages?parent_id=${node.id}`)
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
                                                    <Table.Td xs={1} md={1} alignCenter className={cx('tree-icon')}>
                                                        <div>
                                                            {node.tree_object_type === 'category' && <CategoryIcon />}
                                                            {node.tree_object_type === 'document' && <DocumentIcon />}
                                                            {node.tree_object_type === 'link' && <LinkIcon />}
                                                        </div>
                                                    </Table.Td>
                                                    <Table.Td xs={11} md={3}>
                                                        <div>
                                                            {node.tree_object_type === 'category' && node?.category?.category_name}
                                                            {node.tree_object_type === 'document' && node?.document?.document_name}
                                                            {node.tree_object_type === 'link' && node?.link?.link_name}
                                                        </div>
                                                    </Table.Td>
                                                    <Table.Td xs={12} md={3}>
                                                        <div>
                                                            {node.tree_object_type === 'category' && (node?.category?.category_url || '---')}
                                                            {node.tree_object_type === 'document' && node?.document?.document_url}
                                                            {node.tree_object_type === 'link' && node?.link?.link_url}
                                                        </div>
                                                    </Table.Td>
                                                    <Table.Td xs={4} md={2} className={cx('tree-icon')}>
                                                        <div>
                                                            {!isPublished(node) && (
                                                                <Tooltip
                                                                    color={'primary'}
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
                                                                    color={'primary'}
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

                                                            {incomingPublishing && (
                                                                <Tooltip
                                                                    color={'primary'}
                                                                    tooltip={<p>Will be published: {node.tree_published_from}</p>}
                                                                >
                                                                    <Label color={'warning'}>
                                                                        <AlertIcon />
                                                                    </Label>
                                                                </Tooltip>
                                                            )}

                                                            {incomingExpiring && (
                                                                <Tooltip
                                                                    color={'primary'}
                                                                    tooltip={<p>Will be not visible: {node.tree_published_to}</p>}
                                                                >
                                                                    <Label color={'danger'}>
                                                                        <AlertIcon />
                                                                    </Label>
                                                                </Tooltip>
                                                            )}
                                                        </div>
                                                    </Table.Td>
                                                    <Table.Td xs={4} md={1}>
                                                        <div>
                                                            <Button
                                                                icon={<OrderingIcon />}
                                                                iconOnly
                                                                style={{
                                                                    cursor: 'move',
                                                                }}
                                                            />
                                                        </div>
                                                    </Table.Td>
                                                    <Table.Td xs={4} md={2}>
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
                                                                canByPermission(['cms.add_link', 'cms.add_document', 'cms.add_category']) && (
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
                                                                                onClick={(e) => {
                                                                                    e.stopPropagation()
                                                                                    navigate(`/cms/pages/add_category?parent_id=${node.id}`)
                                                                                }}
                                                                            >
                                                                                Category
                                                                            </Dropdown.Item>
                                                                            <Dropdown.Item
                                                                                onClick={(e) => {
                                                                                    e.stopPropagation()
                                                                                    navigate(`/cms/pages/add_document?parent_id=${node.id}`)
                                                                                }}
                                                                            >
                                                                                Document
                                                                            </Dropdown.Item>
                                                                            <Dropdown.Item
                                                                                onClick={(e) => {
                                                                                    e.stopPropagation()
                                                                                    navigate(`/cms/pages/add_link?parent_id=${node.id}`)
                                                                                }}
                                                                            >
                                                                                Link
                                                                            </Dropdown.Item>
                                                                        </Dropdown.Menu>
                                                                    </Dropdown.Container>
                                                                )}
                                                            {!!node.tree_is_editable && canByPermission(`cms.edit_${node.tree_object_type}`) && (
                                                                <ButtonEdit href={`/cms/pages/edit_${node.tree_object_type}?id=${node.id}`} />
                                                            )}
                                                            {!!node.tree_is_deletable && canByPermission(`cms.delete_${node.tree_object_type}`) && (
                                                                <ButtonDelete
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
                        )}
                    </ModalManager>
                )}
            </RouteManager>
        )
    }
}

export default List
