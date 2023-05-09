import * as React from 'react'
import { Button, Popover } from '../../index'
import { DetailsIcon } from '../../icons'

interface ButtonDeleteProps {
    content: any
}

export class ButtonDetails extends React.Component<ButtonDeleteProps, null> {
    render() {
        const { content } = this.props
        return (
            <Popover.Container placement={'left-center'} pixelsWidth={300} trigger={'hover'}>
                <Popover.Trigger>
                    <Button icon={<DetailsIcon />} iconOnly color={'info'} />
                </Popover.Trigger>
                <Popover.Content>{content}</Popover.Content>
            </Popover.Container>
        )
    }
}
