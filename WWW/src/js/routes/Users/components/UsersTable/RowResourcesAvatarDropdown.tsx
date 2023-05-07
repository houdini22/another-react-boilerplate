import * as React from 'react'
import { Button, Dropdown, Popover } from '../../../../components'
import { AvatarIcon } from '../../../../components/icons'
import { apiURL } from '../../../../helpers/api'
import { DeleteUserAvatar, SetIsLoading, User } from '../../../../../types.d'

interface RowResourcesAvatarDropdownProps {
    user: User
    deleteAvatar: DeleteUserAvatar
    setIsLoading: SetIsLoading
    fetch: () => Promise<void>
}

export class RowResourcesAvatarDropdown extends React.Component<RowResourcesAvatarDropdownProps, null> {
    render() {
        const { user, deleteAvatar, setIsLoading, fetch } = this.props

        return (
            <>
                {!!user?.avatar?.id && (
                    <Popover.Container trigger={'hover'} placement={'left-center'}>
                        <Popover.Trigger color={'info'}>
                            <Dropdown.Container>
                                <Dropdown.Trigger
                                    component={Button}
                                    componentProps={{ iconOnly: true, icon: <AvatarIcon /> }}
                                ></Dropdown.Trigger>
                                <Dropdown.Menu>
                                    <Dropdown.Item
                                        onClick={() => {
                                            setIsLoading(true).then(() => {
                                                deleteAvatar(user).then(() => {
                                                    fetch().then(() => {
                                                        setIsLoading(false)
                                                    })
                                                })
                                            })
                                        }}
                                    >
                                        Delete Avatar
                                    </Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown.Container>
                        </Popover.Trigger>
                        <Popover.Content>
                            <a href={apiURL(`files/preview/${user?.avatar?.id}`)} target={'_blank'}>
                                <img
                                    src={apiURL(`files/preview/${user?.avatar?.id}?width=200&height=200`)}
                                    style={{ maxWidth: 200 }}
                                    alt={''}
                                />
                            </a>
                        </Popover.Content>
                    </Popover.Container>
                )}
            </>
        )
    }
}

export default RowResourcesAvatarDropdown
