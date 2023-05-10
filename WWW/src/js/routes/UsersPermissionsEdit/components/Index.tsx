import * as React from 'react'
import { Col, Row } from '../../../components'
import { PageContent } from '../../../layouts/PageLayout/components'
import { Header } from './Header'
import { EditSettings } from './Edit/Index'
import { TitleManager, RouteManager, PermissionsManager } from '../../../containers'
import { Manager } from '../../../containers/Config'

export class CmsSettingsView extends React.Component<null, null> {
    render() {
        return (
            <TitleManager>
                {({ setTitleSegments }) => {
                    setTitleSegments(['Users', 'CMS', 'Settings'])

                    return (
                        <RouteManager>
                            {({}) => (
                                <Manager>
                                    {({ config, isLoading, setIsLoading }) => (
                                        <PageContent>
                                            <Header />
                                            <Row>
                                                <Col xs={12}>
                                                    <EditSettings config={config} isLoading={isLoading} setIsLoading={setIsLoading} />
                                                </Col>
                                            </Row>
                                        </PageContent>
                                    )}
                                </Manager>
                            )}
                        </RouteManager>
                    )
                }}
            </TitleManager>
        )
    }
}

export default CmsSettingsView
