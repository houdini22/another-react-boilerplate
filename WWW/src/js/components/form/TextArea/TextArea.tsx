import React from 'react'

interface TextAreaProps {
    error: string;
}

class TextArea extends React.Component<TextAreaProps> {
    render() {
        const { error, loading, ...props } = this.props

        return <textarea {...props} />
    }
}

export { TextArea }
export default { TextArea }
