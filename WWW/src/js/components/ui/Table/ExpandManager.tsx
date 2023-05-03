import * as React from 'react'

interface ExpandManagerProps {}

class ExpandManager extends React.Component<ExpandManagerProps, null> {
    elementsToExpand = {}
    state = {
        currentExpanded: '',
    }
    addExpand(name, element) {
        this.elementsToExpand[name] = element
    }
    expand(name) {
        const { currentExpanded } = this.state

        if (currentExpanded === name) {
            this.setState({ currentExpanded: '' })
        } else {
            this.setState({ currentExpanded: name })
        }
    }
    renderExpand() {
        const { currentExpanded } = this.state

        if (currentExpanded && this.elementsToExpand[currentExpanded]) {
            return this.elementsToExpand[currentExpanded]
        }

        return null
    }
    render() {
        const { children } = this.props

        const renderProps = {
            addExpand: this.addExpand.bind(this),
            expand: this.expand.bind(this),
        }

        return (
            <>
                {children(renderProps)}
                {this.renderExpand()}
            </>
        )
    }
}

export { ExpandManager }
export default { ExpandManager }
