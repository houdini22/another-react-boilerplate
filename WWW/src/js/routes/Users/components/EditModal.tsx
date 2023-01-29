import * as React from 'react'
import _ from 'lodash'
import { RouteManager } from '../../../containers/RouteManager'
import {
    Alert,
    Badge,
    Button,
    Card,
    Col,
    Dropdown,
    Label,
    LoadingOverlay,
    Modal,
    PageHeader,
    Row,
    Table,
    Tabs,
    Typography,
} from '../../../components'
import { UsersManager } from '../containers/UsersManager'
import { EditIcon } from '../../../components/icons'
import { EditFormContainer } from './EditFormContainer'
import { SubmissionError } from 'redux-form'
import { processAPIerrorResponseToFormErrors } from '../../../modules/http'
import { AddRoleFormContainer } from './AddRoleFormContainer'
import { UserRolesManager } from '../../UserRoles/containers/UserRolesManager'
import { DeleteIcon } from '../../../components/icons'
import { formatDateTime } from '../../../helpers/date-time'
import { UploadAvatarFormContainer } from './UploadAvatarFormContainer'
interface EditModalViewProps {
    visible: boolean
    id: number
    close?(): Function
}

export class EditModalView extends React.Component<EditModalViewProps> {
    state = {
        uploadAvatarFormVisible: false,
    }
    render() {
        const { visible, id, close } = this.props
        const { uploadAvatarFormVisible } = this.state

        return (
            <RouteManager>
                {({ navigate }) => (
                    <Modal.Container color={'danger'} visible={visible}>
                        <UserRolesManager>
                            {({ roles, deletePermission }) => (
                                <UsersManager id={id}>
                                    {({
                                        user,
                                        isLoading,
                                        setIsLoading,
                                        editUser,
                                        fetch,
                                        fetchOne,
                                        addUserRole,
                                        deleteUserRole,
                                        sendActivationEmail,
                                        sendAvatar,
                                        forceLogin,
                                    }) => {
                                        return (
                                            <>
                                                {isLoading && <LoadingOverlay />}
                                                <Modal.Header close={close} closeIcon>
                                                    <EditIcon /> Edit User
                                                </Modal.Header>
                                                <Modal.Body>
                                                    <Card header={<h1>Details</h1>}>
                                                        <Typography.Container>
                                                            <h2>{user.name}</h2>
                                                        </Typography.Container>
                                                        <Typography.Container>
                                                            <h3>{user.email}</h3>
                                                        </Typography.Container>
                                                        <Row>
                                                            <Col xs={6} style={{ marginBottom: 10 }}>
                                                                <strong>Avatar:</strong>
                                                            </Col>
                                                            <Col xs={6} style={{ marginBottom: 10 }}>
                                                                <Button
                                                                    size={'xs'}
                                                                    onClick={() =>
                                                                        this.setState({
                                                                            uploadAvatarFormVisible: true,
                                                                        })
                                                                    }
                                                                >
                                                                    Upload Avatar
                                                                </Button>
                                                                {uploadAvatarFormVisible === true && (
                                                                    <UploadAvatarFormContainer
                                                                        onChange={(e) => {
                                                                            setIsLoading(true)
                                                                            sendAvatar(
                                                                                user,
                                                                                _.get(e?.target?.files, 0),
                                                                            ).then(() => {
                                                                                fetchOne(id).then(() => {
                                                                                    setIsLoading(true)
                                                                                })
                                                                            })
                                                                        }}
                                                                    />
                                                                )}
                                                            </Col>
                                                            <Col xs={6} style={{ marginBottom: 10 }}>
                                                                <strong>Last active at:</strong>
                                                            </Col>
                                                            <Col xs={6} style={{ marginBottom: 10 }}>
                                                                {!!user.last_active
                                                                    ? formatDateTime(user.last_active)
                                                                    : '---'}{' '}
                                                                {!!user.last_active && !!user.token && (
                                                                    <Button
                                                                        size={'xs'}
                                                                        onClick={() => {
                                                                            forceLogin(user).then(() => {
                                                                                Promise.all([
                                                                                    fetch(),
                                                                                    fetchOne(id),
                                                                                ]).then(() => {})
                                                                            })
                                                                        }}
                                                                    >
                                                                        Force Login
                                                                    </Button>
                                                                )}
                                                            </Col>
                                                            <Col xs={6} style={{ marginBottom: 10 }}>
                                                                <strong>Email verified at:</strong>
                                                            </Col>
                                                            <Col xs={6} style={{ marginBottom: 10 }}>
                                                                {user.status === 1 && (
                                                                    <span>
                                                                        {!!user.email_verified_at &&
                                                                            formatDateTime(user.email_verified_at)}
                                                                        {!user.email_verified_at && 'never'}{' '}
                                                                        <Button
                                                                            isLoading={isLoading}
                                                                            size={'xs'}
                                                                            color={'warning'}
                                                                            onClick={() => {
                                                                                setIsLoading(true)

                                                                                sendActivationEmail(user).then(() => {
                                                                                    Promise.all([
                                                                                        fetch(),
                                                                                        fetchOne(id),
                                                                                    ]).then(() => {
                                                                                        setIsLoading(false)
                                                                                    })
                                                                                })
                                                                            }}
                                                                        >
                                                                            Send activation
                                                                        </Button>
                                                                    </span>
                                                                )}
                                                                {user.status === 0 && '---'}
                                                            </Col>
                                                        </Row>
                                                    </Card>
                                                    <Tabs.Container left solid>
                                                        <Tabs.Tab name={'data'}>
                                                            <Tabs.Trigger>Data</Tabs.Trigger>
                                                            <Tabs.Content>
                                                                <EditFormContainer
                                                                    initialValues={user}
                                                                    setIsLoading={setIsLoading}
                                                                    onSubmit={(values, props) => {
                                                                        return editUser({ ...user, ...values }).then(
                                                                            () => {
                                                                                Promise.all([
                                                                                    fetch(),
                                                                                    fetchOne(id),
                                                                                ]).then(() => {})
                                                                            },
                                                                            (response) => {
                                                                                throw new SubmissionError(
                                                                                    processAPIerrorResponseToFormErrors(
                                                                                        response,
                                                                                    ),
                                                                                )
                                                                            },
                                                                        )
                                                                    }}
                                                                />
                                                            </Tabs.Content>
                                                        </Tabs.Tab>
                                                        <Tabs.Tab name={'roles'}>
                                                            <Tabs.Trigger>
                                                                Roles{' '}
                                                                <Badge color={'info'}>{user?.roles?.length}</Badge>
                                                            </Tabs.Trigger>
                                                            <Tabs.Content>
                                                                <Card header={<h1>Add Role</h1>}>
                                                                    <AddRoleFormContainer
                                                                        user={user}
                                                                        roles={roles}
                                                                        onSubmit={({ role }) => {
                                                                            setIsLoading(true)

                                                                            addUserRole(user, { id: role }).then(() => {
                                                                                fetchOne(id).then(() => {
                                                                                    fetch().then(() => {
                                                                                        setIsLoading(false)
                                                                                    })
                                                                                })
                                                                            })
                                                                        }}
                                                                    />
                                                                </Card>
                                                                <Card header={<h1>Roles</h1>}>
                                                                    {user?.roles?.map(
                                                                        ({
                                                                            id: _id,
                                                                            name,
                                                                            guard_name,
                                                                            is_deletable,
                                                                        }) => {
                                                                            return (
                                                                                <Dropdown.Container
                                                                                    size={'sm'}
                                                                                    triggerSize={'lg'}
                                                                                    key={_id}
                                                                                >
                                                                                    <Dropdown.Trigger component={Label}>
                                                                                        {name} - {guard_name}
                                                                                    </Dropdown.Trigger>
                                                                                    <Dropdown.Menu>
                                                                                        {
                                                                                            <Dropdown.Item
                                                                                                color="danger"
                                                                                                onClick={() => {
                                                                                                    setIsLoading(true)

                                                                                                    return deleteUserRole(
                                                                                                        user,
                                                                                                        {
                                                                                                            id: _id,
                                                                                                        },
                                                                                                    ).then(() => {
                                                                                                        Promise.all([
                                                                                                            fetch(),
                                                                                                            fetchOne(
                                                                                                                id,
                                                                                                            ),
                                                                                                        ]).then(() => {
                                                                                                            setIsLoading(
                                                                                                                false,
                                                                                                            )
                                                                                                        })
                                                                                                    })
                                                                                                }}
                                                                                            >
                                                                                                <DeleteIcon /> Delete
                                                                                                from User
                                                                                            </Dropdown.Item>
                                                                                        }
                                                                                    </Dropdown.Menu>
                                                                                </Dropdown.Container>
                                                                            )
                                                                        },
                                                                    )}
                                                                </Card>
                                                                <Card header={<h1>Permissions</h1>}>
                                                                    {user?.roles?.map(({ permissions }) => {
                                                                        return (
                                                                            <>
                                                                                {permissions?.map(
                                                                                    ({
                                                                                        id: _id,
                                                                                        name,
                                                                                        guard_name,
                                                                                        is_deletable: _is_deletable,
                                                                                    }) => {
                                                                                        return (
                                                                                            <Dropdown.Container
                                                                                                size={'sm'}
                                                                                                triggerSize={'lg'}
                                                                                                key={_id}
                                                                                            >
                                                                                                <Dropdown.Trigger
                                                                                                    component={Label}
                                                                                                >
                                                                                                    {name} -{' '}
                                                                                                    {guard_name}
                                                                                                </Dropdown.Trigger>
                                                                                                <Dropdown.Menu>
                                                                                                    {_is_deletable ==
                                                                                                        1 && (
                                                                                                        <Dropdown.Item
                                                                                                            color="danger"
                                                                                                            onClick={() => {
                                                                                                                setIsLoading(
                                                                                                                    true,
                                                                                                                )

                                                                                                                return deletePermission(
                                                                                                                    {
                                                                                                                        id: _id,
                                                                                                                    },
                                                                                                                ).then(
                                                                                                                    () => {
                                                                                                                        Promise.all(
                                                                                                                            [
                                                                                                                                fetch(),
                                                                                                                                fetchOne(
                                                                                                                                    id,
                                                                                                                                ),
                                                                                                                            ],
                                                                                                                        ).then(
                                                                                                                            () => {
                                                                                                                                setIsLoading(
                                                                                                                                    false,
                                                                                                                                )
                                                                                                                            },
                                                                                                                        )
                                                                                                                    },
                                                                                                                )
                                                                                                            }}
                                                                                                        >
                                                                                                            <DeleteIcon />{' '}
                                                                                                            Delete
                                                                                                            Permission
                                                                                                            Permanently
                                                                                                        </Dropdown.Item>
                                                                                                    )}
                                                                                                </Dropdown.Menu>
                                                                                            </Dropdown.Container>
                                                                                        )
                                                                                    },
                                                                                )}
                                                                            </>
                                                                        )
                                                                    })}
                                                                </Card>
                                                            </Tabs.Content>
                                                        </Tabs.Tab>
                                                    </Tabs.Container>
                                                </Modal.Body>
                                                <Modal.Footer></Modal.Footer>
                                            </>
                                        )
                                    }}
                                </UsersManager>
                            )}
                        </UserRolesManager>
                    </Modal.Container>
                )}
            </RouteManager>
        )
    }
}

export default EditModalView
