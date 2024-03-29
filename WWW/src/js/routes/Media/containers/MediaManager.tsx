import * as React from 'react'
import { selectors as commonSelectors, actions as commonActions } from '../../../reducers/files'
import { connect } from 'react-redux'
import { bindActionCreators, compose } from 'redux'
import { AuthManager } from '../../../containers'
import { withRouter } from '../../../helpers/router'
import { selectors } from '../../../reducers/cms-pages'

interface UsersManagerProps {
    children: any
    setIsLoading: Function
    deleteFile: Function
    isLoading: boolean
    uploadProgress: number
    uploadFiles: Function
    editFile: Function
}

class MediaManagerBase extends React.Component<UsersManagerProps, null> {
    render() {
        const { children, files, setIsLoading, isLoading, deleteFile, uploadProgress, uploadFiles, editFile, setUploadProgress } = this.props
        const renderProps = {
            files,
            setIsLoading,
            isLoading,
            deleteFile,
            uploadProgress,
            uploadFiles,
            editFile,
            setUploadProgress,
        }

        return (
            <>
                <AuthManager>{() => <>{children(renderProps)}</>}</AuthManager>
            </>
        )
    }
}

const mapStateToProps = (state) => ({
    isLoading: commonSelectors['getIsLoading'](state),
    uploadProgress: commonSelectors['getUploadProgress'](state),
})

const MediaManager = compose(
    connect(mapStateToProps, (dispatch) => {
        return bindActionCreators(
            {
                setIsLoading: commonActions.setIsLoading,
                deleteFile: commonActions.deleteFile,
                uploadFiles: commonActions.uploadFiles,
                editFile: commonActions.editFile,
                setUploadProgress: commonActions.setUploadProgress,
            },
            dispatch,
        )
    }),
    withRouter,
)(MediaManagerBase)

export { MediaManager }
export default { MediaManager }
