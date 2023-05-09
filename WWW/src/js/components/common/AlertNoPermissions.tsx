import * as React from 'react'
import { NotificationsManager } from '../../containers/NotificationsManager'
import { ModalConfirm } from './ModalConfirm'
import { DeleteRole, Role, SetIsLoading } from '../../../types.d'
import { Alert } from '../ui/Alert'
import { AccessDisabledIcon } from '../icons'

export class AlertNoPermissions extends React.Component<null, null> {
    render() {
        return (
            <Alert color={'danger'} withIcon={<AccessDisabledIcon />} iconHighlighted>
                You have no permissions to see this action.
            </Alert>
        )
    }
}

export default AlertNoPermissions
