import * as React from 'react'
import { Field } from 'redux-form'
import { Button, FormField } from '../../index'
import classNames from 'classnames/bind'
import styles from '../../../../assets/scss/_pages.scss'
import { apiURL } from '../../../helpers/api'
import { BiHelpCircle } from 'react-icons/bi'
const cx = classNames.bind(styles)

interface LoginFormProps {
    handleSubmit(): any
    type: string
}

export class ContactForm extends React.Component<LoginFormProps> {
    constructor(props) {
        super(props)
        this.state = {
            captchaRandom: Math.random(),
        }
    }
    render() {
        const { handleSubmit, type } = this.props
        const { captchaRandom } = this.state

        return (
            <form onSubmit={handleSubmit} className={cx('contact-form')}>
                <div>
                    <Field
                        name="email"
                        component={FormField}
                        type="text"
                        placeholder="E-mail"
                        inputOnly
                        autoComplete="off"
                        size={type === 'popover' ? 'sm' : undefined}
                        autoFocus
                    />
                    <Field
                        name="message"
                        component={FormField}
                        type="textarea"
                        placeholder="Message"
                        inputOnly
                        autoComplete="off"
                    />
                    <Field
                        name="captcha_image"
                        component={FormField}
                        type="html"
                        htmlAfter={(
                            <span><BiHelpCircle/> Click to reload.</span>
                        )}
                        html={() => {
                            return (
                                <div>
                                    <img className={cx('contact-form__captcha')} src={apiURL(`captcha/math?${captchaRandom}`)} alt={""} onClick={() => {
                                        this.setState({captchaRandom: Math.random()})
                                    }} />
                                </div>
                            )
                        }}
                    />
                    <Field
                        name="captcha"
                        component={FormField}
                        type="text"
                        placeholder="Math result from image"
                        inputOnly
                        autoComplete="off"
                        size={type === 'popover' ? 'sm' : undefined}
                    />
                </div>
                <div>
                    <Button
                        type="submit"
                        outline={type === 'popover'}
                        color="primary"
                    >
                        Send
                    </Button>
                </div>
            </form>
        )
    }
}

export default ContactForm
