import * as React from 'react'
import classNames from 'classnames/bind'
import { FaWindowClose as CloseIcon } from 'react-icons/fa'
import _ from 'lodash'
import styles from '../../../../assets/scss/components/_modal.scss'

const cx = classNames.bind(styles)

interface ModalContainerProps {
    children: any
    className: string
    animation: string
    color: string
    size: string
    placement: string
    visible: boolean
}

class ModalContainer extends React.Component<ModalContainerProps> {
    render() {
        const { children, animation, color, size, placement, visible } =
            this.props

        if (!visible) return null

        return (
            <div className={cx('component-modal-container')}>
                <div
                    className={cx('component-modal-container__modal', {
                        [`animation--${animation}`]: animation,
                        [`component-modal-container__modal--color-${color}`]:
                            color,
                        [`component-modal-container__modal--size-${size}`]:
                            size,
                        [`component-modal-container__modal--placement-${placement}`]:
                            placement,
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

interface ModalBodyProps {
    children: any
    close(): any
}

class ModalBody extends React.Component<ModalBodyProps> {
    render() {
        const { children, close } = this.props

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

interface ModalHeaderProps {
    children: any
    closeIcon: any
    close(): any
}

class ModalHeader extends React.Component<ModalHeaderProps> {
    render() {
        const { children, closeIcon, close } = this.props

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

interface ModalFooterProps {
    children: any
    close(): any
}

class ModalFooter extends React.Component<ModalFooterProps> {
    render() {
        const { children, close } = this.props

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

export { ModalContainer, ModalBody, ModalHeader, ModalFooter }
export default {
    ModalContainer,
    ModalBody,
    ModalHeader,
    ModalFooter,
}
