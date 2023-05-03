import * as React from 'react'
import { PageContent } from '../../../layouts/PageLayout/components'
import { Alert, Button } from '../../../components'
import { RouteManager } from '../../../containers/RouteManager'

export class IndexView extends React.Component<null, null> {
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
