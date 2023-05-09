import * as React from 'react'
import { Button } from '../../index'
import { AddIcon } from '../../icons'
import { RouteManager } from '../../../containers'

interface ButtonAddProps {
    href: string
}

export class ButtonAdd extends React.Component<ButtonAddProps, null> {
    render() {
        const { href, onClick } = this.props

        return (
            <RouteManager>
                {({ navigate }) => (
                    <Button
                        icon={<AddIcon />}
                        iconOnly
                        color={'success'}
                        onClick={(e) => {
                            e.stopPropagation()
                            if (typeof onClick === 'function') {
                                onClick(e)
                            } else if (!!href) {
                                navigate(href)
                            }
                        }}
                    />
                )}
            </RouteManager>
        )
    }
}
