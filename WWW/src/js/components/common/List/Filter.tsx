import * as React from 'react'
import styles from '../../../../assets/scss/components/_list_manager.scss'
import classNames from 'classnames/bind'
import { Button, FormField, Col, Row, Label, Badge } from '../../../components'
import { ResetIcon } from '../../icons'
import SimpleModelCell from '../SimpleModelCell'

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
                        count = (
                            <>
                                {' '}
                                <Badge size={'xs'} color={'info'} rounded>
                                    {filterData[`count:${value}`]}
                                </Badge>
                            </>
                        )
                    }

                    return (
                        <Button
                            size={'xs'}
                            key={`${name}${value}${label}${count}`}
                            color={filters[name] === value ? 'warning' : 'secondary'}
                            onClick={() => {
                                setFilter(name, value)
                            }}
                        >
                            <span>
                                {label}
                                {count}
                            </span>
                        </Button>
                    )
                })}
            </>
        )
    }

    renderOrderByColumn() {
        const { options, filters, setFilter, defaultFilters } = this.props

        return (
            <FormField
                size={'xs'}
                type={'select'}
                name={'order_by'}
                options={options}
                inputOnly
                defaultValue={filters['order_by']}
                onChange={({ target: { value } }) => {
                    setFilter('order_by', value)
                }} /*
                className={cx('filter__form-field')}*/
                meta={{ dirty: defaultFilters['order_by'] !== filters['order_by'] }}
            />
        )
    }

    renderSelect() {
        const { filters, setFilter, name, options, defaultFilters } = this.props

        return (
            <FormField
                size={'xs'}
                type={'select'}
                name={name}
                options={options}
                placeholder={' --- choose --- '}
                inputOnly
                defaultValue={filters[name]}
                onChange={({ target: { value } }) => {
                    setFilter(name, value)
                }}
                className={cx('filter__form-field')}
                meta={{ dirty: defaultFilters[name] !== filters[name] }}
            />
        )
    }

    renderOrderDirection() {
        const { filters, setFilter, defaultFilters } = this.props
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
                size={'xs'}
                type={'select'}
                name={'order_direction'}
                options={options}
                inputOnly
                defaultValue={filters['order_direction']}
                onChange={({ target: { value } }) => {
                    setFilter('order_direction', value)
                }}
                className={cx('filter__form-field')}
                meta={{ dirty: defaultFilters['order_direction'] !== filters['order_direction'] }}
            />
        )
    }

    renderFilterLabel() {
        const { type, label, filterData = {}, name, defaultFilters, filters, setFilter } = this.props

        const changed = type === 'order' ? false : this.getChanged(defaultFilters, filters, name, type)

        return (
            <Row noMarginBottom className={cx('filter')}>
                <Col xs={12} md={10} alignCenter>
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
                <Col xs={12} md={2} alignRight alignCenter>
                    <div>
                        {changed && (
                            <Button
                                size="xs"
                                color={'warning'}
                                onClick={() => {
                                    setFilter(name, defaultFilters[name])
                                }}
                                icon={<ResetIcon />}
                                iconOnly
                            />
                        )}
                        {type === 'order' && this.getChanged(defaultFilters, filters, 'order', type) && (
                            <Button
                                size="xs"
                                color={'warning'}
                                onClick={() => {
                                    setFilter('order_by', defaultFilters['order_by'])
                                    setFilter('order_direction', defaultFilters['order_direction'])
                                }}
                                icon={<ResetIcon />}
                                iconOnly
                            />
                        )}
                    </div>
                </Col>
            </Row>
        )
    }

    renderSearch() {
        return this.renderText({ name: 'search', placeholder: 'Search phrase' })
    }

    renderText({ name, placeholder }) {
        const { filters, defaultFilters } = this.props
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
                className={cx('filter__form-field')}
                meta={{ dirty: defaultFilters[name] !== filters[name] }}
            />
        )
    }

    renderMultiple() {
        const { options, filters, setFilter, name } = this.props

        return (
            <>
                {options?.map(({ label, value, icon, disabled }) => {
                    return (
                        <SimpleModelCell
                            disabled={disabled}
                            size={'xs'}
                            icon={icon}
                            key={`${value}${label}`}
                            color={filters[name].indexOf(value) === -1 ? (!disabled ? 'primary' : 'danger') : 'warning'}
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
                            <div>{label}</div>
                        </SimpleModelCell>
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
                <Row noMarginBottom>
                    <Col xs={4} alignCenter>
                        {this.renderFilterLabel()}
                    </Col>
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
