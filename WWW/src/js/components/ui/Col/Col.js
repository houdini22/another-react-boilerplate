import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames/bind'
import styles from '../../../../assets/scss/components/_col.scss'

const cx = classNames.bind(styles)

class Col extends React.Component {
    render() {
        const { children, className, xs, sm, md, lg, ...props } = this.props

        return (
            <div
                {...props}
                className={cx('component-col', {
                    [className]: className,
                    [`component-col--xs-${Number(xs)}`]: Number(xs),
                    [`component-col--sm-${Number(sm)}`]: Number(sm),
                    [`component-col--md-${Number(md)}`]: Number(md),
                    [`component-col--lg-${Number(lg)}`]: Number(lg),
                })}
            >
                {children}
            </div>
        )
    }
}

Col.propTypes = {
    children: PropTypes.any.isRequired,
    className: PropTypes.string,
    xs: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    sm: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    md: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    lg: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    style: PropTypes.object,
}

export { Col }
export default { Col }
