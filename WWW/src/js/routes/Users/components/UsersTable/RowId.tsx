import * as React from 'react'

interface FiltersProps {
    user: Object
}

export class RowId extends React.Component<FiltersProps, null> {
    render() {
        const { user } = this.props

        return <>{user.id}</>
    }
}

export default RowId
