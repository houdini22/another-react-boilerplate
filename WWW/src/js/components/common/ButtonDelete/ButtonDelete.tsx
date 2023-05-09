import * as React from 'react'
import { Button } from '../../index'
import { DeleteIcon } from '../../icons'

interface ButtonDeleteProps {
    onClick: (e: any) => any
}

export class ButtonDelete extends React.Component<ButtonDeleteProps, null> {
    render() {
        const { onClick } = this.props

        return <Button icon={<DeleteIcon />} iconOnly color={'danger'} onClick={(e) => onClick(e)} />
    }
}
