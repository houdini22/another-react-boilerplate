import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames/bind'
import _ from 'lodash'
import { AppContext } from '../../../../index'
import { createPortal } from 'react-dom'
import styles from '../../../../assets/scss/components/_tabs.scss'

const cx = classNames.bind(styles)

export class Container extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      tabs: {},
      triggersElement: document.createElement('div'),
      triggersElementRegistered: false,
      contentElement: document.createElement('div'),
      contentElementRegistered: false,
    }
  }

  setActiveTab(activeTab) {
    const { tabs } = this.state
    Object.keys(tabs).forEach(key => {
      tabs[key]['isActive'] = key === activeTab
    })
    this.setState({ tabs })
  }

  registerTab(tabName) {
    const { tabs } = this.state
    if (!tabs[tabName]) {
      tabs[tabName] = {
        isActive: !_.head(Object.keys(tabs)) || false,
        tabName,
      }
      this.setState({ tabs })
    }
  }

  registerTriggersElement(e) {
    const { triggersElementRegistered } = this.state
    if (!triggersElementRegistered) {
      this.setState({ triggersElement: e, triggersElementRegistered: true })
    }
  }

  registerContentElement(e) {
    const { contentElementRegistered } = this.state
    if (!contentElementRegistered) {
      this.setState({ contentElement: e, contentElementRegistered: true })
    }
  }

  getActiveTab() {
    const { tabs } = this.state
    let activeTab = null
    Object.keys(tabs).forEach(key => {
      if (tabs[key]['isActive']) {
        activeTab = tabs[key]
      }
    })
    return activeTab
  }

  render() {
    const {
      aligned,
      solid,
      color,
      block,
      size,
      header,
      left,
      children,
      outline,
      rounded,
      animation,
      className,
      contentHeight,
      below,
    } = this.props
    const { tabs, triggersElement, contentElement } = this.state

    let flexTitle = aligned ? 1 / Object.keys(tabs).length : 'none'
    if (!header && aligned) {
      flexTitle = 1
    }

    let flexTriggers = aligned ? 1 - 1 / Object.keys(tabs).length : 'none'
    if (!header && aligned) {
      flexTriggers = 1
    }

    return (
      <AppContext.Provider
        value={{
          setActiveTab: this.setActiveTab.bind(this),
          registerTab: this.registerTab.bind(this),
          tabs,
          activeTab: this.getActiveTab(),
          triggersElement,
          contentElement,
          animation,
          aligned,
          contentHeight,
        }}
      >
        <div
          className={cx('component-tabs', {
            'component-tabs--aligned': aligned,
            'component-tabs--solid': solid,
            [`component-tabs--color-${color}`]: color,
            'component-tabs--block': block,
            [`component-tabs--size-${size}`]: size,
            'component-tabs--left': left,
            'component-tabs--outline': outline,
            'component-tabs--rounded': rounded,
            'component-tabs--content-height': contentHeight,
            'component-tabs--below': below,
            'component-tabs--has-header': !!header,
            [className]: className,
          })}
        >
          <div
            className={cx('component-tabs__tabs', {
              [animation]: animation,
            })}
          >
            <div className={cx('component-tabs__tabs__header')}>
              {header && (
                <div
                  className={cx('component-tabs__tabs__header__title')}
                  style={{
                    flex: flexTitle,
                  }}
                >
                  <h1>{header}</h1>
                </div>
              )}
              <ul
                className={cx('component-tabs__tabs__header__triggers')}
                ref={e => this.registerTriggersElement(e)}
                style={{
                  flex: flexTriggers,
                }}
              />
            </div>
          </div>
          <div
            className={cx('component-tabs__content', {
              [animation]: animation,
            })}
          >
            <div className={cx('component-tabs__content__outer')}>
              <div
                className={cx('component-tabs__content__outer__inner')}
                ref={e => {
                  this.registerContentElement(e)
                }}
              >
                {children}
              </div>
            </div>
          </div>
        </div>
      </AppContext.Provider>
    )
  }
}

