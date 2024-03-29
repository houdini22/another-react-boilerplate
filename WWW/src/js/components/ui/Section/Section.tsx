import * as React from 'react'
import classNames from 'classnames/bind'
import styles from '../../../../assets/scss/components/_section.scss'

const cx = classNames.bind(styles)

interface SectionProps {
    children: any
    style?: object
}

class Section extends React.Component<SectionProps, null> {
    render() {
        const { children, style } = this.props

        return (
            <div className={cx('component-section')} style={style}>
                <div className={cx('component-section__content')}>{children}</div>
            </div>
        )
    }
}

export { Section }
export default { Section }
