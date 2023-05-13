import * as React from 'react'
import { Alert, Button, Card, LoadingOverlay, Table, Tooltip, Typography } from '../../../../components'
import { LinkIcon, PermissionIcon, PublishIcon, UnpublishIcon } from '../../../../components/icons'
import { formatDateTime } from '../../../../helpers/date-time'
import styles from '../../../../../assets/scss/routes/cms.scss'
import classNames from 'classnames/bind'
import { ModalConfirm } from '../../../../components/common/ModalConfirm'
import { isPublished } from '../../../../helpers/cms'
import { ModalManager } from '../../../../components/ui/Modal'
import { RouteManager } from '../../../../containers'
import { ButtonDelete } from '../../../../components/common/ButtonDelete'
import { ButtonEdit } from '../../../../components/common/ButtonEdit'
import SimpleModelCell from '../../../../components/common/SimpleModelCell'
import ModalDeleteUserRole from '../../../../components/common/ModalDeleteUserRole'
import ModalDeleteMenuLink from '../../../../components/common/ModalDeleteMenuLink'

const cx = classNames.bind(styles)

export class RowLinks extends React.Component<null, null> {
    render() {
        const { links, setIsLoading, fetchMenus, deleteNode, menu } = this.props

        return (
            <RouteManager>
                {({ navigate }) => (
                    <ModalManager>
                        {({ registerModal, openModal, closeModal }) => (
                            <Table.Tr>
                                <Table.Td xs={12}>
                                    <div>
                                        {links.map((link) => {
                                            registerModal(
                                                `menu-remove-link-${link.id}-delete`,
                                                <ModalDeleteMenuLink
                                                    setIsLoading={setIsLoading}
                                                    closeModal={() => closeModal(`menu-remove-link-${link.id}-delete`)}
                                                    deleteNode={deleteNode}
                                                    fetchMenus={fetchMenus}
                                                    menu={menu}
                                                    link={link}
                                                />,
                                            )

                                            return (
                                                <SimpleModelCell
                                                    block
                                                    color={'primary'}
                                                    outline
                                                    size={'lg'}
                                                    actions={[
                                                        {
                                                            name: 'edit',
                                                            onClick: () => {
                                                                navigate(`/cms/menus/edit?id=${menu.id}`)
                                                            },
                                                        },
                                                        {
                                                            name: 'delete',
                                                            onClick: () => {
                                                                openModal(`menu-remove-link-${link.id}-delete`)
                                                            },
                                                        },
                                                    ]}
                                                >
                                                    <span>
                                                        <LinkIcon /> {link.link.link_name}
                                                    </span>
                                                </SimpleModelCell>
                                            )
                                        })}
                                    </div>
                                </Table.Td>
                            </Table.Tr>
                        )}
                    </ModalManager>
                )}
            </RouteManager>
        )
    }
}

export default RowLinks
