declare module '*.scss'

export interface User {
    id: number
    name: string
    created_at: string
    status: number
    email_verified_at: string
    files_count: number
    last_active: string
    permissions_count: number
    roles_count: number
    updated_at: string
    token: string
    permissions: Array<Permission>
    roles: Array<Role>
    is_deletable: boolean
    avatar: UserAvatar
    email: string
    hasRole: boolean
    hasPermission: boolean
}

export interface Role {
    id: number
    name: string
    permissions: Array<Permission>
    is_deletable: boolean
    users_count: number
    users: Array<User>
    description: string
    hasPermission: boolean
    hasUser: boolean
}

export interface Permission {
    id: number
    name: string
    roles_count: number
    users_count: number
    is_deletable: number
    description: string
    occurrence?: number
    hasUser: boolean
    hasRole: boolean
    users: Array<User>
}

interface UserAvatar {
    id: number
}

export interface Log {
    id: number
    type: string
    user: User
    ip_address: string
    created_at: string
    message: string
    model_class_name: string
    model_id: string
    related_model_class_name: string
    related_model_id: string
}

export type Navigate = (url: string) => any
export type SetIsLoading = (value: boolean) => Promise<void>

export type DeleteUserRole = (user: User, role: Role) => Promise<void>
export type DeleteUserPermission = (permission: Permission, user: User) => Promise<void>
export type DeleteUserAvatar = (user: User) => Promise<void>
export type OpenModal = (name: string) => void
type CanByPermissionsArgument = string | Array<string>
export type CanByPermissions = (permission: CanByPermissionsArgument) => boolean

interface AddToastNotificationValues {
    title: string
    text: string
    type: string
    href: string
}

export type AddToastNotification = (values: AddToastNotificationValues) => void
export type ActivateUser = (user: User) => Promise<void>
export type DeactivateUser = (user: User) => Promise<void>
export type ExpandRow = (name: string) => void
export type DeleteUser = (user: User) => Promise<void>
export type SetFilter = (name: string, value: string) => void
export type Filters = Object
export type SetFilters = (filters: Filters) => void
export type DeleteSavedFilter = (name: string) => void
export type SaveFilters = (name: string) => void
export type RestoreSavedFilter = (name: string) => void
export type ResetFilters = () => void
export type SavedFilters = Array<any>
export type PaginationLinks = Object
export type SetPage = (page: number) => Promise<void>
export type DeleteRole = (role: Role) => Promise<void>
export type DeleteRolePermission = (role: Role, permission: Permission) => Promise<void>
export type DeletePermission = (permission: Permission) => Promise<void>
export type AddPermission = (values: object) => Promise<Permission>
