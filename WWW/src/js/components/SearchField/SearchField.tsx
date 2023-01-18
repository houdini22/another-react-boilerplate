import React from 'react'
import classNames from 'classnames/bind'
import styles from '../../../assets/scss/_inputs.scss'
import { TextField } from '../TextField'
import { BsSearch } from 'react-icons/bs'

const cx = classNames.bind(styles)

interface SearchFieldProps {
    searchFieldFocused: boolean
    setSearchFieldFocused: Function
    setSearchPhrase: Function
}

export const SearchField = ({
    searchFieldFocused,
    setSearchFieldFocused,
    setSearchPhrase,
}: SearchFieldProps) => {
    return (
        <div
            className={cx('component-form-field', {
                [cx('component-form-field--is-focused')]: searchFieldFocused,
            })}
        >
            <div className={cx('component-form-field__input-container')}>
                <TextField
                    placeholder={'Search...'}
                    name="search"
                    onFocus={() => setSearchFieldFocused(true)}
                    onBlur={() => setSearchFieldFocused(false)}
                    onChange={(e) => {
                        setSearchPhrase(e.target.value)
                    }}
                    type={'text'}
                />
                <div
                    className={cx(
                        'component-form-field__input-container__icon',
                    )}
                >
                    <BsSearch />
                </div>
            </div>
        </div>
    )
}
