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
import config from '../../../config'
import { Manager } from './Manager'

export class FaqView extends React.Component {
  render() {
    return (
      <PageContent>
        {/*<PageHeader.Container>
          <PageHeader.Title>What's new?</PageHeader.Title>
        </PageHeader.Container>
        <Row>
          <Col xs={12}>
            <Card>
              <p>
                <strong>Version:</strong> {config.texts.version}
                <br />
              </p>
              <Copyright />
            </Card>
          </Col>
        </Row>*/}
        <Manager>
          {({ todo, addTodo, deleteTodo }) => (
            <div>
              {todo.length}
              <input type={'text'} ref={e => (this._refInput = e)} />
              <textarea ref={e => (this._refTextarea = e)} />
              <a
                href={'#'}
                onClick={e => {
                  e.preventDefault()
                  addTodo(this._refInput.value, this._refTextarea.value).then(
                    () => {},
                  )
                }}
              >
                Add TODO
              </a>

              {todo.map(({ name, text, id }) => {
                return (
                  <div>
                    <p>Name: {name}</p>
                    <p>Text: {text}</p>
                    <p>
                      <a
                        href={'#'}
                        onClick={e => {
                          e.preventDefault()
                          deleteTodo(id)
                        }}
                      >
                        Delete
                      </a>
                    </p>
                  </div>
                )
              })}
            </div>
          )}
        </Manager>
      </PageContent>
    )
  }
}

export default FaqView
