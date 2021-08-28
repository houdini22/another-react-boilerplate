import * as React from 'react'
import { Link } from 'react-router-dom'
import { FaHome as HomeIcon } from 'react-icons/fa'
import classNames from 'classnames/bind'
import styles from '../../../../assets/scss/components/_breadcrumbs.scss'

const cx = classNames.bind(styles)

interface Link {
    [index: number]: {
        link: string
        label: string
    }
}

interface BreadcrumbsProps {
    links: Link
}

class Breadcrumbs extends React.Component<BreadcrumbsProps> {
    renderLinks(links) {
        return (
            <ul>
                <li>
                    <Link to="/">
                        <HomeIcon />
                        <span>Home</span>
                    </Link>
                </li>
                {links.map(({ label, link }) => {
                    return (
                        <li key={`${label}${link}`}>
                            {link && (
                                <Link to={link}>
                                    <span>{label}</span>
                                </Link>
                            )}
                            {!link && (
                                <a href="" onClick={(e) => e.preventDefault()}>
                                    <span>{label}</span>
                                </a>
                            )}
                        </li>
                    )
                })}
            </ul>
        )
    }

    render() {
        const { links } = this.props

        return (
            <div className={cx('component-page-header__breadcrumbs--inner')}>
                {this.renderLinks(links)}
            </div>
        )
    }
}

export { Breadcrumbs }
export default { Breadcrumbs }
