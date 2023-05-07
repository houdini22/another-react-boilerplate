import * as React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { actions as filtersActions, selectors as filtersSelectors } from '../reducers/filters'
import { ifDeepDiff } from '../utils/javascript'
import { LocalStorage } from '../modules/database'

interface FiltersManagerBaseProps {
    defaultFilters: Object
    urlFilters: Object
    filters: Object
}

interface FiltersManagerBaseState {
    defaultFilters: Object
    filters: Object
    name: string
}

class FiltersManagerBase extends React.Component<FiltersManagerBaseProps, FiltersManagerBaseState> {
    state: FiltersManagerBaseState = {
        defaultFilters: {},
        filters: {},
        savedFilters: {},
    }

    constructor(props: FiltersManagerBaseProps) {
        super(props)

        const { defaultFilters = {}, urlFilters = {}, filters, name, setFilters } = props

        if (!!filters[name]) {
            this.state = {
                defaultFilters,
                filters: {
                    ...filters[name],
                    ...urlFilters,
                },
                savedFilters: this.getSavedFilters(),
            }
        } else {
            this.state = {
                defaultFilters,
                filters: {
                    ...defaultFilters,
                    ...urlFilters,
                },
                savedFilters: this.getSavedFilters(),
            }

            setFilters(name, defaultFilters)
        }
    }

    componentDidUpdate(
        prevProps: Readonly<FiltersManagerBaseProps>,
        prevState: Readonly<FiltersManagerBaseState>,
        snapshot?: any,
    ) {
        const { filters: stateFilters } = this.state
        const { filters: propsFilters, name } = this.props

        if (ifDeepDiff(prevProps.filters, propsFilters[name]) && ifDeepDiff(stateFilters, propsFilters[name])) {
            this.setState({
                filters: propsFilters[name],
            })
        }
    }

    setFilter(name, value) {
        return new Promise((resolve) => {
            const { name: containerName, setFilter } = this.props

            setFilter(containerName, name, value)

            resolve()
        })
    }

    setFilters(filters) {
        return new Promise((resolve) => {
            const { name: containerName, setFilters } = this.props

            setFilters(containerName, filters)

            resolve()
        })
    }

    resetFilters() {
        const { defaultFilters } = this.props

        return this.setFilters(defaultFilters)
    }
    getSavedFilters() {
        const { name } = this.props
        return LocalStorage.queryAll('ListManagerFilters', { query: { name: name } })
    }
    deleteSavedFilter(name) {
        const { name: containerName } = this.props

        LocalStorage.deleteRows('ListManagerFilters', (row) => {
            return row.name === containerName && row.list_name === name
        })
        LocalStorage.commit()

        this.setState({
            savedFilters: this.getSavedFilters(),
        })
    }

    saveFilters(list_name) {
        const { filters, name: containerName } = this.props
        LocalStorage.insertOrUpdate(
            'ListManagerFilters',
            { name: containerName, list_name },
            {
                filters: filters[containerName],
                name: containerName,
                list_name,
            },
        )
        LocalStorage.commit()

        this.setState({
            savedFilters: this.getSavedFilters(),
        })
    }

    restoreSavedFilter(name) {
        const { name: containerName } = this.props
        const { savedFilters } = this.state

        const saved = savedFilters.find((f) => {
            return f.name === containerName && f.list_name === name
        })

        if (saved) {
            this.setFilters(saved.filters)
        }
    }

    render() {
        const { children } = this.props
        const { defaultFilters, filters, savedFilters } = this.state

        const renderProps = {
            defaultFilters,
            filters,
            setFilter: this.setFilter.bind(this),
            setFilters: this.setFilters.bind(this),
            resetFilters: this.resetFilters.bind(this),
            saveFilters: this.saveFilters.bind(this),
            deleteSavedFilter: this.deleteSavedFilter.bind(this),
            restoreSavedFilter: this.restoreSavedFilter.bind(this),
            savedFilters,
        }

        return children(renderProps)
    }
}

const mapStateToProps = (state) => ({
    filters: filtersSelectors.getFilters(state),
})

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators(
        {
            setFilter: filtersActions.setFilter,
            setFilters: filtersActions.setFilters,
        },
        dispatch,
    )
}

const FiltersManager = connect(mapStateToProps, mapDispatchToProps)(FiltersManagerBase)

export { FiltersManager }
