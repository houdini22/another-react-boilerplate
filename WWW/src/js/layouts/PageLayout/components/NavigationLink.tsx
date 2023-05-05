import * as React from 'react'
import { Link } from 'react-router-dom'
import classNames from 'classnames/bind'
import { AiOutlineRight, AiOutlineDown } from 'react-icons/ai'
import styles from '../../../../assets/scss/layout/_layout.scss'
import _ from 'lodash'
import { NavigationItems } from './NavigationItems'

const cx = classNames.bind(styles)

interface NavigationLinkProps {
    children: any
    icon: any
    active: boolean
    nested: any
    href: string
    componentType: any
}

interface NavigationLinkState {
    expanded: boolean
}

class NavigationLink extends React.Component<NavigationLinkProps, NavigationLinkState> {
    render() {
        const { children, href, icon, active, nested, setNested, nestedIds, nestedId } = this.props

        const isExpanded = nestedIds.includes(nestedId) || active

        const content = (
            <div>
                <span className={cx('layout__sidebar__content__navigation__links__link__icon')}>{icon}</span>
                <span className={cx('layout__sidebar__content__navigation__links__link__caption')}>{children}</span>
                {!_.isEmpty(nested) && (
                    <span className={cx('layout__sidebar__content__navigation__links__link__nested')}>
                        {!isExpanded && <AiOutlineRight />}
                        {!!isExpanded && <AiOutlineDown />}
                    </span>
                )}
            </div>
        )

        if (!href) {
            return (
                <li
                    className={cx('layout__sidebar__content__navigation__links__link', {
                        'layout__sidebar__content__navigation__links__link--active': active,
                    })}
                >
                    <a
                        onClick={() => {
                            if (!_.isEmpty(nested)) {
                                setNested(nestedId)
                            }
                        }}
                    >
                        {content}
                    </a>
                    {!_.isEmpty(nested) && isExpanded && (
                        <NavigationItems items={nested} setNested={setNested} nestedIds={nestedIds} />
                    )}
                </li>
            )
        }

        return (
            <li
                className={cx('layout__sidebar__content__navigation__links__link', {
                    'layout__sidebar__content__navigation__links__link--active': active,
                })}
            >
                <Link
                    to={href}
                    onClick={() => {
                        if (!_.isEmpty(nested)) {
                            setNested(nestedId)
                        }
                    }}
                >
                    {content}
                </Link>
                {!_.isEmpty(nested) && isExpanded && (
                    <NavigationItems items={nested} setNested={setNested} nestedIds={nestedIds} />
                )}
            </li>
        )
    }
}

export { NavigationLink }
