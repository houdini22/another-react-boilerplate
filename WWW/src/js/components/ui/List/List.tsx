import * as React from 'react'
import classNames from 'classnames/bind'
import styles from '../../../../assets/scss/components/_list.scss'

const cx = classNames.bind(styles)

interface ContainerProps {
    color: string
    size: string
    separated: boolean
}

class Container extends React.Component<ContainerProps, null> {
    render() {
        const { children, color = 'default', size = 'md', separated } = this.props

        return (
            <div
                className={cx('component-list', {
                    [`component-list--color-${color}`]: color,
                    [`component-list--size-${size}`]: size,
                    [`component-list--separated`]: separated,
                })}
            >
                {children}
            </div>
        )
    }
}

class Item extends React.Component<null, null> {
    render() {
        const { children } = this.props

        return <div className={cx('component-list__item')}>{children}</div>
    }
}

class ItemContent extends React.Component<null, null> {
    render() {
        const { children } = this.props

        return <div className={cx('component-list__item__content')}>{children}</div>
    }
}

interface ImageProps {
    image: string
    children: any
    url: string
}

class Image extends React.Component<ImageProps, null> {
    render() {
        const { url } = this.props

        return (
            <div className={cx('component-list__item__image')}>
                <img src={url} alt="" />
            </div>
        )
    }
}

export { Container, Item, Image, ItemContent }
export default { Container, Item, Image, ItemContent }
