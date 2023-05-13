import * as React from 'react'
import { Card, LoadingOverlay } from '../../../../components'
import { EditFormContainer } from './EditFormContainer'
import { FormContainer } from '../../../../containers'
import AlertNoPermissions from '../../../../components/common/AlertNoPermissions'
import { Manager } from '../../../../containers/Config'
import { SettingsIcon } from '../../../../components/icons'

interface EditSettingsProps {}

interface EditSettingsState {}

export class EditSettings extends React.Component<EditSettingsProps, EditSettingsState> {
    render() {
        const { isLoading, setIsLoading, setUploadProgress, uploadFiles, uploadProgress } = this.props
        return (
            <FormContainer>
                {({ addToastNotification, canByPermission }) => (
                    <>
                        {canByPermission('system.edit_settings') && (
                            <Card
                                header={
                                    <h1>
                                        <SettingsIcon /> Edit Settings
                                    </h1>
                                }
                                color={'success'}
                            >
                                <Manager>
                                    {({ getByKey, edit }) => (
                                        <EditFormContainer
                                            initialValues={{
                                                'app:name': getByKey('app.name')?.value,
                                            }}
                                            save={(values) => {
                                                return new Promise((resolve) => {
                                                    values = Object.keys(values).map((key) => ({
                                                        key: `${key.replace(':', '.')}`,
                                                        value: values[key],
                                                    }))
                                                    edit(values).then(() => {
                                                        resolve()
                                                    })
                                                })
                                            }}
                                            addToastNotification={addToastNotification}
                                            setIsLoading={setIsLoading}
                                            onChangeLogo={(e) => {
                                                setIsLoading(true).then(() => {
                                                    setUploadProgress(-1).then(() => {
                                                        if (_.get(e?.target?.files, 0)) {
                                                            uploadFiles(e?.target?.files, {
                                                                class: 'logo',
                                                            }).then(
                                                                ({
                                                                    data: {
                                                                        data: { data: files },
                                                                    },
                                                                }) => {
                                                                    edit([
                                                                        {
                                                                            key: 'app.logo',
                                                                            value: files[0].id,
                                                                            model_type: 'file',
                                                                        },
                                                                    ]).then(() => {
                                                                        setIsLoading(false)
                                                                    })
                                                                },
                                                            )
                                                        }
                                                    })
                                                })
                                            }}
                                            uploadProgress={uploadProgress}
                                        />
                                    )}
                                </Manager>
                                {isLoading && <LoadingOverlay />}
                            </Card>
                        )}
                        {!canByPermission('permissions.edit') && <AlertNoPermissions />}
                    </>
                )}
            </FormContainer>
        )
    }
}

export default { EditSettings }
