import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { FaHome as HomeIcon } from 'react-icons/fa'

class Breadcrumbs extends React.Component {
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
                <a href="" onClick={e => e.preventDefault()}>
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

Breadcrumbs.propTypes = {
  links: PropTypes.array.isRequired,
}

export { Breadcrumbs }
export default { Breadcrumbs }
