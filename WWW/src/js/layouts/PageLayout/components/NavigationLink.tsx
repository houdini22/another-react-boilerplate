import * as React from 'react'
import { Link } from 'react-router-dom'
import classNames from 'classnames/bind'
import { AiOutlineRight, AiOutlineDown } from 'react-icons/ai'
import styles from '../../../../assets/scss/layout/_layout.scss'
import _ from 'lodash'
import { RouteManager } from '../../../containers/RouteManager'
import { NavigationItems } from './NavigationItems'

const cx = classNames.bind(styles)

interface NavigationLinkProps {
    children: any
    icon: any
    active: boolean
    nested: any
    href: string
}

interface NavigationLinkState {
    expanded: boolean
}

class NavigationLink extends React.Component<
    NavigationLinkProps,
    NavigationLinkState
> {
    constructor(props) {
        super(props)
        this.state = {
            expanded: false,
        }
    }

    render() {
        const { children, href, icon, active, nested } = this.props
        const { expanded } = this.state

        return (
            <RouteManager>
                {({ match: { url } }) => (
                    <li
                        className={cx(
                            'layout__sidebar__content__navigation__links__link',
                            {
                                'layout__sidebar__content__navigation__links__link--active':
                                    active,
                            },
                        )}
                    >
                        <Link
                            to={href}
                            onClick={() => {
                                if (!_.isEmpty(nested)) {
                                    this.setState({
                                        expanded: !expanded,
                                    })
                                }
                            }}
                        >
                            <div>
                                <span
                                    className={cx(
                                        'layout__sidebar__content__navigation__links__link__icon',
                                    )}
                                >
                                    {icon}
                                </span>
                                <span
                                    className={cx(
                                        'layout__sidebar__content__navigation__links__link__caption',
                                    )}
                                >
                                    {children}
                                </span>
                                {!_.isEmpty(nested) && (
                                    <span
                                        className={cx(
                                            'layout__sidebar__content__navigation__links__link__nested',
                                        )}
                                    >
                                        {!expanded && <AiOutlineRight />}
                                        {!!expanded && <AiOutlineDown />}
                                    </span>
                                )}
                            </div>
                        </Link>
                        {!_.isEmpty(nested) && expanded && (
                            <NavigationItems items={nested} />
                        )}
                    </li>
                )}
            </RouteManager>
        )
    }
}

export { NavigationLink }
export default { NavigationLink }
