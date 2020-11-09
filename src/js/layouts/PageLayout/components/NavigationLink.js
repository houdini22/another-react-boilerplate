import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import classNames from 'classnames/bind'
import { AiOutlineRight, AiOutlineDown } from 'react-icons/ai'
import styles from '../../../../assets/scss/layout/_layout.scss'
import { DragSource } from 'react-dnd'
import _ from 'lodash'
import { navigation } from '../../../config/navigation'
import { NavigationHeader } from './NavigationHeader'
import { AuthManager } from '../../../containers/AuthManager'
import { RouteManager } from '../../../containers/RouteManager'
import { NavigationItems } from './NavigationItems'

const cx = classNames.bind(styles)

class BaseNavigationLink extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            expanded: false,
        }
    }

    render() {
        const { children, href, icon, active, nested, isLoggedIn } = this.props
        const { expanded } = this.state

        return (
            <RouteManager>
                {({ match: { url } }) => (
                    <AuthManager>
                        {({ auth: { isLoggedIn, user }, logoff }) => (
                            <li
                                className={cx(
                                    'layout__sidebar__content__navigation__links__link',
                                    {
                                        'layout__sidebar__content__navigation__links__link--active': active,
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
                                                {!expanded && (
                                                    <AiOutlineRight />
                                                )}
                                                {!!expanded && (
                                                    <AiOutlineDown />
                                                )}
                                            </span>
                                        )}
                                    </div>
                                </Link>
                                {!_.isEmpty(nested) && expanded && (
                                    <NavigationItems items={nested} />
                                )}
                            </li>
                        )}
                    </AuthManager>
                )}
            </RouteManager>
        )
    }
}

BaseNavigationLink.propTypes = {
    children: PropTypes.any.isRequired,
    href: PropTypes.string.isRequired,
    icon: PropTypes.any.isRequired,
    active: PropTypes.bool.isRequired,
    nested: PropTypes.array,
}

const NavigationLink = BaseNavigationLink

export { NavigationLink }
export default { NavigationLink }
