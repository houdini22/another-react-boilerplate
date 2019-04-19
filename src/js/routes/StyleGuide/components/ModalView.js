import React from 'react'
import PropTypes from 'prop-types'
import { PageContent } from '../../../layouts/PageLayout/components/index'
import {
  Button,
  Row,
  Col,
  Section,
  Alert,
  Label,
} from '../../../components/index'
import { ModalManager } from '../../../containers/Modal/index'
import { createPresentationTab } from '../../../utils/tabs'
import { ComponentsPageHeader } from '../../../components/common/ComponentsPageHeader'

class ModalView extends React.Component {
  render() {
    const { createPresentationTab } = this.props

    return (
      <PageContent>
        <ComponentsPageHeader title="Modal" component="Modal" />
        <Section>
          <Row>
            <Col xs={3}>
              {createPresentationTab(
                'Basic',
                <Row>
                  <Col xs={12}>
                    <ModalManager>
                      {({ openModal }) => (
                        <Button
                          onClick={() =>
                            openModal({
                              title: <div>Basic Modal.</div>,
                              body: (
                                <div>
                                  <p>Your content...</p>
                                </div>
                              ),
                              footer: ({ close }) => (
                                <div>
                                  <Button color="info">First button</Button>
                                  <Button color="warning">Second button</Button>
                                  <Button onClick={() => close()}>Close</Button>
                                </div>
                              ),
                            })
                          }
                        >
                          Open
                        </Button>
                      )}
                    </ModalManager>
                  </Col>
                </Row>,
                <Row>
                  <Col xs={12}>
                    <pre>
                      {`<ModalManager>
    {({openModal}) => (
        <Button
            onClick={() => openModal({
                title: (<div>Basic Modal.</div>),
                body: (
                    <div>
                        <p>Your content...</p>
                    </div>
                ),
                footer: ({close}) => (
                    <div>
                        <Button color='info'>First button</Button>
                        <Button color='warning'>Second button</Button>
                        <Button onClick={() => close()}>Close</Button>
                    </div>
                )
            })}
        >
            Open
        </Button>
    )}
</ModalManager>`}
                    </pre>
                  </Col>
                </Row>,
              )}

              {createPresentationTab(
                'No close icon',
                <Row>
                  <Col xs={12}>
                    <ModalManager>
                      {({ openModal }) => (
                        <Button
                          onClick={() =>
                            openModal({
                              title: <div>Basic Modal.</div>,
                              body: (
                                <div>
                                  <p>Your content...</p>
                                </div>
                              ),
                              footer: ({ close }) => (
                                <div>
                                  <Button onClick={() => close()}>Close</Button>
                                </div>
                              ),
                              closeIcon: false,
                            })
                          }
                        >
                          Open
                        </Button>
                      )}
                    </ModalManager>
                  </Col>
                </Row>,
                <Row>
                  <Col xs={12}>
                    <pre>
                      {`<ModalManager>
    {({openModal}) => (
        <Button
            onClick={() => openModal({
                title: (<div>Basic Modal.</div>),
                body: (
                    <div>
                        <p>Your content...</p>
                    </div>
                ),
                footer: ({close}) => (
                    <div>
                        <Button onClick={() => close()}>Close</Button>
                    </div>
                ),
                closeIcon: false,
            })}
        >
            Open
        </Button>
    )}
</ModalManager>`}
                    </pre>
                  </Col>
                </Row>,
              )}

              {createPresentationTab(
                <span>
                  Size <Label color="info">xs</Label>
                </span>,
                <Row>
                  <Col xs={12}>
                    <ModalManager>
                      {({ openModal }) => (
                        <Button
                          onClick={() =>
                            openModal({
                              title: <div>Basic Modal.</div>,
                              body: (
                                <div>
                                  <p>Your content...</p>
                                </div>
                              ),
                              footer: ({ close }) => (
                                <div>
                                  <Button onClick={() => close()}>Close</Button>
                                </div>
                              ),
                              size: 'xs',
                            })
                          }
                        >
                          Open
                        </Button>
                      )}
                    </ModalManager>
                  </Col>
                </Row>,
                <Row>
                  <Col xs={12}>
                    <pre>
                      {`<ModalManager>
    {({openModal}) => (
        <Button
            onClick={() => openModal({
                title: (<div>Basic Modal.</div>),
                body: (
                    <div>
                        <p>Your content...</p>
                    </div>
                ),
                footer: ({close}) => (
                    <div>
                        <Button onClick={() => close()}>Close</Button>
                    </div>
                ),
                size: 'xs',
            })}
        >
            Open
        </Button>
    )}
</ModalManager>`}
                    </pre>
                  </Col>
                </Row>,
              )}

              {createPresentationTab(
                <span>
                  Size <Label color="info">lg</Label>
                </span>,
                <Row>
                  <Col xs={12}>
                    <ModalManager>
                      {({ openModal }) => (
                        <Button
                          onClick={() =>
                            openModal({
                              title: <div>Basic Modal.</div>,
                              body: (
                                <div>
                                  <p>Your content...</p>
                                </div>
                              ),
                              footer: ({ close }) => (
                                <div>
                                  <Button onClick={() => close()}>Close</Button>
                                </div>
                              ),
                              size: 'lg',
                            })
                          }
                        >
                          Open
                        </Button>
                      )}
                    </ModalManager>
                  </Col>
                </Row>,
                <Row>
                  <Col xs={12}>
                    <pre>
                      {`<ModalManager>
    {({openModal}) => (
        <Button
            onClick={() => openModal({
                title: (<div>Basic Modal.</div>),
                body: (
                    <div>
                        <p>Your content...</p>
                    </div>
                ),
                footer: ({close}) => (
                    <div>
                        <Button onClick={() => close()}>Close</Button>
                    </div>
                ),
                size: 'lg',
            })}
        >
            Open
        </Button>
    )}
</ModalManager>`}
                    </pre>
                  </Col>
                </Row>,
              )}

              {createPresentationTab(
                <span>
                  Size <Label color="info">full</Label>
                </span>,
                <Row>
                  <Col xs={12}>
                    <ModalManager>
                      {({ openModal }) => (
                        <Button
                          onClick={() =>
                            openModal({
                              title: <div>Basic Modal.</div>,
                              body: (
                                <div>
                                  <p>Your content...</p>
                                </div>
                              ),
                              footer: ({ close }) => (
                                <div>
                                  <Button onClick={() => close()}>Close</Button>
                                </div>
                              ),
                              size: 'full',
                            })
                          }
                        >
                          Open
                        </Button>
                      )}
                    </ModalManager>
                  </Col>
                </Row>,
                <Row>
                  <Col xs={12}>
                    <pre>
                      {`<ModalManager>
    {({openModal}) => (
        <Button
            onClick={() => openModal({
                title: (<div>Basic Modal.</div>),
                body: (
                    <div>
                        <p>Your content...</p>
                    </div>
                ),
                footer: ({close}) => (
                    <div>
                        <Button onClick={() => close()}>Close</Button>
                    </div>
                ),
                size: 'full',
            })}
        >
            Open
        </Button>
    )}
</ModalManager>`}
                    </pre>
                  </Col>
                </Row>,
              )}
            </Col>
            <Col xs={3}>
              {createPresentationTab(
                <span>
                  Placement <Label color="info">center</Label>
                </span>,
                <Row>
                  <Col xs={12}>
                    <ModalManager>
                      {({ openModal }) => (
                        <Button
                          onClick={() =>
                            openModal({
                              title: <div>Basic Modal.</div>,
                              body: (
                                <div>
                                  <p>Your content...</p>
                                </div>
                              ),
                              footer: ({ close }) => (
                                <div>
                                  <Button onClick={() => close()}>Close</Button>
                                </div>
                              ),
                              placement: 'center',
                            })
                          }
                        >
                          Open
                        </Button>
                      )}
                    </ModalManager>
                  </Col>
                </Row>,
                <Row>
                  <Col xs={12}>
                    <pre>
                      {`<ModalManager>
    {({openModal}) => (
        <Button
            onClick={() => openModal({
                title: (<div>Basic Modal.</div>),
                body: (
                    <div>
                        <p>Your content...</p>
                    </div>
                ),
                footer: ({close}) => (
                    <div>
                        <Button onClick={() => close()}>Close</Button>
                    </div>
                ),
                placement: 'center',
            })}
        >
            Open
        </Button>
    )}
</ModalManager>`}
                    </pre>
                  </Col>
                </Row>,
              )}

              {createPresentationTab(
                <span>
                  Placement
                  <Label color="info">bottom</Label>
                </span>,
                <Row>
                  <Col xs={12}>
                    <ModalManager>
                      {({ openModal }) => (
                        <Button
                          onClick={() =>
                            openModal({
                              title: <div>Basic Modal.</div>,
                              body: (
                                <div>
                                  <p>Your content...</p>
                                </div>
                              ),
                              footer: ({ close }) => (
                                <div>
                                  <Button onClick={() => close()}>Close</Button>
                                </div>
                              ),
                              placement: 'bottom',
                            })
                          }
                        >
                          Open
                        </Button>
                      )}
                    </ModalManager>
                  </Col>
                </Row>,
                <Row>
                  <Col xs={12}>
                    <pre>
                      {`<ModalManager>
    {({openModal}) => (
        <Button
            onClick={() => openModal({
                title: (<div>Basic Modal.</div>),
                body: (
                    <div>
                        <p>Your content...</p>
                    </div>
                ),
                footer: ({close}) => (
                    <div>
                        <Button onClick={() => close()}>Close</Button>
                    </div>
                ),
                placement: 'bottom',
            })}
        >
            Open
        </Button>
    )}
</ModalManager>`}
                    </pre>
                  </Col>
                </Row>,
              )}

              {createPresentationTab(
                <span>
                  Placement <Label color="info">right</Label>
                </span>,
                <Row>
                  <Col xs={12}>
                    <ModalManager>
                      {({ openModal }) => (
                        <Button
                          onClick={() =>
                            openModal({
                              title: <div>Basic Modal.</div>,
                              body: (
                                <div>
                                  <p>Your content...</p>
                                </div>
                              ),
                              footer: ({ close }) => (
                                <div>
                                  <Button onClick={() => close()}>Close</Button>
                                </div>
                              ),
                              placement: 'right',
                            })
                          }
                        >
                          Open
                        </Button>
                      )}
                    </ModalManager>
                  </Col>
                </Row>,
                <Row>
                  <Col xs={12}>
                    <pre>
                      {`<ModalManager>
    {({openModal}) => (
        <Button
            onClick={() => openModal({
                title: (<div>Basic Modal.</div>),
                body: (
                    <div>
                        <p>Your content...</p>
                    </div>
                ),
                footer: ({close}) => (
                    <div>
                        <Button onClick={() => close()}>Close</Button>
                    </div>
                ),
                placement: 'right',
            })}
        >
            Open
        </Button>
    )}
</ModalManager>`}
                    </pre>
                  </Col>
                </Row>,
              )}
            </Col>
            <Col xs={3}>
              {createPresentationTab(
                <span>
                  Color <Label color="info">primary</Label>
                </span>,
                <Row>
                  <Col xs={12}>
                    <ModalManager>
                      {({ openModal }) => (
                        <Button
                          onClick={() =>
                            openModal({
                              title: <div>Basic Modal.</div>,
                              body: (
                                <div>
                                  <p>Your content...</p>
                                </div>
                              ),
                              footer: ({ close }) => (
                                <div>
                                  <Button onClick={() => close()}>Close</Button>
                                </div>
                              ),
                              color: 'primary',
                            })
                          }
                        >
                          Open
                        </Button>
                      )}
                    </ModalManager>
                  </Col>
                </Row>,
                <Row>
                  <Col xs={12}>
                    <pre>
                      {`<ModalManager>
    {({openModal}) => (
        <Button
            onClick={() => openModal({
                title: (<div>Basic Modal.</div>),
                body: (
                    <div>
                        <p>Your content...</p>
                    </div>
                ),
                footer: ({close}) => (
                    <div>
                        <Button onClick={() => close()}>Close</Button>
                    </div>
                ),
                color: 'primary',
            })}
        >
            Open
        </Button>
    )}
</ModalManager>`}
                    </pre>
                  </Col>
                </Row>,
              )}

              {createPresentationTab(
                <span>
                  Color <Label color="info">info</Label>
                </span>,
                <Row>
                  <Col xs={12}>
                    <ModalManager>
                      {({ openModal }) => (
                        <Button
                          onClick={() =>
                            openModal({
                              title: <div>Basic Modal.</div>,
                              body: (
                                <div>
                                  <p>Your content...</p>
                                </div>
                              ),
                              footer: ({ close }) => (
                                <div>
                                  <Button onClick={() => close()}>Close</Button>
                                </div>
                              ),
                              color: 'info',
                            })
                          }
                        >
                          Open
                        </Button>
                      )}
                    </ModalManager>
                  </Col>
                </Row>,
                <Row>
                  <Col xs={12}>
                    <pre>
                      {`<ModalManager>
    {({openModal}) => (
        <Button
            onClick={() => openModal({
                title: (<div>Basic Modal.</div>),
                body: (
                    <div>
                        <p>Your content...</p>
                    </div>
                ),
                footer: ({close}) => (
                    <div>
                        <Button onClick={() => close()}>Close</Button>
                    </div>
                ),
                color: 'info',
            })}
        >
            Open
        </Button>
    )}
</ModalManager>`}
                    </pre>
                  </Col>
                </Row>,
              )}
              {createPresentationTab(
                <span>
                  Color <Label color="info">warning</Label>
                </span>,
                <Row>
                  <Col xs={12}>
                    <ModalManager>
                      {({ openModal }) => (
                        <Button
                          onClick={() =>
                            openModal({
                              title: <div>Basic Modal.</div>,
                              body: (
                                <div>
                                  <p>Your content...</p>
                                </div>
                              ),
                              footer: ({ close }) => (
                                <div>
                                  <Button onClick={() => close()}>Close</Button>
                                </div>
                              ),
                              color: 'warning',
                            })
                          }
                        >
                          Open
                        </Button>
                      )}
                    </ModalManager>
                  </Col>
                </Row>,
                <Row>
                  <Col xs={12}>
                    <pre>
                      {`<ModalManager>
    {({openModal}) => (
        <Button
            onClick={() => openModal({
                title: (<div>Basic Modal.</div>),
                body: (
                    <div>
                        <p>Your content...</p>
                    </div>
                ),
                footer: ({close}) => (
                    <div>
                        <Button onClick={() => close()}>Close</Button>
                    </div>
                ),
                color: 'warning',
            })}
        >
            Open
        </Button>
    )}
</ModalManager>`}
                    </pre>
                  </Col>
                </Row>,
              )}

              {createPresentationTab(
                <span>
                  Color <Label color="info">danger</Label>
                </span>,
                <Row>
                  <Col xs={12}>
                    <ModalManager>
                      {({ openModal }) => (
                        <Button
                          onClick={() =>
                            openModal({
                              title: <div>Basic Modal.</div>,
                              body: (
                                <div>
                                  <p>Your content...</p>
                                </div>
                              ),
                              footer: ({ close }) => (
                                <div>
                                  <Button onClick={() => close()}>Close</Button>
                                </div>
                              ),
                              color: 'danger',
                            })
                          }
                        >
                          Open
                        </Button>
                      )}
                    </ModalManager>
                  </Col>
                </Row>,
                <Row>
                  <Col xs={12}>
                    <pre>
                      {`<ModalManager>
    {({openModal}) => (
        <Button
            onClick={() => openModal({
                title: (<div>Basic Modal.</div>),
                body: (
                    <div>
                        <p>Your content...</p>
                    </div>
                ),
                footer: ({close}) => (
                    <div>
                        <Button onClick={() => close()}>Close</Button>
                    </div>
                ),
                color: 'danger',
            })}
        >
            Open
        </Button>
    )}
</ModalManager>`}
                    </pre>
                  </Col>
                </Row>,
              )}

              {createPresentationTab(
                <span>
                  Color <Label color="info">success</Label>
                </span>,
                <Row>
                  <Col xs={12}>
                    <ModalManager>
                      {({ openModal }) => (
                        <Button
                          onClick={() =>
                            openModal({
                              title: <div>Basic Modal.</div>,
                              body: (
                                <div>
                                  <p>Your content...</p>
                                </div>
                              ),
                              footer: ({ close }) => (
                                <div>
                                  <Button onClick={() => close()}>Close</Button>
                                </div>
                              ),
                              color: 'success',
                            })
                          }
                        >
                          Open
                        </Button>
                      )}
                    </ModalManager>
                  </Col>
                </Row>,
                <Row>
                  <Col xs={12}>
                    <pre>
                      {`<ModalManager>
    {({openModal}) => (
        <Button
            onClick={() => openModal({
                title: (<div>Basic Modal.</div>),
                body: (
                    <div>
                        <p>Your content...</p>
                    </div>
                ),
                footer: ({close}) => (
                    <div>
                        <Button onClick={() => close()}>Close</Button>
                    </div>
                ),
                color: 'success',
            })}
        >
            Open
        </Button>
    )}
</ModalManager>`}
                    </pre>
                  </Col>
                </Row>,
              )}
            </Col>
            <Col xs={3}>
              {createPresentationTab(
                <span>Confirm</span>,
                <Row>
                  <Col xs={12}>
                    <ModalManager>
                      {({ openModal }) => (
                        <Button
                          onClick={() =>
                            openModal({
                              type: 'confirm',
                              color: 'danger',
                              animation: 'sweet',
                              title: <div>Confirm deleting.</div>,
                              body: (
                                <div>
                                  <Alert color="info" outline>
                                    This cannot be undone.
                                  </Alert>
                                  <p>Are you sure do delete this item?</p>
                                </div>
                              ),
                              onCancel: ({
                                button: { setIsLoading, setColor },
                                modal: { disableButtons, close },
                              }) => {
                                close()
                              },
                              onConfirm: ({
                                button: { setIsLoading, setColor },
                                modal: { disableButtons, close },
                              }) => {
                                disableButtons().then(() => {
                                  setIsLoading(true)
                                  setColor('warning')

                                  setTimeout(() => {
                                    close()
                                  }, 3000)
                                })
                              },
                            })
                          }
                        >
                          Open
                        </Button>
                      )}
                    </ModalManager>
                  </Col>
                </Row>,
                <Row>
                  <Col xs={12}>
                    <pre>
                      {`<ModalManager>
    {({openModal}) => (
        <Button
            onClick={() => openModal({
                type: 'confirm',
                color: 'danger',
                animation: 'sweet',
                title: (<div>Confirm deleting.</div>),
                body: (
                    <div>
                        <Alert color="info" outline>This cannot be
                            undone.</Alert>
                        <p>Are you sure do delete this item?</p>
                    </div>
                ),
                onCancel: ({
                               button: {
                                   setIsLoading,
                                   setColor
                               },
                               modal: {
                                   disableButtons,
                                   close
                               }
                           }) => {
                    close();
                },
                onConfirm: ({
                                button: {
                                    setIsLoading,
                                    setColor
                                },
                                modal: {
                                    disableButtons,
                                    close
                                }
                            }) => {
                    disableButtons().then(() => {
                        setIsLoading(true);
                        setColor("warning");

                        setTimeout(() => {
                            close();
                        }, 3000);
                    })
                },
            })}
        >
            Open
        </Button>
    )}
</ModalManager>`}
                    </pre>
                  </Col>
                </Row>,
              )}

              {createPresentationTab(
                <span>Alert</span>,
                <Row>
                  <Col xs={12}>
                    <ModalManager>
                      {({ openModal }) => (
                        <Button
                          onClick={() =>
                            openModal({
                              type: 'alert',
                              color: 'info',
                              animation: 'sweet',
                              body: (
                                <div>
                                  <Alert color="success" outline>
                                    Item was saved successfully.
                                  </Alert>
                                </div>
                              ),
                              onOK: ({
                                button: { setIsLoading, setColor },
                                modal: { close },
                              }) => {
                                close()
                              },
                            })
                          }
                        >
                          Open
                        </Button>
                      )}
                    </ModalManager>
                  </Col>
                </Row>,
                <Row>
                  <Col xs={12}>
                    <pre>
                      {`<ModalManager>
    {({openModal}) => (
        <Button
            onClick={() => openModal({
                type: 'alert',
                color: 'info',
                animation: 'sweet',
                body: (
                    <div>
                        <Alert color="success" outline>
                            Item was saved successfully.
                        </Alert>
                    </div>
                ),
                onOK: ({
                               button: {
                                   setIsLoading,
                                   setColor
                               },
                               modal: {
                                   close
                               }
                           }) => {
                    close();
                },
            })}
        >
            Open
        </Button>
    )}
</ModalManager>`}
                    </pre>
                  </Col>
                </Row>,
              )}
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