Container.propTypes = {
  onTabChange: PropTypes.func,
  aligned: PropTypes.bool,
  solid: PropTypes.bool,
  color: PropTypes.string,
  block: PropTypes.bool,
  size: PropTypes.string,
  header: PropTypes.oneOfType([
    PropTypes.element.isRequired,
    PropTypes.array.isRequired,
    PropTypes.func.isRequired,
  ]),
  children: PropTypes.oneOfType([
    PropTypes.element.isRequired,
    PropTypes.array.isRequired,
    PropTypes.func.isRequired,
  ]),
  left: PropTypes.bool,
  outline: PropTypes.bool,
  rounded: PropTypes.bool,
  animation: PropTypes.string,
  className: PropTypes.string,
  contentHeight: PropTypes.oneOfType([PropTypes.number, PropTypes.bool]),
  below: PropTypes.bool,
}

Container.defaultProps = {
  color: 'default',
  size: 'md',
}

export class Tab extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { children, name } = this.props

    return (
      <AppContext.Consumer>
        {({
          registerTab,
          tabs,
          setActiveTab,
          activeTab,
          triggersElement,
          contentElement,
          contentHeight,
        } = {}) => {
          registerTab(name)

          return (
            <AppContext.Provider
              value={{
                tabName: name,
                activateTab: () => {
                  setActiveTab(name)
                },
                changeTab: name => {
                  setActiveTab(name)
                },
                tabs,
                activeTab,
                triggersElement,
                contentElement,
                contentHeight,
              }}
            >
              {children}
            </AppContext.Provider>
          )
        }}
      </AppContext.Consumer>
    )
  }
}

Tab.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element.isRequired,
    PropTypes.array.isRequired,
    PropTypes.func.isRequired,
  ]),
  name: PropTypes.string,
  setActiveTab: PropTypes.func.isRequired,
}

export class Trigger extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { children, noTab, onClick, hidden } = this.props
    return (
      <AppContext.Consumer>
        {({
          tabName,
          activateTab,
          tabs = {},
          activeTab,
          triggersElement,
        } = {}) => {
          return createPortal(
            <li
              className={cx('component-tabs__tabs__header__triggers__trigger')}
              style={{
                display: hidden ? 'none' : 'inherit',
              }}
            >
              <div
                onClick={() => {
                  if (!noTab) {
                    activateTab()
                  }
                  if (_.isFunction(onClick)) {
                    onClick()
                  }
                }}
                className={cx(
                  'component-tabs__tabs__header__triggers__trigger__link',
                  {
                    'component-tabs__tabs__header__triggers__trigger__link--is-active':
                      _.get(activeTab, 'tabName') === tabName,
                  },
                )}
              >
                <a href>
                  <span>{children}</span>
                </a>
              </div>
            </li>,
            triggersElement,
          )
        }}
      </AppContext.Consumer>
    )
  }
}

Trigger.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element.isRequired,
    PropTypes.array.isRequired,
    PropTypes.func.isRequired,
  ]),
  noTab: PropTypes.bool,
  hidden: PropTypes.bool,
}

export class Content extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { children } = this.props

    return (
      <AppContext.Consumer>
        {({
          contentElement,
          activeTab,
          tabName,
          changeTab,
          contentHeight,
        } = {}) => {
          const Component = () => (
            <div
              className={cx({
                'component-tabs__content__outer__inner__tab': true,
                'component-tabs__content__outer__inner__tab--is-active':
                  _.get(activeTab, 'tabName') === tabName,
              })}
            >
              {_.isFunction(children) && children({ changeTab })}
              {!_.isFunction(children) && children}
            </div>
          )

          return createPortal(<Component />, contentElement)
        }}
      </AppContext.Consumer>
    )
  }
}

Content.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element.isRequired,
    PropTypes.array.isRequired,
    PropTypes.func.isRequired,
  ]),
}
