import React from 'react'
import { FaFileImage as ImageIcon } from 'react-icons/fa'
import { PageContent } from '../../../layouts/PageLayout/components/index'
import {
    Header,
    Row,
    Col,
    Section,
    IconBox,
    Tabs,
    PageHeader,
    Breadcrumbs,
} from '../../../components/index'

class IconBoxView extends React.Component {
    render() {
        return (
            <PageContent>
                <PageHeader.Container>
                    <PageHeader.Title>IconBox</PageHeader.Title>
                </PageHeader.Container>
                <Section>
                    <Row>
                        <Col xs={6}>
                            <Header>IconBox</Header>
                            <Tabs
                                items={[
                                    {
                                        label: 'Presentation',
                                        content: () => (
                                            <Row>
                                                <Col xs={6}>
                                                    <IconBox
                                                        icon={<ImageIcon />}
                                                    >
                                                        Content
                                                    </IconBox>
                                                </Col>
                                                <Col xs={6}>
                                                    <IconBox
                                                        isLoading
                                                        icon={<ImageIcon />}
                                                    >
                                                        Content
                                                    </IconBox>
                                                </Col>
                                            </Row>
                                        ),
                                    },
                                    {
                                        label: 'Code',
                                        content: () => (
                                            <div>
                                                <Row>
                                                    <Col xs={6}>
                                                        <pre>
                                                            {`<IconBox icon={<ImageIcon/>}>
    Content
</IconBox>`}
                                                        </pre>
                                                    </Col>
                                                    <Col xs={6}>
                                                        <pre>
                                                            {`<IconBox isLoading icon={<ImageIcon/>}>
    Content
</IconBox>`}
                                                        </pre>
                                                    </Col>
                                                </Row>
                                            </div>
                                        ),
                                    },
                                ]}
                            />
                        </Col>
                    </Row>
                </Section>
            </PageContent>
        )
    }
}

export { IconBoxView }
export default { IconBoxView }
