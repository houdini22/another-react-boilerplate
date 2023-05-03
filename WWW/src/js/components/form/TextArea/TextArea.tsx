import * as React from 'react'

interface TextAreaProps {
    error?: string
    loading?: boolean
    placeholder?: string
}

class TextArea extends React.Component<TextAreaProps, null> {
    render() {
        const { error, loading, ...props } = this.props

        return <textarea {...props} />
    }
}

export { TextArea }
export default { TextArea }
