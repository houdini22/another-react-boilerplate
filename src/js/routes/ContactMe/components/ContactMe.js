import React from 'react'
import { PageContent } from '../../../layouts/PageLayout/components/index'
import {
  Row,
  Col,
  Card,
  Copyright,
  PageHeader,
  Breadcrumbs,
} from '../../../components/index'
import { ContactFormContainer } from '../../../components/common/ContactForm/ContactFormContainer'
import { FaInfo as InfoIcon } from 'react-icons/fa'
import { IoIosMail as ContactIcon } from 'react-icons/io'
import config from '../../../config'

export class ContactMeView extends React.Component {
  render() {
    return (
      <PageContent>
        <PageHeader.Container>
          <PageHeader.Title>Contact me</PageHeader.Title>
        </PageHeader.Container>
        <Row>
          <Col xs={6}>
            <Card
              header={
                <h1>
                  <ContactIcon /> Contact form
                </h1>
              }
            >
              <ContactFormContainer type="full" />
            </Card>
          </Col>
          <Col xs={6}>
            <Card
              header={
                <h1>
                  <InfoIcon /> About
                </h1>
              }
            >
              <p>
                <strong>{config.texts.frameworkName}</strong> framework
              </p>
              <p>
                <strong>version:</strong> {config.texts.version}
              </p>
              <Copyright />
            </Card>
          </Col>
        </Row>
      </PageContent>
    )
  }
}

export default ContactMeView
