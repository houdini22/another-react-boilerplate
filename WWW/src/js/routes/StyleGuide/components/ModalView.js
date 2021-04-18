import React from 'react'
import PropTypes from 'prop-types'
import { PageContent } from '../../../layouts/PageLayout/components/index'
import { Row, Col, Section, Button } from '../../../components/index'
import { createPresentationTab } from '../../../utils/tabs'
import { ComponentsPageHeader } from '../../../components/common/ComponentsPageHeader'
import { Modal } from '../../../components'
import { ModalFormContainer } from './ModalFormContainer'

class ModalView extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            options: {
                color: 'default',
                updateCount: 0,
                size: 'md',
                placement: '',
                animation: '',
            },
            opened: true,
        }
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
        const { options, opened } = this.state
        const {
            options: { color, size, placement, animation },
        } = this.state
        const { colSize2 } = this.props

        return (
            <PageContent>
                <ComponentsPageHeader title="Modal" component="Modal" />
                <Section>
                    <Row>
                        <Col xs={3}>
                            <Button
                                onClick={() => {
                                    this.setState({ opened: true })
                                }}
                            >
                                Open Modal
                            </Button>
                            <Modal.Container
                                visible={opened}
                                color={color}
                                size={size}
                                animation={animation}
                                placement={placement}
                            >
                                <Modal.Header
                                    closeIcon
                                    close={() => {
                                        this.setState({ opened: false })
                                    }}
                                >
                                    Header
                                </Modal.Header>
                                <Modal.Body>
                                    <ModalFormContainer
                                        options={options}
                                        setOptions={this.setOptions.bind(this)}
                                        colSize1={colSize2}
                                    />
                                </Modal.Body>
                                <Modal.Footer>
                                    <Button color={'secondary'}>Cancel</Button>
                                    <Button color={'success'}>OK</Button>
                                </Modal.Footer>
                            </Modal.Container>
                        </Col>
                    </Row>
                </Section>
            </PageContent>
        )
    }
}

ModalView.propTypes = {
    createPresentationTab: PropTypes.func.isRequired,
}

ModalView.defaultProps = {
    createPresentationTab: createPresentationTab,
}

export { ModalView }
export default { ModalView }
