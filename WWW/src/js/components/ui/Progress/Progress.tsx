import * as React from 'react'
import classNames from 'classnames/bind'
import styles from '../../../../assets/scss/components/_progress.scss'

const cx = classNames.bind(styles)

interface ProgressProps {
    size: string
    color: string
    progress: number
}

class Progress extends React.Component<ProgressProps> {
    render() {
        const { size = 'md', color = 'default', progress = 0 } = this.props

        return (
            <div
                className={cx('component-progress', {
                    [`component-progress--size-${size}`]: size,
                    [`component-progress--color-${color}`]: color,
                })}
            >
                <div
                    className={cx('component-progress__progress')}
                    style={{ width: `${progress}%` }}
                />
            </div>
        )
    }
}

export { Progress }
export default { Progress }
