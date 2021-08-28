import * as React from "react"
import classNames from 'classnames/bind'
import _ from 'lodash'
import { FaCheck as CheckIcon } from 'react-icons/fa'
import Transition from 'react-transition-group/Transition'
import styles1 from '../../../../assets/scss/components/_checkbox.scss'
import styles2 from '../../../../assets/scss/_animations.scss'

const cx = classNames.bind({ ...styles1, ...styles2 })

interface CheckboxProps {
    error?: string;
    onChange?(checked: boolean): any;
    checked?: boolean;
    disabled?: boolean;
    value?: boolean | string
    loading?: boolean;
}

class Checkbox extends React.Component<CheckboxProps> {
    el = null;

    handleClick(e) {
        const { onChange, disabled } = this.props

        if (_.isFunction(onChange) && !disabled) {
            this.el.click()
            onChange(this.el.checked)
        }
    }

    render() {
        const { error, disabled, loading, checked, ...props } = this.props

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
