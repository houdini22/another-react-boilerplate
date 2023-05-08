import * as React from 'react'
import { Button } from '../../index'
import { RouteManager } from '../../../containers/'
import { EditIcon } from '../../icons'

interface ButtonEditProps {
    href: string
}

export class ButtonEdit extends React.Component<ButtonEditProps, null> {
    render() {
        const { href } = this.props

        return (
            <RouteManager>
                {({ navigate }) => (
                    <Button
                        icon={<EditIcon />}
                        iconOnly
                        color={'warning'}
                        onClick={(e) => {
                            e.stopPropagation()
                            navigate(href)
                        }}
                    />
                )}
            </RouteManager>
        )
    }
}
