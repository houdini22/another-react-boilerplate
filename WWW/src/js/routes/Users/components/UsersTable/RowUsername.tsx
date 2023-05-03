import * as React from 'react'

interface FiltersProps {
    user: Object
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
