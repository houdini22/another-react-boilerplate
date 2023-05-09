import * as React from 'react'
import { User } from '../../../../../types.d'

interface RowIdProps {
    user: User
}

export class RowId extends React.Component<RowIdProps, null> {
    render() {
        const { user } = this.props

        return <>{user.id}</>
    }
}

export default RowId
