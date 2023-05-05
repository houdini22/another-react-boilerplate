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
        urlActive: [/\/cms\/pages/],
        children: [
            {
                type: 'link',
                href: '/cms/pages',
                caption: 'Pages',
                icon: <AiOutlineOrderedList />,
                urlActive: [/^\/cms\/pages$/],
            },
            {
                type: 'link',
                caption: 'Add',
                icon: <AddIcon />,
                urlActive: [/\/cms\/pages\/add_category/, /\/cms\/pages\/add_document/, /\/cms\/pages\/add_link/],
                children: [
                    {
                        type: 'link',
                        href: '/cms/pages/add_category',
                        caption: 'Category',
                        icon: <CategoryIcon />,
                        urlActive: [/\/cms\/pages\/add_category/],
                    },
                    {
                        type: 'link',
                        href: '/cms/pages/add_document',
                        caption: 'Document',
                        icon: <DocumentIcon />,
                        urlActive: [/\/cms\/pages\/add_document/],
                    },
                    {
                        type: 'link',
                        href: '/cms/pages/add_link',
                        caption: 'Link',
                        icon: <LinkIcon />,
                        urlActive: [/\/cms\/pages\/add_link/],
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
        caption: 'Accounts',
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
