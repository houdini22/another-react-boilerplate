import * as React from 'react'
import { PageContent } from '../../../layouts/PageLayout/components'
import { Row, Col, Section, Card, Badge, Label, TextField } from '../../../components'
import { CardFormContainer } from './CardFormContainer'
import { FaImage as CardIcon } from 'react-icons/fa'
import { createPresentationTab as _createPresentationTab } from '../../../utils/tabs'
import { ComponentsPageHeader } from '../../../components/common/ComponentsPageHeader'

interface CardViewProps {
    colSize1?: number
    colSize2?: number
    createPresentationTab?(): any
}

interface CardViewState {
    options: {
        color: string
        size: string
        withCloseIcon: boolean
        withMinimizeIcon: boolean
        header: boolean
        headerActions: boolean
        isLoading: boolean
        noBorderTop: boolean
        footer: boolean
        footerType: string
        updateCount: number
        solidBackground: boolean
    }
}

class CardView extends React.Component<CardViewProps, CardViewState> {
    constructor(props) {
        super(props)
        this.state = {
            options: {
                color: 'default',
                size: 'md',
                withCloseIcon: false,
                withMinimizeIcon: false,
                header: false,
                headerActions: false,
                isLoading: false,
                noBorderTop: false,
                footer: false,
                footerType: '',
                updateCount: 0,
                solidBackground: false,
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
        const { colSize1 = 4, createPresentationTab = _createPresentationTab } = this.props
        const { options } = this.state
        const {
            size,
            withCloseIcon,
            withMinimizeIcon,
            header,
            headerActions,
            isLoading,
            noBorderTop,
            footer,
            footerType,
            color,
            solidBackground,
        } = options

        return (
            <PageContent>
                <ComponentsPageHeader title="Card" component="Card" />
                <Row>
                    <Col xs={12} md={6}>
                        <Section>
                            <CardFormContainer options={options} setOptions={this.setOptions} />
                        </Section>
                    </Col>
                    <Col xs={12} md={6}>
                        <Section>
                            {createPresentationTab(
                                <span>
                                    Options
                                    {withCloseIcon && (
                                        <Label size="xs" color="info">
                                            withCloseIcon
                                        </Label>
                                    )}
                                    {withMinimizeIcon && (
                                        <Label size="xs" color="info">
                                            withMinimizeIcon
                                        </Label>
                                    )}
                                    {header && (
                                        <Label size="xs" color="info">
                                            header
                                        </Label>
                                    )}
                                    {headerActions && (
                                        <Label size="xs" color="info">
                                            headerActions
                                        </Label>
                                    )}
                                    {isLoading && (
                                        <Label size="xs" color="info">
                                            isLoading
                                        </Label>
                                    )}
                                    {noBorderTop && (
                                        <Label size="xs" color="info">
                                            noBorderTop
                                        </Label>
                                    )}{' '}
                                    {footer && (
                                        <Label size="xs" color="info">
                                            footer
                                        </Label>
                                    )}{' '}
                                    {footerType && (
                                        <Label size="xs" color="info">
                                            footerType
                                        </Label>
                                    )}
                                </span>,
                                <Card
                                    key={color}
                                    color={color}
                                    size={size}
                                    withCloseIcon={withCloseIcon}
                                    withMinimizeIcon={withMinimizeIcon}
                                    solidBackground={solidBackground}
                                    header={
                                        header ? (
                                            <h1>
                                                {' '}
                                                <CardIcon /> Header
                                            </h1>
                                        ) : (
                                            ''
                                        )
                                    }
                                    headerActions={
                                        headerActions
                                            ? [
                                                  <Badge key="badge-info" color="info">
                                                      33
                                                  </Badge>,

                                                  <TextField placeholder="search" />,
                                              ]
                                            : undefined
                                    }
                                    isLoading={isLoading}
                                    noBorderTop={noBorderTop}
                                    footer={footer ? <div>Footer</div> : null}
                                    footerType={footerType}
                                >
                                    {color} {size}
                                </Card>,
                                '',
                                {
                                    colSize: colSize1,
                                },
                            )}
                        </Section>
                    </Col>
                </Row>
            </PageContent>
        )
    }
}

export { CardView }
export default { CardView }
