import * as React from 'react'
import { Col, Row } from '../../../components'
import { PageContent } from '../../../layouts/PageLayout/components'
import { Header } from './Header'
import { TitleManager, RouteManager } from '../../../containers'
import Manager from '../../Cms/components/Manager'
import { EditSettings } from './Edit/Index'

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
                                    {({ isLoading, setIsLoading }) => (
                                        <PageContent>
                                            <Header />
                                            <Row>
                                                <Col xs={12}>
                                                    <EditSettings isLoading={isLoading} setIsLoading={setIsLoading} />
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
