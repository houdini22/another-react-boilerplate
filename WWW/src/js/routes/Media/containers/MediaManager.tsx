import * as React from 'react'
import { selectors as commonSelectors, actions as commonActions } from '../../../reducers/files'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { AuthManager } from '../../../containers/AuthManager'

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
        const { fetch } = this.props
        fetch()
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

const MediaManager = connect(mapStateToProps, (dispatch) => {
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
})(MediaManagerBase)

export { MediaManager }
export default { MediaManager }
