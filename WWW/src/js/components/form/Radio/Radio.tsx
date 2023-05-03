import * as React from 'react'
import classNames from 'classnames/bind'
import _ from 'lodash'
import Transition from 'react-transition-group/Transition'
import styles1 from '../../../../assets/scss/components/_radio.scss'
import styles2 from '../../../../assets/scss/_animations.scss'

interface RadioProps {
    error?: string
    onChange?(checked: boolean): any
    checked?: boolean
    disabled?: boolean
    value?: boolean | string
    loading?: boolean
}

interface RadioState {
    checked: boolean
}

const cx = classNames.bind({ ...styles1, ...styles2 })

class Radio extends React.Component<RadioProps, RadioState> {
    constructor(props) {
        super(props)

        this.state = {
            checked: Boolean(props.checked) || false,
        }
    }

    handleClick(e) {
        e.preventDefault()

        const { checked } = this.state
        const { onChange, disabled } = this.props

        if (_.isFunction(onChange) && !disabled) {
            this.setState({ checked: !checked }, () => {
                onChange(!checked)
            })
        }
    }

    render() {
        const { error, disabled, loading, ...props } = this.props
        const { checked } = this.state

        return (
            <div
                className={cx('component-radio', {
                    'component-radio--is-checked': checked,
                    'component-radio--is-disabled': disabled,
                })}
                onClick={(e) => this.handleClick(e)}
            >
                {checked && (
                    <Transition timeout={0}>
                        {() => {
                            return (
                                <span className={cx('animation--fade-in')}>
                                    <span className={cx('component-radio__dot')} />
                                </span>
                            )
                        }}
                    </Transition>
                )}
                {!checked && (
                    <Transition timeout={0}>
                        {() => (
                            <span className={cx('animation--fade-out')}>
                                <span className={cx('component-radio__dot')} />
                            </span>
                        )}
                    </Transition>
                )}
                <input
                    {...props}
                    disabled={disabled}
                    checked={checked}
                    type="radio"
                    className={cx('component-radio__input')}
                />
            </div>
        )
    }
}

export { Radio }
