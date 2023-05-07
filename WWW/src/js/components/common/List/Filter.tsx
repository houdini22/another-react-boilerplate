import * as React from 'react'
import styles from '../../../../assets/scss/components/_list_manager.scss'
import classNames from 'classnames/bind'
import { Button, FormField, Col, Row, Label } from '../../../components'

const cx = classNames.bind(styles)

interface FilterProps {
    name?: string
    options?: Array<{ label: string; value: string | number }>
    filters: Object
    setFilter: Function
    type: string
    label: string
}

class Filter extends React.Component<FilterProps, null> {
    renderRadio() {
        const { name, options, filters, setFilter } = this.props

        return (
            <>
                {options
                    .sort(({ label: labelA }, { label: labelB }) => labelA.localeCompare(labelB))
                    .map(({ label, value }) => {
                        return (
                            <Button
                                key={`${name}${value}${label}`}
                                color={filters[name] === value ? 'warning' : 'secondary'}
                                onClick={() => {
                                    setFilter(name, value)
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
        const { options, filters, setFilter } = this.props

        return (
            <FormField
                type={'select'}
                name={'order_by'}
                options={options}
                inputOnly
                defaultValue={filters['order_by']}
                onChange={({ target: { value } }) => {
                    setFilter('order_by', value)
                }}
            />
        )
    }
    renderSelect() {
        const { filters, setFilter, name, options } = this.props

        return (
            <FormField
                type={'select'}
                name={name}
                options={options}
                placeholder={' --- choose --- '}
                inputOnly
                defaultValue={filters[name]}
                onChange={({ target: { value } }) => {
                    setFilter(name, value)
                }}
            />
        )
    }
    renderOrderDirection() {
        const { filters, setFilter } = this.props
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
                    setFilter('order_direction', value)
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
                    const { setFilter } = this.props
                    setFilter(name, value)
                }}
            />
        )
    }
    renderMultiple() {
        const { options, filters, setFilter, name } = this.props
        return (
            <>
                {options
                    .sort(({ label: labelA }, { label: labelB }) => labelA.localeCompare(labelB))
                    .map(({ label, value }) => {
                        return (
                            <Button
                                key={`${value}${label}`}
                                color={filters[name].indexOf(value) === -1 ? 'secondary' : 'warning'}
                                onClick={() => {
                                    if (filters[name].indexOf(value) === -1) {
                                        setFilter(name, [...filters[name], value])
                                    } else {
                                        setFilter(
                                            name,
                                            filters[name].filter((v) => {
                                                return v !== value
                                            }),
                                        )
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
    getChanged(defaultFilters, filters, name, type) {
        if (
            type === 'order' &&
            (defaultFilters['order_by'] !== filters['order_by'] || defaultFilters['order_direction'] !== filters['order_direction'])
        ) {
            return true
        }

        const defaultFilter = defaultFilters[name]
        const filter = filters[name]

        if (Array.isArray(defaultFilter) && Array.isArray(filter)) {
            return defaultFilter.join('') !== filter.join('')
        }

        return defaultFilter !== filter
    }
    render() {
        const { type, name, placeholder, defaultFilters = {}, filters } = this.props

        const changed = this.getChanged(defaultFilters, filters, name, type)

        return (
            <div className={cx('filter')}>
                <Row>
                    <Col xs={4}>
                        <span>
                            {this.renderFilterLabel()}:{changed && <Label color={'info'}>Active</Label>}
                        </span>
                    </Col>
                    <Col xs={8}>
                        {type === 'select' && this.renderSelect()}
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

export { Filter }
