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
}

export interface Role {
    id: number
    name: string
    permissions: Array<Permission>
    is_deletable: boolean
    users_count: number
    users: Array<User>
    description: string
}

export interface Permission {
    id: number
    name: string
    roles_count: number
    users_count: number
    is_deletable: number
    description: string
}

interface UserAvatar {
    id: number
}
