import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import classNames from 'classnames/bind'
import styles from '../../../../assets/scss/layout/_layout.scss'
import { DragSource } from 'react-dnd'

const cx = classNames.bind(styles)

const navigationLinkSource = {
  beginDrag(props) {
    // Return the data describing the dragged item
    const item = { id: props.id }
    return item
  },

  endDrag(props, monitor, component) {
    if (!monitor.didDrop()) {
      return
    }

    // When dropped on a compatible target, do something
    const item = monitor.getItem()
    const dropResult = monitor.getDropResult()

    console.log(item, dropResult, component)
  },
}

function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging(),
  }
}

class BaseNavigationLink extends React.Component {
  render() {
    const { children, href, icon, active, connectDragSource } = this.props

    return connectDragSource(
      <li
        className={cx('layout__sidebar__content__navigation__links__link', {
          'layout__sidebar__content__navigation__links__link--active': active,
        })}
      >
        <Link to={href}>
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
          </div>
        </Link>
      </li>,
    )
  }
}

BaseNavigationLink.propTypes = {
  children: PropTypes.string.isRequired,
  href: PropTypes.string.isRequired,
  icon: PropTypes.element,
  active: PropTypes.bool.isRequired,
  connectDragSource: PropTypes.func.isRequired,
}

const NavigationLink = DragSource(
  'NAVIGATION_LINK',
  navigationLinkSource,
  collect,
)(BaseNavigationLink)

export { NavigationLink }
export default { NavigationLink }
