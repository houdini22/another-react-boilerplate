import * as React from 'react'
import { Button } from '../ui/Button'
import { DeleteIcon } from '../icons'
import styles from '../../../assets/scss/components/_simple-model-cell.scss'
import classnames from 'classnames/bind'
import { Dropdown } from '../index'

const cx = classnames.bind(styles)

export class SimpleModelCell extends React.Component<null, null> {
    render() {
        const { children, onClick, actions = [], icon, dropdown } = this.props

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
            <Button icon={icon} color={'primary'} outline onClick={onClick} block className={cx('component-simple-model-cell')}>
                {children}
                {actions?.length > 0 && (
                    <div className={cx('component-simple-model-cell__actions')}>
                        {actions?.map(({ name, onClick }) => {
                            return <Button key={name} onClick={onClick} color={'danger'} icon={<DeleteIcon />} iconOnly />
                        })}
                    </div>
                )}
            </Button>
        )
    }
}

export default SimpleModelCell
