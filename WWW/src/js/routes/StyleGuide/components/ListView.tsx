import * as React from 'react'
import { PageContent } from '../../../layouts/PageLayout/components'
import { Row, Col, Section, List } from '../../../components'
import { ComponentsPageHeader } from '../../../components/common/ComponentsPageHeader'
import { createPresentationTab } from '../../../utils/tabs'
import { ListFormContainer } from './ListFormContainer'

class ListView extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            options: {
                color: 'default',
                size: 'md',
                separated: false,
                updateCount: 0,
            },
        }
        this.setOptions = this.setOptions.bind(this)
    }

    setOptions(newOptions) {
        const {
            options: { updateCount },
        } = this.state
        this.setState({
            options: { ...newOptions, updateCount: updateCount + 1 },
        })
    }

    render() {
        const { options } = this.state
        const { color, size, separated } = options

        return (
            <PageContent>
                <ComponentsPageHeader title="List" component="List" />
                <Row>
                    <Col xs={12} md={6}>
                        <Section>
                            <ListFormContainer options={options} setOptions={this.setOptions} />
                        </Section>
                    </Col>
                    <Col xs={12} md={6}>
                        <Section>
                            {createPresentationTab(
                                <span>Options</span>,
                                <Row>
                                    <Col xs={12}>
                                        <List.Container color={color} size={size} separated={separated}>
                                            <List.Item>
                                                <List.Image url="https://via.placeholder.com/100" />
                                                <List.ItemContent>
                                                    <h1>Header</h1>
                                                    <p>
                                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce
                                                        feugiat, libero eget finibus finibus, neque lectus posuere
                                                        lorem, sit amet placerat nulla ipsum eget nulla. Suspendisse
                                                        tempus sapien a pulvinar porttitor. Etiam lacinia suscipit
                                                        facilisis. Vivamus vel feugiat nulla. Duis eu tempor sapien, id
                                                        vestibulum ante. Aliquam vitae placerat purus. Maecenas porta,
                                                        urna ut condimentum lobortis, eros quam suscipit lacus, eu
                                                        faucibus sapien ex ut risus. Vestibulum lacinia mauris ut magna
                                                        elementum maximus.
                                                    </p>
                                                    <p>
                                                        Maecenas non ligula tincidunt, porta sem quis, rutrum justo.
                                                        Curabitur et dui et neque pulvinar viverra. Vestibulum ultricies
                                                        venenatis urna. Duis maximus, libero sit amet tempus elementum,
                                                        est urna congue enim, sed tristique sapien nulla id justo. Sed
                                                        pellentesque, mauris vel luctus malesuada, mauris mauris tempus
                                                        risus, at porta purus libero ac nunc. In tortor odio, pharetra
                                                        quis suscipit non, eleifend eu nunc. Maecenas a tincidunt metus,
                                                        in semper sem. Integer mattis elementum odio at condimentum.
                                                        Suspendisse sagittis metus mauris, et mollis nisl posuere at.
                                                        Etiam vitae ex in arcu consectetur interdum ac eget ante.
                                                        Aliquam accumsan massa non magna malesuada sagittis. Aliquam
                                                        placerat ullamcorper felis, eu pharetra enim iaculis in. Aliquam
                                                        lobortis volutpat venenatis.
                                                    </p>
                                                </List.ItemContent>
                                            </List.Item>
                                            <List.Item>
                                                <List.ItemContent>
                                                    <h1>Header</h1>
                                                    <p>
                                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce
                                                        feugiat, libero eget finibus finibus, neque lectus posuere
                                                        lorem, sit amet placerat nulla ipsum eget nulla. Suspendisse
                                                        tempus sapien a pulvinar porttitor. Etiam lacinia suscipit
                                                        facilisis. Vivamus vel feugiat nulla. Duis eu tempor sapien, id
                                                        vestibulum ante. Aliquam vitae placerat purus. Maecenas porta,
                                                        urna ut condimentum lobortis, eros quam suscipit lacus, eu
                                                        faucibus sapien ex ut risus. Vestibulum lacinia mauris ut magna
                                                        elementum maximus.
                                                    </p>
                                                    <p>
                                                        Maecenas non ligula tincidunt, porta sem quis, rutrum justo.
                                                        Curabitur et dui et neque pulvinar viverra. Vestibulum ultricies
                                                        venenatis urna. Duis maximus, libero sit amet tempus elementum,
                                                        est urna congue enim, sed tristique sapien nulla id justo. Sed
                                                        pellentesque, mauris vel luctus malesuada, mauris mauris tempus
                                                        risus, at porta purus libero ac nunc. In tortor odio, pharetra
                                                        quis suscipit non, eleifend eu nunc. Maecenas a tincidunt metus,
                                                        in semper sem. Integer mattis elementum odio at condimentum.
                                                        Suspendisse sagittis metus mauris, et mollis nisl posuere at.
                                                        Etiam vitae ex in arcu consectetur interdum ac eget ante.
                                                        Aliquam accumsan massa non magna malesuada sagittis. Aliquam
                                                        placerat ullamcorper felis, eu pharetra enim iaculis in. Aliquam
                                                        lobortis volutpat venenatis.
                                                    </p>
                                                </List.ItemContent>
                                            </List.Item>
                                        </List.Container>
                                        <br />
                                        <br />
                                        <br />
                                        <List.Container color={color} size={size} separated={separated}>
                                            <List.Item>
                                                <List.ItemContent>
                                                    <p>Lorem ipsum dolor sit amet.</p>
                                                </List.ItemContent>
                                            </List.Item>
                                            <List.Item>
                                                <List.ItemContent>
                                                    <p>Lorem ipsum dolor sit amet.</p>
                                                </List.ItemContent>
                                            </List.Item>
                                        </List.Container>
                                    </Col>
                                </Row>,
                                '',
                            )}
                        </Section>
                    </Col>
                </Row>
            </PageContent>
        )
    }
}

export { ListView }
export default { ListView }
