import * as React from "react"
import classNames from 'classnames/bind'
import styles from '../../../../assets/scss/layout/_layout.scss'

const cx = classNames.bind(styles)

interface PageContentProps {
    children: any;
    className: string;
}

class PageContent extends React.Component<PageContentProps> {
    componentDidMount() {
        window.scrollTo(0, 0)
    }

    render() {
        const { children, className } = this.props

        return (
            <div
                className={cx('layout__container__content__content', {
                    [className]: className,
                })}
            >
                {children}
            </div>
        )
    }
}

export { PageContent }
export default { PageContent }
