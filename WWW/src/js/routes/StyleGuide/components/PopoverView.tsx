import * as React from "react"
import { PageContent } from '../../../layouts/PageLayout/components'
import {
    Row,
    Col,
    Section,
    Label,
    Popover,
    Button,
} from '../../../components'
import { createPresentationTab as _createPresentationTab, generateCode } from '../../../utils/tabs'
import { PopoverFormContainer } from './PopoverFormContainer'
import { ComponentsPageHeader } from '../../../components/common/ComponentsPageHeader'
import classNames from 'classnames/bind'
import styles from '../../../../assets/scss/_animations.scss'

const cx = classNames.bind(styles)

interface PopoverViewProps {
    colSize1: number,
    colSize2: number,
    createPresentationTab(): any;
}

interface PopoverViewState {
    options: {
        color: string;
        outline: boolean;
        pixelsWidth: number;
        placement: string;
        clean: boolean;
        disableOutsideClick: boolean;
        trigger: string;
        updateCount: number;
    }
}

class PopoverView extends React.Component<PopoverViewProps, PopoverViewState> {
    constructor(props) {
        super(props)
        this.state = {
            options: {
                color: 'default',
                outline: false,
                pixelsWidth: 300,
                placement: 'left-top',
                clean: false,
                disableOutsideClick: false,
                trigger: 'click',
                updateCount: 0,
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
        const { colSize1 = 4, colSize2 = 12, createPresentationTab = _createPresentationTab } = this.props
        const { options } = this.state
        const {
            outline,
            pixelsWidth,
            placement,
            clean,
            color,
            disableOutsideClick,
            trigger,
        } = options

        const code = generateCode('Popover', options, 'Content')

        return (
            <PageContent>
                <ComponentsPageHeader title="Popover" component="Popover" />
                <Section>
                    <Row>
                        <Col xs={6}>
                            <PopoverFormContainer
                                options={options}
                                setOptions={this.setOptions.bind(this)}
                                colSize1={colSize2}
                            />
                        </Col>
                        <Col xs={6}>
                            {createPresentationTab(
                                <span>
                                    Options
                                    {outline && (
                                        <Label size="xs" color="info">
                                            outline
                                        </Label>
                                    )}
                                    {pixelsWidth && (
                                        <Label size="xs" color="info">
                                            pixelsWidth
                                        </Label>
                                    )}
                                    {placement && (
                                        <Label size="xs" color="info">
                                            placement
                                        </Label>
                                    )}
                                    {clean && (
                                        <Label size="xs" color="info">
                                            clean
                                        </Label>
                                    )}
                                    {disableOutsideClick && (
                                        <Label size="xs" color="info">
                                            disableOutsideClick
                                        </Label>
                                    )}
                                </span>,
                                <Popover.Container
                                    placement={placement}
                                    outline={outline}
                                    color={color}
                                    pixelsWidth={pixelsWidth}
                                    disableOutsideClick={disableOutsideClick}
                                    trigger={trigger}
                                >
                                    <Popover.Trigger>
                                        <Button>Trigger</Button>
                                    </Popover.Trigger>
                                    <Popover.Content
                                        className={cx(
                                            'animation--swing-in-top-fwd',
                                        )}
                                    >
                                        {({ close }) => (
                                            <div>
                                                Content{' '}
                                                <a
                                                    href="#"
                                                    onClick={(e) => {
                                                        e.preventDefault()
                                                        close()
                                                    }}
                                                >
                                                    Close
                                                </a>
                                            </div>
                                        )}
                                    </Popover.Content>
                                </Popover.Container>,
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

export { PopoverView }
export default { PopoverView }
