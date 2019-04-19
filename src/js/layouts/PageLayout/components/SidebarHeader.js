import React from 'react'
import PropTypes from 'prop-types'
import connect from 'react-redux/es/connect/connect'
import { Link } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import { MdViewHeadline as ToggleIcon } from 'react-icons/md'
import {
  selectors as commonSelectors,
  actions as commonActions,
} from '../../../reducers/common'
import classNames from 'classnames/bind'
import styles from '../../../../assets/scss/layout/_layout.scss'

const cx = classNames.bind(styles)

class SidebarHeaderBase extends React.Component {
  render() {
    const {
      children,
      layout: { floatingSidebar, sidebarExpanded },
      setLayoutOption,
    } = this.props

    return (
      <div
        className={cx('layout__header', {
          'layout__header--floating': floatingSidebar,
          'layout__header--expanded': sidebarExpanded,
        })}
      >
        <div
          className={cx('layout__header__logo')}
          onMouseOver={e => {
            setLayoutOption('sidebarExpanded', true)
          }}
          onMouseOut={e => {
            setLayoutOption('sidebarExpanded', false)
          }}
        >
          <Link to="/">
            <h1 className={cx('layout__header__logo__brand')}>{children}</h1>
          </Link>
          <span
            className={cx('layout__header__logo__toggle')}
            onClick={() => {
              setLayoutOption('floatingSidebar', !floatingSidebar)
            }}
          >
            <ToggleIcon />
          </span>
        </div>
        <div className={cx('layout__header__bar')} />
      </div>
    )
  }
}

SidebarHeaderBase.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element.isRequired,
    PropTypes.string.isRequired,
  ]),
}

const SidebarHeader = connect(
  state => ({
    layout: commonSelectors.getLayout(state),
  }),
  dispatch => {
    return bindActionCreators(
      {
        setLayoutOption: commonActions.setLayoutOption,
      },
      dispatch,
    )
  },
)(SidebarHeaderBase)

export { SidebarHeader }
export default { SidebarHeader }
