import * as React from "react"
import { PageContent } from '../../../layouts/PageLayout/components'
import { Card } from '../../../components/ui/Card'
import { FaKey as KeyIcon } from 'react-icons/fa'
import classNames from 'classnames/bind'
import styles1 from '../../../../assets/scss/_helpers.scss'
import styles2 from '../../../../assets/scss/_animations.scss'

const cx = classNames.bind({ ...styles1, ...styles2 })

export class RateView extends React.Component {
    render() {
        return (
            <PageContent>
                <Card
                    style={{
                        height: '100%',
                    }}
                    header={
                        <h1>
                            <KeyIcon /> Restricted area.
                        </h1>
                    }
                >
                    <p
                        className={cx('text-center', 'animation--heartbeat')}
                        style={{
                            fontSize: '50px',
                            position: 'absolute',
                            left: 0,
                            right: 0,
                            top: '50%',
                        }}
                    >
                        Hello world!
                    </p>
                </Card>
            </PageContent>
        )
    }
}

export default RateView
