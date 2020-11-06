import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames/bind'
import _ from 'lodash'
import { Modal } from './Modal'
import { Button } from '../Button/index'
import styles1 from '../../../../assets/scss/components/_modal.scss'
import styles2 from '../../../../assets/scss/_helpers.scss'

const cx = classNames.bind({ ...styles1, ...styles2 })

class ConfirmModal extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      buttonsDisabled: false,
    }
    this.disableButtons = this.disableButtons.bind(this)
  }

  disableButtons() {
    return new Promise((resolve) => {
      this.setState({ buttonsDisabled: true }, () => {
        resolve()
      })
    })
  }

  render() {
    const {
      id,
      title,
      body,
      onCancel,
      onConfirm,
      close,
      color,
      size,
      placement,
      animation,
    } = this.props
    const { buttonsDisabled } = this.state

    return (
      <Modal
        id={id}
        closeIcon={false}
        title={title}
        body={body}
        color={color}
        size={size}
        placement={placement}
        close={close}
        animation={animation}
        footer={
          <div className={cx('text-right')}>
            <Button
              disabled={buttonsDisabled}
              color="secondary"
              onClick={(event, { setColor, setIsLoading }) => {
                if (_.isFunction(onCancel)) {
                  onCancel({
                    button: {
                      setColor,
                      setIsLoading,
                    },
                    modal: {
                      disableButtons: this.disableButtons,
                      close,
                    },
                  })
                }
              }}
            >
              Cancel
            </Button>{' '}
            <Button
              disabled={buttonsDisabled}
              color={color}
              onClick={(event, { setColor, setIsLoading }) => {
                if (_.isFunction(onConfirm)) {
                  onConfirm({
                    button: {
                      setColor,
                      setIsLoading,
                    },
                    modal: {
                      disableButtons: this.disableButtons,
                      close,
                    },
                  })
                }
              }}
            >
              Confirm
            </Button>
          </div>
        }
      />
    )
  }
}

ConfirmModal.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element.isRequired,
    PropTypes.array.isRequired,
    PropTypes.string.isRequired,
  ]),
  title: PropTypes.oneOfType([
    PropTypes.element.isRequired,
    PropTypes.array.isRequired,
    PropTypes.string.isRequired,
  ]),
  body: PropTypes.oneOfType([
    PropTypes.element.isRequired,
    PropTypes.array.isRequired,
    PropTypes.string.isRequired,
  ]),
  onCancel: PropTypes.func,
  onConfirm: PropTypes.func,
  close: PropTypes.func.isRequired,
  className: PropTypes.string,
  id: PropTypes.string.isRequired,
  color: PropTypes.string,
  size: PropTypes.string,
  placement: PropTypes.string,
  animation: PropTypes.string,
}

ConfirmModal.defaultProps = {}

export { ConfirmModal }
export default { ConfirmModal }
