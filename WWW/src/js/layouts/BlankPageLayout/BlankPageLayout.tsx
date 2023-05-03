import * as React from 'react'
import classNames from 'classnames/bind'
import styles from '../../../assets/scss/layout/_layout.scss'
import { ConnectionErrorModal } from '../PageLayout/components/ConnectionErrorModal'

const cx = classNames.bind(styles)

interface BlankPageLayoutProps {
    children: any
    common: object
    setConnectionErrorModalVisible(): any
}

class BlankPageLayout extends React.Component<BlankPageLayoutProps, null> {
    render() {
        const {
            children,
            connectionErrorModalVisible: { message, code },
            setConnectionErrorModalVisible,
        } = this.props
        return (
            <div
                className={cx({
                    'layout--blank-page': true,
                    layout: true,
                })}
            >
                {children}
                <ConnectionErrorModal
                    visible={code === 'ERR_NETWORK'}
                    message={message}
                    close={() => setConnectionErrorModalVisible({})}
                />
            </div>
        )
    }
}

export { BlankPageLayout }
