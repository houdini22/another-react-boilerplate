import * as React from 'react'
import { Button } from '../../index'
import { AddIcon } from '../../icons'
import { RouteManager } from '../../../containers'

interface ButtonAddProps {
    href: string
}

export class ButtonAdd extends React.Component<ButtonAddProps, null> {
    render() {
        const { href } = this.props

        return (
            <RouteManager>
                {({ navigate }) => (
                    <Button
                        icon={<AddIcon />}
                        iconOnly
                        color={'success'}
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
