import * as React from 'react'
import styles from '../../../../assets/scss/components/_list_manager.scss'
import classNames from 'classnames/bind'
import { Button, FormField, Col, Row } from '../../../components'

const cx = classNames.bind(styles)

interface FilterProps {
    name?: string
    options?: Array<{ label: string; value: string | number }>
    filters: Object
    setFilter: Function
    fetch: Function
    type: string
    label: string
}

class Filter extends React.Component<FilterProps, null> {
    renderRadio() {
        const { name, options, filters, setFilter, fetch } = this.props

        return (
            <>
                {options
                    .sort(({ label: labelA }, { label: labelB }) => labelA.localeCompare(labelB))
                    .map(({ label, value }) => {
                        return (
                            <Button
                                key={`${name}${value}`}
                                color={filters[name] === value ? 'warning' : 'secondary'}
                                onClick={() => {
                                    setFilter(name, value).then(() => fetch())
                                }}
                            >
                                {label}
                            </Button>
                        )
                    })}
            </>
        )
    }
    renderOrderByColumn() {
        const { options, filters, setFilter, fetch } = this.props

        return (
            <FormField
                type={'select'}
                name={'order_by'}
                options={options}
                inputOnly
                defaultValue={filters['order_by']}
                onChange={({ target: { value } }) => {
                    setFilter('order_by', value).then(() => fetch())
                }}
            />
        )
    }
    renderOrderDirection() {
        const { filters, setFilter, fetch } = this.props
        const options = [
            {
                label: 'Ascending',
                value: 'asc',
            },
            {
                label: 'Descending',
                value: 'desc',
            },
        ]

        return (
            <FormField
                type={'select'}
                name={'order_direction'}
                options={options}
                inputOnly
                defaultValue={filters['order_direction']}
                onChange={({ target: { value } }) => {
                    setFilter('order_direction', value).then(() => fetch())
                }}
            />
        )
    }
    renderFilterLabel() {
        const { type, label } = this.props

        if (type === 'order') {
            return 'Sort by'
        }

        return label
    }
    renderSearch() {
        return this.renderText({ name: 'search', placeholder: 'Search phrase' })
    }
    renderText({ name, placeholder }) {
        const { filters } = this.props
        return (
            <FormField
                type={'text'}
                placeholder={placeholder}
                name={name}
                inputOnly
                defaultValue={filters[name]}
                onBlur={({ target: { value } }) => {
                    const { setFilter, fetch } = this.props
                    setFilter(name, value).then(() => fetch())
                }}
            />
        )
    }
    renderMultiple() {
        const { options, filters, setFilter, name, fetch } = this.props
        return (
            <>
                {options
                    .sort(({ label: labelA }, { label: labelB }) => labelA.localeCompare(labelB))
                    .map(({ label, value }) => {
                        return (
                            <Button
                                key={value}
                                color={filters[name].indexOf(value) === -1 ? 'secondary' : 'warning'}
                                onClick={() => {
                                    if (filters[name].indexOf(value) === -1) {
                                        setFilter(name, [...filters[name], value]).then(() => fetch())
                                    } else {
                                        setFilter(
                                            name,
                                            filters[name].filter((v) => {
                                                return v !== value
                                            }),
                                        ).then(() => fetch())
                                    }
                                }}
                            >
                                {label}
                            </Button>
                        )
                    })}
            </>
        )
    }
    render() {
        const { type, name, placeholder } = this.props
        return (
            <div className={cx('filter')}>
                <Row>
                    <Col xs={4}>
                        <span>{this.renderFilterLabel()}:</span>
                    </Col>
                    <Col xs={8}>
                        {type === 'search' && this.renderSearch()}
                        {type === 'radio' && this.renderRadio()}
                        {type === 'multiple' && this.renderMultiple()}
                        {type === 'text' && this.renderText({ name, placeholder })}
                        {type === 'order' && (
                            <div>
                                {this.renderOrderByColumn()}
                                {this.renderOrderDirection()}
                            </div>
                        )}
                    </Col>
                </Row>
            </div>
        )
    }
}

export default { Filter }
export { Filter }
