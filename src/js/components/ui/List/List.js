import React from 'react'
import classNames from 'classnames/bind'
import PropTypes from 'prop-types'
import styles from '../../../../assets/scss/components/_list.scss'

const cx = classNames.bind(styles)

class Container extends React.Component {
    render() {
        const { children, color, size, separated } = this.props

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

Container.propTypes = {
    color: PropTypes.string,
    size: PropTypes.string,
    separated: PropTypes.bool,
}

Container.defaultProps = {
    color: 'default',
    size: 'md',
}

class Item extends React.Component {
    render() {
        const { children } = this.props

        return <div className={cx('component-list__item')}>{children}</div>
    }
}

class ItemContent extends React.Component {
    render() {
        const { children } = this.props

        return (
            <div className={cx('component-list__item__content')}>
                {children}
            </div>
        )
    }
}

class Image extends React.Component {
    render() {
        const { children, url } = this.props

        return (
            <div className={cx('component-list__item__image')}>
                <img src={url} alt="" />
            </div>
        )
    }
}

Image.propTypes = {
    image: PropTypes.string,
}

export { Container, Item, Image, ItemContent }
export default { Container, Item, Image, ItemContent }
