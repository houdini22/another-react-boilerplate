import * as React from 'react'
import { selectors as commonSelectors, actions as commonActions } from '../../../reducers/files'
import { connect } from 'react-redux'
import { bindActionCreators, compose } from 'redux'
import { AuthManager } from '../../../containers/AuthManager'
import { withRouter } from '../../../helpers/router'
import { parseQueryString } from '../../../containers/RouteManager/RouteManager'

interface UsersManagerProps {
    children: any
    fetch: Function
    files: Array
    setIsLoading: Function
    deleteFile: Function
    isLoading: boolean
    uploadProgress: number
    uploadFiles: Function
    editFile: Function
}

class MediaManagerBase extends React.Component<UsersManagerProps> {
    componentDidMount() {
        const {
            fetch,
            location: { search },
        } = this.props
        const query = parseQueryString(search)
        fetch(query)
    }

    render() {
        const { children, files, setIsLoading, isLoading, fetch, deleteFile, uploadProgress, uploadFiles, editFile } =
            this.props
        const renderProps = {
            files,
            setIsLoading,
            isLoading,
            fetch,
            deleteFile,
            uploadProgress,
            uploadFiles,
            editFile,
        }

        return (
            <>
                <AuthManager>{() => <>{children(renderProps)}</>}</AuthManager>
            </>
        )
    }
}

const mapStateToProps = (state) => ({
    files: commonSelectors['getFiles'](state),
    isLoading: commonSelectors['getIsLoading'](state),
    uploadProgress: commonSelectors['getUploadProgress'](state),
})

const MediaManager = compose(
    connect(mapStateToProps, (dispatch) => {
        return bindActionCreators(
            {
                fetch: commonActions.fetch,
                setIsLoading: commonActions.setIsLoading,
                deleteFile: commonActions.deleteFile,
                uploadFiles: commonActions.uploadFiles,
                editFile: commonActions.editFile,
            },
            dispatch,
        )
    }),
    withRouter,
)(MediaManagerBase)

export { MediaManager }
export default { MediaManager }
