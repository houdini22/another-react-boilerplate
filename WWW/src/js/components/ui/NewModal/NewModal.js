import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames/bind'
import { FaWindowClose as CloseIcon } from 'react-icons/fa'
import _ from 'lodash'
import styles from '../../../../assets/scss/components/_modal.scss'

const cx = classNames.bind(styles)

class NewModalContainer extends React.Component {
    render() {
        const {
            title,
            children,
            footer,
            animation,
            color,
            close,
            closeIcon,
            size,
            placement,
            visible,
        } = this.props

        if (!visible) return null

        return (
            <div className={cx('component-modal-container')}>
                <div
                    className={cx('component-modal-container__modal', {
                        'animation--sweet-show':
                            animation === 'sweet' && placement !== 'right',
                        [`component-modal-container__modal--color-${color}`]: color,
                        [`component-modal-container__modal--size-${size}`]: size,
                        [`component-modal-container__modal--placement-${placement}`]: placement,
                    })}
                >
                    <div
                        className={cx(
                            'component-modal-container__modal__content',
                        )}
                    >
                        {children}
                    </div>
                </div>
            </div>
        )
    }
}

NewModalContainer.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.element.isRequired,
        PropTypes.array.isRequired,
        PropTypes.string.isRequired,
    ]),
    title: PropTypes.oneOfType([
        PropTypes.element.isRequired,
        PropTypes.array.isRequired,
        PropTypes.string.isRequired,
    ]),
    body: PropTypes.oneOfType([
        PropTypes.element.isRequired,
        PropTypes.array.isRequired,
        PropTypes.string.isRequired,
    ]),
    footer: PropTypes.oneOfType([
        PropTypes.element.isRequired,
        PropTypes.array.isRequired,
        PropTypes.string.isRequired,
    ]),
    className: PropTypes.string,
    animation: PropTypes.string,
    closeIcon: PropTypes.bool,
    color: PropTypes.string,
    size: PropTypes.string,
    placement: PropTypes.string,
    visible: PropTypes.bool,
}

NewModalContainer.defaultProps = {
    closeIcon: true,
}

class NewModalBody extends React.Component {
    render() {
        const { children } = this.props

        return (
            <div
                className={cx(
                    'component-modal-container__modal__content__body',
                )}
            >
                {_.isFunction(children) && children({ close })}
                {!_.isFunction(children) && children}
            </div>
        )
    }
}

NewModalBody.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.element.isRequired,
        PropTypes.array.isRequired,
        PropTypes.string.isRequired,
    ]),
}

class NewModalHeader extends React.Component {
    render() {
        const { children, closeIcon } = this.props

        return (
            <div
                className={cx(
                    'component-modal-container__modal__content__title',
                )}
            >
                <h2
                    className={cx(
                        'component-modal-container__modal__content__title__title',
                    )}
                >
                    {_.isFunction(children) && children({ close })}
                    {!_.isFunction(children) && children}
                </h2>
                {closeIcon && (
                    <div
                        className={cx(
                            'component-modal-container__modal__content__title__close-icon',
                        )}
                        onClick={() => close()}
                    >
                        <CloseIcon />
                    </div>
                )}
            </div>
        )
    }
}

NewModalHeader.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.element.isRequired,
        PropTypes.array.isRequired,
        PropTypes.string.isRequired,
    ]),
}

class NewModalFooter extends React.Component {
    render() {
        const { children } = this.props

        return (
            <div
                className={cx(
                    'component-modal-container__modal__content__footer',
                )}
            >
                {_.isFunction(children) && children({ close })}
                {!_.isFunction(children) && children}
            </div>
        )
    }
}

NewModalFooter.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.element.isRequired,
        PropTypes.array.isRequired,
        PropTypes.string.isRequired,
    ]),
}

export { NewModalContainer, NewModalBody, NewModalHeader, NewModalFooter }
export default {
    NewModalContainer,
    NewModalBody,
    NewModalHeader,
    NewModalFooter,
}
