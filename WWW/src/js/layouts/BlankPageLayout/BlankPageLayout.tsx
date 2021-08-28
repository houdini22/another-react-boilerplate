import * as React from "react"
import classNames from 'classnames/bind'
import styles from '../../../assets/scss/layout/_layout.scss'

const cx = classNames.bind(styles)

interface BlankPageLayoutProps {
    children: any;
    common: object;
    setConnectionErrorModalVisible(): any;
}

class BlankPageLayout extends React.Component<BlankPageLayoutProps> {
    render() {
        const { children } = this.props
        return (
            <div
                className={cx({
                    'layout--blank-page': true,
                    layout: true,
                })}
            >
                {children}
            </div>
        )
    }
}

export { BlankPageLayout }
export default { BlankPageLayout }
