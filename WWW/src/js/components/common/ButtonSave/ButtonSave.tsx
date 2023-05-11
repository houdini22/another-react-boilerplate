import * as React from 'react'
import { Button } from '../../index'
import { SaveIcon } from '../../icons'

interface ButtonSaveProps {}

export class ButtonSave extends React.Component<ButtonSaveProps, null> {
    render() {
        return (
            <Button icon={<SaveIcon />} color={'success'} type={'submit'} block>
                <span>Save</span>
            </Button>
        )
    }
}
