import * as React from 'react'
import { Label } from '../../../../components'
import { User } from '../../../../../types.d'

interface FiltersProps {
    user: User
    activateUser: Function
    deactivateUser: Function
    fetch: Function
}

export class RowStatus extends React.Component<FiltersProps, null> {
    render() {
        const { user, activateUser, deactivateUser, fetch, addToastNotification } = this.props

        return (
            <>
                {user.status === 0 && (
                    <Label
                        color={'danger'}
                        onClick={() => {
                            activateUser(user).then(() => {
                                fetch().then(() => {
                                    addToastNotification({
                                        title: 'Activate success.',
                                        text: 'User account has been activated.',
                                        type: 'success',
                                    })
                                })
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
                                fetch().then(() => {
                                    addToastNotification({
                                        title: 'Deactivate success.',
                                        text: 'User account has been deactivated.',
                                        type: 'success',
                                    })
                                })
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
