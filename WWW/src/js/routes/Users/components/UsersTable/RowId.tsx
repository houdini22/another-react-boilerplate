import * as React from 'react'
import { User } from '../../../../../types.d'

interface FiltersProps {
    user: User
}

export class RowId extends React.Component<FiltersProps, null> {
    render() {
        const { user } = this.props

        return <>{user.id}</>
    }
}

export default RowId
