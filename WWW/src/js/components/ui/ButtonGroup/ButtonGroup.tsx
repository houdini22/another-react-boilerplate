import * as React from 'react'
import classnames from 'classnames/bind'
import { AppContext } from '../../../../index'
import { LoadingOverlay } from '../LoadingOverlay'
import styles from '../../../../assets/scss/components/_button-group.scss'

const cx = classnames.bind(styles)

interface ButtonGroupProps {
    children: any
    color: string
    outline: boolean
    block: boolean
    rounded: boolean
    roundless: boolean
    isLoading: boolean
    disabled: boolean
    borderless: boolean
    size: string
}

class ButtonGroup extends React.Component<ButtonGroupProps> {
    constructor(props) {
        super(props)
    }

    render() {
        const {
            size = 'md',
            color = 'primary',
            outline,
            children,
            block,
            rounded,
            roundless,
            isLoading,
            disabled,
            borderless,
        } = this.props

        return (
            <AppContext.Provider
                value={{
                    buttonGroupSize: size,
                    buttonGroupColor: color,
                    buttonGroupOutline: outline,
                    buttonGroupDisabled: disabled,
                    buttonGroupBorderless: borderless,
                }}
            >
                <div
                    className={cx('component-button-group', {
                        [`component-button-group--outline`]: outline,
                        [`component-button-group--block`]: block,
                        [`component-button-group--rounded`]: rounded,
                        [`component-button-group--roundless`]: roundless,
                        [`component-button-group--borderless`]: borderless,
                    })}
                >
                    {children}
                    {isLoading && <LoadingOverlay size="xs" />}
                </div>
            </AppContext.Provider>
        )
    }
}

export { ButtonGroup }
export default { ButtonGroup }
