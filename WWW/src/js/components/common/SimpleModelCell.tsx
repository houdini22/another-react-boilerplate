import * as React from 'react'
import { Button } from '../ui/Button'
import { DeleteIcon, EditIcon } from '../icons'
import styles from '../../../assets/scss/components/_simple-model-cell.scss'
import classnames from 'classnames/bind'
import { Dropdown } from '../index'

const cx = classnames.bind(styles)

export class SimpleModelCell extends React.Component<null, null> {
    render() {
        const { children, onClick, actions = [], icon, dropdown, color, block, size, disabled, outline } = this.props

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
                onClick={onClick}
                block={block}
                className={cx('component-simple-model-cell')}
                outline={outline}
            >
                <span>{children}</span>
                {actions?.length > 0 && (
                    <>
                        {actions?.map(({ name, onClick }) => {
                            let icon, color
                            if (name === 'delete') {
                                icon = <DeleteIcon />
                                color = 'danger'
                            } else if (name === 'edit') {
                                icon = <EditIcon />
                                color = 'warning'
                            }
                            return <Button key={name} onClick={onClick} color={color} icon={icon} iconOnly />
                        })}
                    </>
                )}
            </Button>
        )
    }
}

export default SimpleModelCell
