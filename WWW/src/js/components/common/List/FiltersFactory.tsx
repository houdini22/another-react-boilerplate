import * as React from 'react'
import styles from '../../../../assets/scss/components/_list_manager.scss'
import classNames from 'classnames/bind'
import { Filter } from './Filter'

const cx = classNames.bind(styles)

interface FiltersFactoryProps {
    children?: any
    filters: any
    setFilter: any
    fetch: any
}

class FiltersFactory extends React.Component<FiltersFactoryProps, null> {
    renderBody(body) {
        const { filters, setFilter, fetch, defaultFilters } = this.props

        return body.map(({ type, label, name, placeholder, options }) => {
            return (
                <Filter
                    key={name}
                    filters={filters}
                    type={type}
                    setFilter={setFilter}
                    fetch={fetch}
                    label={label}
                    name={name}
                    placeholder={placeholder}
                    options={options}
                    defaultFilters={defaultFilters}
                />
            )
        })
    }
    render() {
        const { children, body = [] } = this.props
        return <div className={cx('filters')}>{this.renderBody(body)}</div>
    }
}

export default { FiltersFactory }
export { FiltersFactory }
