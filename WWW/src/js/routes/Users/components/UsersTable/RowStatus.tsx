import * as React from 'react'
import { Button, Dropdown, Label, Popover, Typography } from '../../../../components'
import {
    AvatarIcon,
    DeleteIcon,
    DetailsIcon,
    EditIcon,
    FileIcon,
    InfoIcon,
    PermissionIcon,
    RoleIcon,
    UserIcon,
} from '../../../../components/icons'
import { apiURL } from '../../../../helpers/api'

interface FiltersProps {
    user: Object
    activateUser: Function
    deactivateUser: Function
    fetch: Function
}

export class RowStatus extends React.Component<FiltersProps, null> {
    render() {
        const { user, activateUser, deactivateUser, fetch } = this.props

        return (
            <>
                {user.status === 0 && (
                    <Label
                        color={'danger'}
                        onClick={() => {
                            activateUser(user).then(() => {
                                fetch()
                            })
                        }}
                        style={{ cursor: 'pointer' }}
                        block
                    >
                        Not Active
                    </Label>
                )}
                {user.status === 1 && (
                    <Label
                        color={'success'}
                        onClick={() => {
                            deactivateUser(user).then(() => {
                                fetch()
                            })
                        }}
                        block
                        style={{ cursor: 'pointer' }}
                    >
                        Active
                    </Label>
                )}
            </>
        )
    }
}

export default RowStatus