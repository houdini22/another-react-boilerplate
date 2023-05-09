import * as React from 'react'
import classNames from 'classnames/bind'
import styles from '../../../../assets/scss/components/_col.scss'

const cx = classNames.bind(styles)

interface ColProps {
    children: any
    className?: string
    xs?: number | string
    sm?: number | string
    md?: number | string
    lg?: number | string
    style?: object
    onClick?: () => void
    alignRight?: boolean
    alignCenter?: boolean
}

class Col extends React.Component<ColProps, null> {
    render() {
        const { children, className, xs, sm, md, lg, alignRight, alignCenter, ...props } = this.props

        return (
            <div
                {...props}
                className={cx('component-col', {
                    [className]: className,
                    [`component-col--xs-${Number(xs)}`]: Number(xs),
                    [`component-col--sm-${Number(sm)}`]: Number(sm),
                    [`component-col--md-${Number(md)}`]: Number(md),
                    [`component-col--lg-${Number(lg)}`]: Number(lg),
                    [`component-col--align-right`]: alignRight,
                    [`component-col--align-center`]: alignCenter,
                })}
            >
                {children}
            </div>
        )
    }
}

export { Col }
export default { Col }
