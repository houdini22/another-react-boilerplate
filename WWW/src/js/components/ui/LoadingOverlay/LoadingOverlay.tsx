import React from 'react'
import classNames from 'classnames/bind'
import styles from '../../../../assets/scss/components/_loading-overlay.scss'

const cx = classNames.bind(styles)

interface LoadingOverlayProps {
    size: string;
    noBackground: boolean;
}

class LoadingOverlay extends React.Component<LoadingOverlayProps> {
    render() {
        const { size, noBackground } = this.props

        return (
            <div
                className={cx('loading-overlay-container', {
                    'loading-overlay--size-xs': size === 'xs',
                    'loading-overlay--no-background': noBackground === true,
                })}
            >
                <div className={cx('spinner')}>
                    <div className={cx('double-bounce1')} />
                    <div className={cx('double-bounce2')} />
                </div>
            </div>
        )
    }
}

export { LoadingOverlay }
export default { LoadingOverlay }
