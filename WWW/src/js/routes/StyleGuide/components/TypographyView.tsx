import * as React from "react"
import { PageContent } from '../../../layouts/PageLayout/components'
import { Row, Col, Section, Card } from '../../../components'
import { Typography } from '../../../components'
import { ComponentsPageHeader } from '../../../components/common/ComponentsPageHeader'
import classNames from 'classnames/bind'
import styles from '../../../../assets/scss/components/_typography.scss'

const cx = classNames.bind(styles)

class TypographyView extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <PageContent>
                <ComponentsPageHeader
                    title="Typography"
                    component="Typography"
                />
                <Section>
                    <Row>
                        <Col xs={6}>
                            <Card header={<h1>Headings</h1>}>
                                <Typography.Container>
                                    <h1>
                                        This is H1 heading{' '}
                                        <small>with subheading</small>
                                    </h1>
                                    <h2>
                                        This is H2 heading{' '}
                                        <small>with subheading</small>
                                    </h2>
                                    <h3>
                                        This is H3 heading{' '}
                                        <small>with subheading</small>
                                    </h3>
                                    <h4>
                                        This is H4 heading{' '}
                                        <small>with subheading</small>
                                    </h4>
                                    <h5>
                                        This is H5 heading{' '}
                                        <small>with subheading</small>
                                    </h5>
                                    <h6>
                                        This is H6 heading{' '}
                                        <small>with subheading</small>
                                    </h6>
                                </Typography.Container>
                            </Card>
                        </Col>
                        <Col xs={6}>
                            <Card header={<h1>Lists</h1>}>
                                <Typography.Container>
                                    <h5>Ordered list</h5>
                                    <ol>
                                        <li>First item</li>
                                        <li>Second item</li>
                                        <li>
                                            Third item
                                            <ol>
                                                <li>Nested first item</li>
                                                <li>Nested second item</li>
                                                <li>
                                                    Nested third item
                                                    <ol>
                                                        <li>
                                                            Nested first item
                                                        </li>
                                                        <li>
                                                            Nested second item
                                                        </li>
                                                        <li>
                                                            Nested third item
                                                        </li>
                                                    </ol>
                                                </li>
                                            </ol>
                                        </li>
                                    </ol>

                                    <h5>Unordered list</h5>
                                    <ul>
                                        <li>First item</li>
                                        <li>Second item</li>
                                        <li>
                                            Third item
                                            <ul>
                                                <li>Nested first item</li>
                                                <li>Nested second item</li>
                                                <li>
                                                    Nested third item
                                                    <ul>
                                                        <li>
                                                            Nested first item
                                                        </li>
                                                        <li>
                                                            Nested second item
                                                        </li>
                                                        <li>
                                                            Nested third item
                                                        </li>
                                                    </ul>
                                                </li>
                                            </ul>
                                        </li>
                                    </ul>
                                </Typography.Container>
                            </Card>
                        </Col>
                        <Col xs={6}>
                            <Card header={<h1>Inline elements</h1>}>
                                <Typography.Container>
                                    <p>
                                        You can use the mark tag to{' '}
                                        <mark>highlight</mark> text.
                                    </p>
                                    <p>
                                        <s>
                                            This line of text is meant to be
                                            treated as no longer accurate.
                                        </s>
                                    </p>
                                    <p>
                                        <u>
                                            This line of text will render as
                                            underlined
                                        </u>
                                    </p>
                                    <p>
                                        <small>
                                            This line of text is meant to be
                                            treated as fine print.
                                        </small>
                                    </p>
                                    <p>
                                        <strong>
                                            This line rendered as bold text.
                                        </strong>
                                    </p>
                                    <p>
                                        <em>
                                            This line rendered as italicized
                                            text.
                                        </em>
                                    </p>
                                </Typography.Container>
                            </Card>
                        </Col>
                        <Col xs={6}>
                            <Card header={<h1>Text colors</h1>}>
                                <Typography.Container>
                                    <p className={cx('text-default')}>
                                        default text color
                                    </p>
                                    <p className={cx('text-primary')}>
                                        primary text color
                                    </p>
                                    <p className={cx('text-secondary')}>
                                        secondary text color
                                    </p>
                                    <p className={cx('text-info')}>
                                        info text color
                                    </p>
                                    <p className={cx('text-success')}>
                                        success text color
                                    </p>
                                    <p className={cx('text-warning')}>
                                        warning text color
                                    </p>
                                    <p className={cx('text-danger')}>
                                        danger text color
                                    </p>
                                </Typography.Container>
                            </Card>
                        </Col>
                        <Col xs={6}>
                            <Card header={<h1>Blocks</h1>}>
                                <Typography.Container>
                                    <blockquote>
                                        <p>
                                            Two things are infinite: the
                                            universe and human stupidity; and
                                            I'm not sure about the universe.
                                        </p>
                                        <footer>Albert Einstein</footer>
                                    </blockquote>
                                </Typography.Container>
                            </Card>
                        </Col>
                    </Row>
                </Section>
            </PageContent>
        )
    }
}

export { TypographyView }
export default { TypographyView }
