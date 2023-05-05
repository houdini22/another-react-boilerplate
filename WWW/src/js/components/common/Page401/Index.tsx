import * as React from 'react'
import { PageContent } from '../../../layouts/PageLayout/components'
import styles from '../../../../assets/scss/routes/page401.scss'
import classNames from 'classnames/bind'
import { Alert } from '../../ui/Alert'
import { AccessDisabledIcon } from '../../icons'
const cx = classNames.bind(styles)
export class Page401 extends React.Component<null, null> {
    render() {
        return (
            <PageContent>
                <div className={cx('route--page-401')}>
                    <Alert color={'danger'} withIcon={<AccessDisabledIcon />} iconHighlighted alignCenter>
                        You have no permissions to visit this page.
                    </Alert>
                </div>
            </PageContent>
        )
    }
}

export default Page401
