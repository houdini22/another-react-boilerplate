import React from 'react'
import {
    FaKey as KeyIcon,
    FaExclamationTriangle as AlertIcon,
    FaIdCard as CardIcon,
    FaObjectGroup as ButtonGroupIcon,
    FaWpforms as FormsIcon,
    FaInfo as InfoIcon,
} from 'react-icons/fa'
import {
    IoIosMail as ContactIcon,
    IoIosArrowDropdownCircle as DropdownIcon,
} from 'react-icons/io'
import {
    MdLabel as LabelIcon,
    MdRadioButtonChecked as ButtonIcon,
    MdLabelOutline as BadgeIcon,
    MdSettingsOverscan as ModalIcon,
    MdTabUnselected as TabIcon,
    MdTextFormat as TypographyIcon,
} from 'react-icons/md'
import { Badge } from '../components/ui/Badge'
import { IoIosNotificationsOutline } from 'react-icons/all'

export const navigation = [
    {
        type: 'header',
        caption: 'Main',
    },
    {
        type: 'link',
        href: '/faq',
        caption: (
            <span>
                FAQ{' '}
                <Badge color="success" size="sm">
                    new
                </Badge>
            </span>
        ),
        icon: <InfoIcon />,
    },
    {
        type: 'link',
        href: '/contact-me',
        caption: 'Contact me',
        icon: <ContactIcon />,
    },
    {
        type: 'link',
        href: '/restricted-area',
        caption: 'Restricted area',
        icon: <KeyIcon />,
        authorizationRequired: true,
    },
    {
        type: 'header',
        caption: 'Portfolio',
    },
    {
        type: 'link',
        caption: (
            <span>
                Components{' '}
                <Badge size={'sm'} color={'info'}>
                    19
                </Badge>
            </span>
        ),
        href: '',
        icon: 'UX',
        children: [
            {
                type: 'link',
                href: '/components/accordion',
                caption: 'Accordion',
                icon: 'AC',
                componentType: 'accordion',
            },
            {
                type: 'link',
                href: '/components/alert',
                caption: 'Alert',
                icon: <AlertIcon />,
                componentType: 'alert',
            },
            {
                type: 'link',
                href: '/components/badge',
                caption: 'Badge',
                icon: <BadgeIcon />,
                componentType: 'badge',
            },
            {
                type: 'link',
                href: '/components/button',
                caption: 'Button',
                icon: <ButtonIcon />,
                componentType: 'button',
            },
            {
                type: 'link',
                href: '/components/button-group',
                caption: 'Button Group',
                icon: <ButtonGroupIcon />,
                componentType: 'button_group',
            },
            {
                type: 'link',
                href: '/components/card',
                caption: 'Card',
                icon: <CardIcon />,
                componentType: 'card',
            },
            {
                type: 'link',
                href: '/components/column',
                caption: 'Column',
                icon: 'CO',
                componentType: 'column',
            },
            {
                type: 'link',
                href: '/components/dropdown',
                caption: 'Dropdown',
                icon: <DropdownIcon />,
                componentType: 'dropdown',
            },
            {
                type: 'link',
                href: '/components/label',
                caption: 'Label',
                icon: <LabelIcon />,
                componentType: 'label',
            },
            {
                type: 'link',
                href: '/components/list',
                caption: 'List',
                icon: 'LI',
                componentType: 'list',
            },
            {
                type: 'link',
                href: '/components/loading-overlay',
                caption: 'Loading Overlay',
                icon: 'LO',
                componentType: 'loading_overlay',
            },
            {
                type: 'link',
                href: '/components/modal',
                caption: 'Modal',
                icon: <ModalIcon />,
                componentType: 'modal',
            },
            {
                type: 'link',
                href: '/components/notifications',
                caption: 'Notifications',
                icon: <IoIosNotificationsOutline />,
                componentType: 'notification',
            },
            {
                type: 'link',
                href: '/components/page-header',
                caption: 'Page Header',
                icon: 'PH',
                componentType: 'link',
            },
            {
                type: 'link',
                href: '/components/popover',
                caption: 'Popover',
                icon: 'PO',
                componentType: 'popover',
            },
            {
                type: 'link',
                href: '/components/progress',
                caption: 'Progress',
                icon: 'PR',
                componentType: 'progress',
            },
            {
                type: 'link',
                href: '/components/tabs',
                caption: 'Tabs',
                icon: <TabIcon />,
                componentType: 'tabs',
            },
            {
                type: 'link',
                href: '/components/table',
                caption: 'Table',
                icon: 'TA',
                componentType: 'table',
            },
            {
                type: 'link',
                href: '/components/typography',
                caption: 'Typography',
                icon: <TypographyIcon />,
                componentType: 'typography',
            },
        ],
    },
    {
        type: 'link',
        caption: 'Forms',
        href: '/forms',
        icon: <FormsIcon />,
        children: [
            {
                type: 'link',
                caption: 'Auto-Save Form',
                href: '/forms',
                icon: 'AS',
            },
        ],
    },
    {
        type: 'link',
        caption: 'Pages',
        href: '/pages',
        icon: 'PG',
        children: [
            {
                type: 'link',
                caption: 'Login Page',
                href: '/pages/login-page',
                icon: 'LP',
            },
        ],
    },
    /*{
    type: 'header',
    caption: 'Builder',
  },
  {
    type: 'link',
    caption: 'Builder',
    href: '/builder',
    icon: 'BU',
  },*/
]
