import React from 'react'
import { PageContent } from '../../../layouts/PageLayout/components/index'
import { Row, Col, Section, Button, Label } from '../../../components/index'
import { createPresentationTab, generateCode } from '../../../utils/tabs'
import { ButtonFormContainer } from './ButtonFormContainer'
import { FaImage as ButtonIcon } from 'react-icons/fa'
import PropTypes from 'prop-types'
import { ComponentsPageHeader } from '../../../components/common/ComponentsPageHeader'

class ButtonView extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            options: {
                color: 'default',
                size: 'md',
                isLoading: false,
                block: false,
                disabled: false,
                rounded: false,
                outline: false,
                roundless: false,
                borderless: false,
                icon: false,
                iconOnly: false,
                updateCount: 0,
                navigationHref: '',
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
        const { colSize1, createPresentationTab } = this.props
        const { options } = this.state
        const {
            size,
            isLoading,
            block,
            disabled,
            rounded,
            outline,
            roundless,
            borderless,
            icon,
            iconOnly,
            color,
            navigationHref,
        } = options

        const code = generateCode('Button', options, 'Click me!')

        return (
            <PageContent>
                <ComponentsPageHeader title="Button" component="Button" />
                <Section>
                    <Row>
                        <Col xs={6}>
                            <ButtonFormContainer
                                options={options}
                                setOptions={this.setOptions}
                            />
                        </Col>
                        <Col xs={6}>
                            {createPresentationTab(
                                <span />,
                                <Button
                                    key={color}
                                    color={color}
                                    outline={outline}
                                    size={size}
                                    isLoading={isLoading}
                                    block={block}
                                    disabled={disabled}
                                    rounded={rounded}
                                    roundless={roundless}
                                    borderless={borderless}
                                    icon={icon ? <ButtonIcon /> : undefined}
                                    iconOnly={iconOnly}
                                    navigationHref={navigationHref}
                                >
                                    Click me!
                                </Button>,
                                code,
                                {
                                    colSize: colSize1,
                                },
                            )}
                        </Col>
                    </Row>
                </Section>
            </PageContent>
        )
    }
}

ButtonView.propTypes = {
    colSize1: PropTypes.number,
    colSize2: PropTypes.number,
    createPresentationTab: PropTypes.func.isRequired,
}

ButtonView.defaultProps = {
    colSize1: 4,
    colSize2: 12,
    createPresentationTab: createPresentationTab,
}

export { ButtonView }
export default { ButtonView }
