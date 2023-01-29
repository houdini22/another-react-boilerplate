import * as React from 'react'
import { PageContent } from '../../../layouts/PageLayout/components'
import { Col, Row, Card, PageHeader, Alert, Button } from '../../../components'
import { FaInfo as InfoIcon } from 'react-icons/fa'
import config from '../../../config'
import { RouteManager } from '../../../containers/RouteManager'

export class IndexView extends React.Component {
    render() {
        return (
            <PageContent>
                <RouteManager>
                    {({ navigate }) => (
                        <div style={{ padding: 30 }}>
                            <Alert color={'info'}>Your account was successfully activated.</Alert>
                            <Button block color={'success'} onClick={() => navigate('/login')}>
                                Login
                            </Button>
                        </div>
                    )}
                </RouteManager>
            </PageContent>
        )
    }
}

export default IndexView
