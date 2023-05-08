import * as React from 'react'
import styles from '../../../../assets/scss/components/_list_manager.scss'
import classNames from 'classnames/bind'
import { Button, FormField, Col, Row, Label, Badge } from '../../../components'

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
        const { name, options, filters, setFilter, filterData } = this.props

        return (
            <>
                {options?.map(({ label, value }) => {
                    let count = ''

                    if (typeof filterData?.[`count:${value}`] === 'number') {
                        count = ` (${filterData[`count:${value}`]})`
                    }

                    return (
                        <Button
                            key={`${name}${value}${label}${count}`}
                            color={filters[name] === value ? 'warning' : 'secondary'}
                            onClick={() => {
                                setFilter(name, value)
                            }}
                        >
                            {label} {count}
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
        const { type, label, filterData = {}, name, defaultFilters, filters, setFilter } = this.props

        const changed = type === 'order' ? false : this.getChanged(defaultFilters, filters, name, type)

        return (
            <Row>
                <Col xs={12} md={8}>
                    {type === 'order' && <div>Sort by</div>}
                    {type !== 'order' && (
                        <div>
                            {typeof filterData?.count !== 'undefined' && (
                                <Badge color={filterData.count === 0 ? 'warning' : 'info'}>{filterData.count}</Badge>
                            )}{' '}
                            {label}: {changed && <Label color={'info'}>Active</Label>}
                        </div>
                    )}
                </Col>
                <Col xs={12} md={4}>
                    {changed && (
                        <Button
                            size="xs"
                            color={'warning'}
                            onClick={() => {
                                setFilter(name, defaultFilters[name])
                            }}
                        >
                            Reset
                        </Button>
                    )}
                    {type === 'order' && this.getChanged(defaultFilters, filters, 'order', type) && (
                        <Button
                            size="xs"
                            color={'warning'}
                            onClick={() => {
                                setFilter('order_by', defaultFilters['order_by'])
                                setFilter('order_direction', defaultFilters['order_direction'])
                            }}
                        >
                            Reset
                        </Button>
                    )}
                </Col>
            </Row>
        )
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
                {options?.map(({ label, value }) => {
                    return (
                        <Label
                            size={'lg'}
                            key={`${value}${label}`}
                            color={filters[name].indexOf(value) === -1 ? 'default' : 'warning'}
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
                        </Label>
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
        const { type, name, placeholder } = this.props

        return (
            <div className={cx('filter')}>
                <Row>
                    <Col xs={4}>{this.renderFilterLabel()}</Col>
                    <Col xs={8}>
                        <div>
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
                        </div>
                    </Col>
                </Row>
            </div>
        )
    }
}

export { Filter }
