import * as React from 'react'
import {
    FaKey as KeyIcon,
    FaExclamationTriangle as AlertIcon,
    FaIdCard as CardIcon,
    FaObjectGroup as ButtonGroupIcon,
    FaWpforms as FormsIcon,
    FaInfo as InfoIcon,
} from 'react-icons/fa'
import { IoIosMail as ContactIcon, IoIosArrowDropdownCircle as DropdownIcon } from 'react-icons/io'
import {
    MdLabel as LabelIcon,
    MdRadioButtonChecked as ButtonIcon,
    MdLabelOutline as BadgeIcon,
    MdSettingsOverscan as ModalIcon,
    MdTabUnselected as TabIcon,
    MdTextFormat as TypographyIcon,
} from 'react-icons/md'
import { FaSitemap, FaUser } from 'react-icons/fa'
import { AiOutlineOrderedList, AiOutlineUserAdd } from 'react-icons/ai'
import { Badge } from '../components'
import { IoIosNotificationsOutline } from 'react-icons/io'
import { AddIcon, CategoryIcon, DocumentIcon, LinkIcon } from '../components/icons'

export const navigation = [
    {
        type: 'header',
        caption: 'Content',
    },
    {
        type: 'link',
        caption: (
            <span>
                CMS{' '}
                <Badge color="success" size="sm">
                    new
                </Badge>
            </span>
        ),
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
        type: 'header',
        caption: 'System',
    },
    {
        type: 'link',
        caption: (
            <span>
                Users{' '}
                <Badge color="success" size="sm">
                    new
                </Badge>
            </span>
        ),
        href: '/users',
        icon: <FaUser />,
        children: [
            {
                type: 'link',
                href: '/users',
                caption: 'List',
                icon: <AiOutlineOrderedList />,
            },
            {
                type: 'link',
                href: '/roles',
                caption: 'Roles',
                icon: <AiOutlineOrderedList />,
            },
        ],
    },
]
