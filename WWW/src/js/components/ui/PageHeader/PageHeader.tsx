import * as React from 'react'
import classNames from 'classnames/bind'
import { AppContext } from '../../../../index'
import { createPortal } from 'react-dom'
import { Link } from 'react-router-dom'
import _ from 'lodash'
import styles from '../../../../assets/scss/components/_page-header.scss'

const cx = classNames.bind(styles)

interface ContainerProps {
    children: any
    size?: string
    title?: any
}

interface ContainerState {
    titleElementRegistered: boolean
    titleElement: any
    breadcrumbsElementRegistered: boolean
    breadcrumbsElement: any
    actionsElementRegistered: boolean
    actionsElement: any
    breadcrumbsExists: boolean
}

export class Container extends React.Component<ContainerProps, ContainerState> {
    state = {
        titleElementRegistered: false,
        titleElement: document.createElement('div'),
        breadcrumbsElementRegistered: false,
        breadcrumbsElement: document.createElement('div'),
        actionsElementRegistered: false,
        actionsElement: document.createElement('div'),
        breadcrumbsExists: false,
    }

    registerTitleElement(e) {
        const { titleElementRegistered } = this.state
        if (!titleElementRegistered) {
            this.setState({
                titleElementRegistered: true,
                titleElement: e,
            })
        }
    }

    registerBreadcrumbsElement(e) {
        const { breadcrumbsElementRegistered } = this.state
        if (!breadcrumbsElementRegistered) {
            this.setState({
                breadcrumbsElementRegistered: true,
                breadcrumbsElement: e,
            })
        }
    }

    registerActionsElement(e) {
        const { actionsElementRegistered } = this.state
        if (!actionsElementRegistered) {
            this.setState({
                actionsElementRegistered: true,
                actionsElement: e,
            })
        }
    }

    setBreadcrumbsExists(breadcrumbsExists) {
        const { breadcrumbsExists: stateBreadcrumbsExists } = this.state
        if (stateBreadcrumbsExists !== breadcrumbsExists) {
            this.setState({ breadcrumbsExists })
        }
    }

    render() {
        const { children, size = 'md' } = this.props
        const { titleElement, breadcrumbsElement, actionsElement, breadcrumbsExists } = this.state

        return (
            <AppContext.Provider
                value={{
                    pageHeaderSize: size,
                    titleElement,
                    breadcrumbsElement,
                    actionsElement,
                    setBreadcrumbsExists: this.setBreadcrumbsExists.bind(this),
                }}
            >
                <div
                    className={cx('component-page-header', {
                        [`component-page-header--size-${size}`]: true,
                    })}
                >
                    <div className={cx('component-page-header__content')}>
                        <div className={cx('component-page-header__content__title')}>
                            <h2 ref={(e) => this.registerTitleElement(e)} />
                        </div>
                        <div className={cx('component-page-header__content__actions')} ref={(e) => this.registerActionsElement(e)} />
                    </div>
                    <div
                        className={cx('component-page-header__breadcrumbs--outer')}
                        style={{
                            display: breadcrumbsExists ? 'block' : 'none',
                        }}
                    >
                        <div className={cx('component-page-header__breadcrumbs--inner')}>
                            <ul ref={(e) => this.registerBreadcrumbsElement(e)} />
                        </div>
                    </div>
                    {children}
                </div>
            </AppContext.Provider>
        )
    }
}

interface TitleProps {
    children: any
}

export class Title extends React.Component<TitleProps, null> {
    render() {
        const { children } = this.props

        return <AppContext.Consumer>{({ titleElement }) => createPortal(children, titleElement)}</AppContext.Consumer>
    }
}

interface BreadcrumbsProps {
    children: any
}

export class Breadcrumbs extends React.Component<BreadcrumbsProps, null> {
    setBreadcrumbsExists = null

    componentWillUnmount() {
        this.setBreadcrumbsExists(false)
    }

    render() {
        const { children } = this.props

        return (
            <AppContext.Consumer>
                {({ breadcrumbsElement, setBreadcrumbsExists }) => {
                    setBreadcrumbsExists(true)
                    this.setBreadcrumbsExists = setBreadcrumbsExists

                    return createPortal(children, breadcrumbsElement)
                }}
            </AppContext.Consumer>
        )
    }
}

interface BreadcrumbsItemProps {
    children: any
    href?: string
}

export class BreadcrumbsItem extends React.Component<BreadcrumbsItemProps, null> {
    render() {
        const { children, href = '' } = this.props

        const getComponent = () => {
            if (!_.isEmpty(children) && _.isFunction(children.type)) {
                return children
            } else if (!_.isEmpty(href)) {
                return (
                    <Link to={href}>
                        <span>{children}</span>
                    </Link>
                )
            } else if (_.isEmpty(href)) {
                return (
                    <a>
                        <span>{children}</span>
                    </a>
                )
            }
        }

        return <li>{getComponent()}</li>
    }
}

interface ActionsProps {
    children: any
}

export class Actions extends React.Component<ActionsProps, null> {
    render() {
        const { children } = this.props

        return <AppContext.Consumer>{({ actionsElement }) => createPortal(children, actionsElement)}</AppContext.Consumer>
    }
}
