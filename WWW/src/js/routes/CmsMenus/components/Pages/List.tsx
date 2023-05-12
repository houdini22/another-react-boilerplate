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
        const { menus, isLoading, setIsLoading, canByPermission, filters, deleteNode, fetchMenus, publish, unpublish } = this.props

        return (
            <RouteManager>
                {({ navigate }) => (
                    <ModalManager>
                        {({ registerModal, openModal, closeModal }) => (
                            <Card color={'primary'} header={<h1>Menus</h1>}>
                                <Table.Container bordered>
                                    <Table.THead>
                                        <Table.Tr>
                                            <Table.Th xs={12} md={5}>
                                                Name
                                            </Table.Th>
                                            <Table.Th xs={6} md={3}>
                                                Statuses
                                            </Table.Th>
                                            <Table.Th xs={6} md={4}>
                                                Actions
                                            </Table.Th>
                                        </Table.Tr>
                                    </Table.THead>
                                    <Table.TBody>
                                        {!menus?.length && (
                                            <Table.Tr>
                                                <Table.Td xs={12} alignCenter>
                                                    <Alert color="warning" alignCenter>
                                                        No results
                                                    </Alert>
                                                </Table.Td>
                                            </Table.Tr>
                                        )}
                                        {menus.map((menu) => {
                                            registerModal(
                                                `tree-delete-${menu.id}`,
                                                <ModalConfirm
                                                    onConfirm={() => {
                                                        setIsLoading(true).then(() => {
                                                            deleteNode(menu).then(
                                                                () => {
                                                                    fetchMenus(filters).then(() => {
                                                                        setIsLoading(false)
                                                                        closeModal(`tree-delete-${menu.id}`)
                                                                    })
                                                                },
                                                                () => {
                                                                    setIsLoading(false)
                                                                    closeModal(`tree-delete-${menu.id}`)
                                                                },
                                                            )
                                                        })
                                                    }}
                                                    onCancel={() => {
                                                        closeModal(`tree-delete-${menu.id}`)
                                                    }}
                                                >
                                                    <p>Do you really want to delete this element?</p>
                                                </ModalConfirm>,
                                            )

                                            return (
                                                <Table.Tr key={menu.id}>
                                                    <Table.Td xs={12} md={5}>
                                                        <div>
                                                            {/*{node.tree_object_type === 'category' && node?.category?.category_name}
                                                            {node.tree_object_type === 'document' && node?.document?.document_name}
                                                            {node.tree_object_type === 'link' && node?.link?.link_name}*/}
                                                            {menu.tree_display_name}
                                                        </div>
                                                    </Table.Td>
                                                    <Table.Td xs={6} md={3}>
                                                        <div>
                                                            {!isPublished(menu) && (
                                                                <Tooltip
                                                                    color={'primary'}
                                                                    tooltip={
                                                                        <Typography.Container>
                                                                            <p>
                                                                                Published from:{' '}
                                                                                {menu.tree_published_from
                                                                                    ? formatDateTime(menu.tree_published_from)
                                                                                    : 'never'}
                                                                            </p>
                                                                            <p>
                                                                                Published to:{' '}
                                                                                {menu.tree_published_to
                                                                                    ? formatDateTime(menu.tree_published_to)
                                                                                    : 'never'}
                                                                            </p>
                                                                            {!menu.tree_is_published && <p>Publishing disabled.</p>}
                                                                        </Typography.Container>
                                                                    }
                                                                    placement={'top'}
                                                                >
                                                                    <UnpublishIcon className={cx('text-danger')} />
                                                                </Tooltip>
                                                            )}
                                                            {isPublished(menu) && (
                                                                <Tooltip
                                                                    color={'primary'}
                                                                    tooltip={
                                                                        <Typography.Container>
                                                                            <p>
                                                                                Published from:{' '}
                                                                                {menu.tree_published_from
                                                                                    ? formatDateTime(menu.tree_published_from)
                                                                                    : 'never'}
                                                                            </p>
                                                                            <p>
                                                                                Published to:{' '}
                                                                                {menu.tree_published_to
                                                                                    ? formatDateTime(menu.tree_published_to)
                                                                                    : 'never'}
                                                                            </p>
                                                                        </Typography.Container>
                                                                    }
                                                                    placement={'top'}
                                                                >
                                                                    <PublishIcon className={cx('text-success')} />
                                                                </Tooltip>
                                                            )}
                                                        </div>
                                                    </Table.Td>
                                                    <Table.Td xs={6} md={4}>
                                                        <div>
                                                            {!!(
                                                                menu.tree_class !== 'system_page' &&
                                                                menu.tree_is_editable &&
                                                                !isPublished(menu) &&
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
                                                                            publish(menu.id).then(() => {
                                                                                setIsLoading(false)
                                                                            })
                                                                        }}
                                                                    />
                                                                </Tooltip>
                                                            )}
                                                            {!!(
                                                                menu.tree_class !== 'system_page' &&
                                                                menu.tree_is_editable &&
                                                                isPublished(menu) &&
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
                                                                            unpublish(menu.id).then(() => {
                                                                                setIsLoading(false)
                                                                            })
                                                                        }}
                                                                    />
                                                                </Tooltip>
                                                            )}

                                                            {!!menu.tree_is_editable &&
                                                                menu.tree_object_type === 'category' &&
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
                                                                                    navigate(`/cms/pages/add_category?parent_id=${menu.id}`)
                                                                                }}
                                                                            >
                                                                                Category
                                                                            </Dropdown.Item>
                                                                            <Dropdown.Item
                                                                                onClick={(e) => {
                                                                                    e.stopPropagation()
                                                                                    navigate(`/cms/pages/add_document?parent_id=${menu.id}`)
                                                                                }}
                                                                            >
                                                                                Document
                                                                            </Dropdown.Item>
                                                                            <Dropdown.Item
                                                                                onClick={(e) => {
                                                                                    e.stopPropagation()
                                                                                    navigate(`/cms/pages/add_link?parent_id=${menu.id}`)
                                                                                }}
                                                                            >
                                                                                Link
                                                                            </Dropdown.Item>
                                                                        </Dropdown.Menu>
                                                                    </Dropdown.Container>
                                                                )}
                                                            {!!menu.tree_is_editable && canByPermission(`cms.edit_${menu.tree_object_type}`) && (
                                                                <ButtonEdit href={`/cms/pages/edit_${menu.tree_object_type}?id=${menu.id}`} />
                                                            )}
                                                            {!!menu.tree_is_deletable && (
                                                                <ButtonDelete
                                                                    onClick={(e) => {
                                                                        e.stopPropagation()
                                                                        openModal(`tree-delete-${menu.id}`)
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
