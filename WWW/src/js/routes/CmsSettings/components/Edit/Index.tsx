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
        const { isLoading, setIsLoading } = this.props
        return (
            <FormContainer>
                {({ addToastNotification, canByPermission }) => (
                    <>
                        {canByPermission('permissions.edit') && (
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
                                                title: getByKey('cms.meta.title')?.value,
                                                description: getByKey('cms.meta.description')?.value,
                                                keywords: getByKey('cms.meta.keywords')?.value,
                                                robots: getByKey('cms.meta.robots')?.value,
                                            }}
                                            save={(values) => {
                                                return new Promise((resolve) => {
                                                    values = Object.keys(values).map((key) => ({
                                                        key: `cms.meta.${key}`,
                                                        value: values[key],
                                                    }))
                                                    edit(values).then(() => {
                                                        resolve()
                                                    })
                                                })
                                            }}
                                            addToastNotification={addToastNotification}
                                            setIsLoading={setIsLoading}
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
