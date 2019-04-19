import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames/bind'
import _ from 'lodash'
import { Modal } from './Modal'
import { Button } from '../Button/index'
import styles from '../../../../assets/scss/components/_modal.scss'

const cx = classNames.bind(styles)

class AlertModal extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const {
      id,
      title = 'Alert',
      body,
      onOK,
      close,
      color,
      size,
      placement,
      animation,
    } = this.props

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
          <Button
            color={color}
            onClick={(event, { setColor, setIsLoading }) => {
              if (_.isFunction(onOK)) {
                onOK({
                  button: {
                    setColor,
                    setIsLoading,
                  },
                  modal: {
                    close,
                  },
                })
              } else {
                close()
              }
            }}
          >
            OK
          </Button>
        }
      />
    )
  }
}

AlertModal.propTypes = {
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
  onOK: PropTypes.func,
  close: PropTypes.func.isRequired,
  className: PropTypes.string,
  id: PropTypes.string.isRequired,
  color: PropTypes.string,
  size: PropTypes.string,
  placement: PropTypes.string,
  animation: PropTypes.string,
}

AlertModal.defaultProps = {}

export { AlertModal }
export default { AlertModal }
