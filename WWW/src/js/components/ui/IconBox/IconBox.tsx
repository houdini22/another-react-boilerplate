import * as React from "react"
import { LoadingOverlay } from '../../index'

interface IconBoxProps {
    icon: any;
    children: any;
    isLoading: boolean;
}

class IconBox extends React.Component<IconBoxProps> {
    render() {
        const { icon, children, isLoading } = this.props

        return (
            <div className="icon-box">
                {!isLoading && (
                    <div>
                        <div className="icon-box__icon">{icon}</div>
                        <div className="icon-box__content">{children}</div>
                    </div>
                )}
                {isLoading && <LoadingOverlay />}
            </div>
        )
    }
}

export { IconBox }
export default { IconBox }
