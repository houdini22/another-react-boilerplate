import * as React from 'react'
import { Typography } from '../../../../components'

class DetailsUserPrimaryInfoRow extends React.Component {
    render() {
        const { user } = this.props

        return (
            <>
                <Typography.Container>
                    <h2>
                        <b>{user.name}</b>
                    </h2>
                </Typography.Container>
                <Typography.Container>
                    <h3>
                        <b>{user.email}</b>
                    </h3>
                </Typography.Container>
            </>
        )
    }
}

export { DetailsUserPrimaryInfoRow }
export default { DetailsUserPrimaryInfo: DetailsUserPrimaryInfoRow }
