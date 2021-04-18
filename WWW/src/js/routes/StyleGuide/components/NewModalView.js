import React from 'react'
import PropTypes from 'prop-types'
import { PageContent } from '../../../layouts/PageLayout/components/index'
import { Row, Col, Section } from '../../../components/index'
import { createPresentationTab } from '../../../utils/tabs'
import { ComponentsPageHeader } from '../../../components/common/ComponentsPageHeader'
import { NewModal } from '../../../components'
import { NewModalFormContainer } from './NewModalFormContainer'

class NewModalView extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            options: {
                color: 'default',
                updateCount: 0,
                size: 'md',
            },
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
        const { options } = this.state
        const {
            options: { color, size },
        } = this.state
        const { colSize2 } = this.props

        return (
            <PageContent>
                <ComponentsPageHeader title="NewModal" component="NewModal" />
                <Section>
                    <Row>
                        <Col xs={3}>
                            <NewModal.Container
                                visible={true}
                                closeIcon={true}
                                color={color}
                                size={size}
                                animation={'sweet'}
                            >
                                <NewModal.Header>Header</NewModal.Header>
                                <NewModal.Body>
                                    <NewModalFormContainer
                                        options={options}
                                        setOptions={this.setOptions.bind(this)}
                                        colSize1={colSize2}
                                    />
                                </NewModal.Body>
                                <NewModal.Footer>Footer</NewModal.Footer>
                            </NewModal.Container>
                        </Col>
                    </Row>
                </Section>
            </PageContent>
        )
    }
}

NewModalView.propTypes = {
    createPresentationTab: PropTypes.func.isRequired,
}

NewModalView.defaultProps = {
    createPresentationTab: createPresentationTab,
}

export { NewModalView }
export default { NewModalView }
