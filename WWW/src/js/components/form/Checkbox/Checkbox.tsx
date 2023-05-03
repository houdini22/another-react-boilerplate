import * as React from 'react'
import classNames from 'classnames/bind'
import _ from 'lodash'
import { FaCheck as CheckIcon } from 'react-icons/fa'
import Transition from 'react-transition-group/Transition'
import jQuery from 'jquery'
import styles1 from '../../../../assets/scss/components/_checkbox.scss'
import styles2 from '../../../../assets/scss/_animations.scss'

const cx = classNames.bind({ ...styles1, ...styles2 })

interface CheckboxProps {
    error?: string
    onChange?(checked: boolean): any
    checked?: boolean
    disabled?: boolean
    value?: boolean | string
    loading?: boolean
}

interface CheckboxState {
    checked: boolean
}

class Checkbox extends React.Component<CheckboxProps, CheckboxState> {
    el = null

    state = {
        checked: false,
    }

    componentDidMount() {
        const { checked } = this.props
        this.setState({ checked })
    }

    handleClick() {
        const { checked } = this.state
        const { onChange, disabled } = this.props
        jQuery(this.el).trigger('click')
        if (_.isFunction(onChange) && !disabled) {
            onChange(this.el.checked)
        }
        this.setState({ checked: !checked })
    }

    render() {
        const { error, disabled, loading, ...props } = this.props
        const { checked } = this.state

        return (
            <div
                className={cx('component-checkbox', {
                    'component-checkbox--is-checked': checked,
                    'component-checkbox--is-disabled': disabled,
                })}
                onClick={(e) => this.handleClick(e)}
            >
                <span>
                    {checked && (
                        <Transition timeout={0}>
                            {() => {
                                return (
                                    <span className={cx('animation--fade-in')}>
                                        <CheckIcon />
                                    </span>
                                )
                            }}
                        </Transition>
                    )}
                </span>

                <input
                    {...props}
                    disabled={disabled}
                    type="checkbox"
                    className={cx('component-checkbox__input')}
                    ref={(el) => (this.el = el)}
                />
            </div>
        )
    }
}

export { Checkbox }
export default { Checkbox }
