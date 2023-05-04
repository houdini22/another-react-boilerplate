import * as React from 'react'
import { FaSitemap } from 'react-icons/fa'
import { AiOutlineOrderedList } from 'react-icons/ai'
import { Badge } from '../components'
import {
    AddIcon,
    CategoryIcon,
    DocumentIcon,
    FileIcon,
    LinkIcon,
    PermissionIcon,
    RoleIcon,
    UserIcon,
} from '../components/icons'

export const navigation = [
    {
        type: 'header',
        caption: 'Content',
    },
    {
        type: 'link',
        caption: 'CMS',
        href: '/cms/pages',
        icon: <FaSitemap />,
        children: [
            {
                type: 'link',
                href: '/cms/pages',
                caption: 'Pages',
                icon: <AiOutlineOrderedList />,
            },
            {
                type: 'link',
                href: '/cms/pages',
                caption: 'Add',
                icon: <AddIcon />,
                children: [
                    {
                        type: 'link',
                        href: '/cms/pages/add_category',
                        caption: 'Category',
                        icon: <CategoryIcon />,
                    },
                    {
                        type: 'link',
                        href: '/cms/pages/add_document',
                        caption: 'Document',
                        icon: <DocumentIcon />,
                    },
                    {
                        type: 'link',
                        href: '/cms/pages/add_link',
                        caption: 'Link',
                        icon: <LinkIcon />,
                    },
                ],
            },
        ],
    },
    {
        type: 'link',
        caption: <span>Media</span>,
        href: '/media',
        icon: <FileIcon />,
        urlActive: [/^\/media$/],
    },
    {
        type: 'header',
        caption: 'Users',
    },
    {
        type: 'link',
        href: '/users',
        caption: 'Users',
        icon: <UserIcon />,
        urlActive: [/^\/users$/, /^\/users\/add$/, /^\/users\/edit$/],
    },
    {
        type: 'link',
        href: '/roles',
        caption: 'Roles',
        icon: <RoleIcon />,
        urlActive: [/^\/roles$/, /^\/roles\/add$/, /^\/roles\/edit$/],
    },
    {
        type: 'link',
        href: '/permissions',
        caption: 'Permissions',
        icon: <PermissionIcon />,
        urlActive: [/^\/permissions$/, /^\/permissions\/add$/, /^\/permissions\/edit$/],
    },
]
