import * as React from 'react'
import { Button } from '../ui/Button'
import { DeleteIcon } from '../icons'
import styles from '../../../assets/scss/components/_simple-model-cell.scss'
import classnames from 'classnames/bind'
import { Dropdown } from '../index'

const cx = classnames.bind(styles)

export class SimpleModelCell extends React.Component<null, null> {
    render() {
        const { children, onClick, actions = [], icon, dropdown, color, block, size, disabled } = this.props

        if (dropdown) {
            return (
                <Dropdown.Container>
                    <Dropdown.Trigger
                        component={Button}
                        componentProps={{
                            color: 'primary',
                            outline: true,
                            icon,
                            block: true,
                            size,
                        }}
                    >
                        {children}
                    </Dropdown.Trigger>
                    <Dropdown.Menu>
                        {dropdown
                            .filter(({ display }) => display)
                            .map(({ children, color, onClick }, i) => (
                                <Dropdown.Item key={i} color={color} onClick={onClick}>
                                    {children}
                                </Dropdown.Item>
                            ))}
                    </Dropdown.Menu>
                </Dropdown.Container>
            )
        }

        return (
            <Button
                disabled={disabled}
                size={'xs'}
                icon={icon}
                color={color}
                outline
                onClick={onClick}
                block={block}
                className={cx('component-simple-model-cell')}
            >
                <div>{children}</div>
                {actions?.length > 0 && (
                    <>
                        {actions?.map(({ name, onClick }) => {
                            return <Button key={name} onClick={onClick} color={'danger'} icon={<DeleteIcon />} iconOnly />
                        })}
                    </>
                )}
            </Button>
        )
    }
}

export default SimpleModelCell
