import * as React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import config from '../config'

interface TitleManagerProps {
    children: any
}

class TitleManagerBase extends React.Component<TitleManagerProps, null> {
    state = {
        titleSegments: [],
    }

    shouldComponentUpdate(nextProps: Readonly<TitleManagerProps>, nextState: Readonly<null>, nextContext: any): boolean {
        const { titleSegments } = this.state

        if (nextState.titleSegments.join('') === titleSegments.join('')) {
            return false
        }

        return true
    }

    setTitleSegments(segments) {
        this.setState({ titleSegments: [config.siteTitle, ...segments] }, () => {
            const { titleSegments } = this.state

            document.title = titleSegments.join(config.siteTitleSeparator)
        })
    }

    render() {
        const { children } = this.props

        const renderProps = {
            setTitleSegments: this.setTitleSegments.bind(this),
        }

        return children(renderProps)
    }
}

const mapStateToProps = (state) => ({})

const TitleManager = connect(mapStateToProps, (dispatch) => {
    return bindActionCreators({}, dispatch)
})(TitleManagerBase)

export { TitleManager }
