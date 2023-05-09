import * as React from 'react'
import { NotificationsManager } from './NotificationsManager'
import { RouteManager } from './RouteManager'
import { AuthorizationManager } from './AuthorizationManager'
import { AddToastNotification, CanByPermissions, Navigate } from '../../types.d'

interface FormContainerRenderProps {
    navigate: Navigate
    addToastNotification: AddToastNotification
    canByPermission: CanByPermissions
}
interface FormContainerProps {
    children: (renderProps: FormContainerRenderProps) => any
}

export class FormContainer extends React.Component<FormContainerProps, null> {
    render() {
        const { children } = this.props
        return (
            <RouteManager>
                {({ navigate }) => (
                    <NotificationsManager>
                        {({ addToastNotification }) => (
                            <AuthorizationManager>
                                {({ canByPermission }) => {
                                    return (
                                        <>
                                            {children({
                                                navigate,
                                                addToastNotification,
                                                canByPermission,
                                            })}
                                        </>
                                    )
                                }}
                            </AuthorizationManager>
                        )}
                    </NotificationsManager>
                )}
            </RouteManager>
        )
    }
}

export default FormContainer
