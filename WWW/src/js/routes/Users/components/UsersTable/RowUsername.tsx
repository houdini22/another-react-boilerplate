import * as React from 'react'
import { User } from '../../../../../types.d'

interface FiltersProps {
    user: User
}

export class RowUsername extends React.Component<FiltersProps, null> {
    render() {
        const { user } = this.props

        return (
            <div>
                {user.name}
                <br />
                {user.email}
            </div>
        )
    }
}

export default RowUsername
