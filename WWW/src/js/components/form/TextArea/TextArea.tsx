import * as React from "react"

interface TextAreaProps {
    error: string;
    loading: boolean;
}

class TextArea extends React.Component<TextAreaProps> {
    render() {
        const { error, loading, ...props } = this.props

        return <textarea {...props} />
    }
}

export { TextArea }
export default { TextArea }
