import * as React from 'react'
import { Button } from '../ui/Button'
import { DeleteIcon } from '../icons'
import styles from '../../../assets/scss/components/_simple-model-cell.scss'
import classnames from 'classnames/bind'
const cx = classnames.bind(styles)
export class SimpleModelCell extends React.Component<null, null> {
    render() {
        const { children, onClick, actions = [], icon } = this.props
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
