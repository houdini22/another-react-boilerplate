import React from 'react'
import { http } from '../../../modules/http'
import styles from '../../../../assets/scss/components/_list_manager.scss'
import classNames from 'classnames/bind'

const cx = classNames.bind(styles)

interface ListManagerProps {
    url: string
    defaultFilters: Object
}

interface ListManagerState {
    data: any
    isLoading: boolean
    page: number
    hasPrevPage: boolean
    hasNextPage: boolean
    totalPages: number
    filters: { name: string; value: string }
    total: number
    perPage: number
    links: Array<Object>
}

class ListManager extends React.Component<ListManagerProps, ListManagerState> {
    state = {
        data: [],
        isLoading: false,
        page: 1,
        hasPrevPage: false,
        hasNextPage: false,
        totalPages: 0,
        filters: {},
        total: 0,
        perPage: 0,
        links: [],
    }

    componentDidMount() {
        const { defaultFilters = {} } = this.props
        const promises = []

        Object.keys(defaultFilters).forEach((name) => {
            promises.push(this.setFilter(name, defaultFilters[name]))
        })

        Promise.all(promises).then(() => {
            this.fetch()
        })
    }

    setFilter(name, value) {
        return new Promise((resolve) => {
            const { filters } = this.state

            this.setState(
                {
                    filters: {
                        ...filters,
                        [name]: value,
                    },
                },
                () => {
                    resolve()
                },
            )
        })
    }

    setPage(page) {
        return new Promise((resolve) => {
            this.setState(
                {
                    page,
                },
                () => {
                    resolve()
                },
            )
        })
    }

    setIsLoading(isLoading) {
        return new Promise((resolve) => {
            this.setState({ isLoading }, () => {
                resolve()
            })
        })
    }

    fetch() {
        return new Promise((resolve) => {
            this.setIsLoading(true).then(() => {
                const { url, defaultFilters } = this.props
                const { page, filters } = this.state

                const params = {
                    filters: {
                        ...defaultFilters,
                        ...filters,
                    },
                    page,
                }

                http.get(`${url}`, {
                    params,
                }).then(
                    ({
                        data: {
                            data: {
                                data = [],
                                next_page_url = '',
                                prev_page_url = '',
                                last_page = 0,
                                total = 0,
                                current_page = 0,
                                per_page = 0,
                                links = [],
                            } = {},
                        } = {},
                    }) => {
                        this.setState(
                            {
                                data,
                                page: current_page,
                                hasNextPage: !!next_page_url,
                                hasPrevPage: !!prev_page_url,
                                totalPages: last_page,
                                total,
                                perPage: per_page,
                                links,
                            },
                            () => {
                                this.setIsLoading(false).then(() => {
                                    resolve()
                                })
                            },
                        )
                    },
                )
            })
        })
    }

    resetFilters() {
        const { defaultFilters } = this.props

        const promises = []

        Object.keys(defaultFilters).forEach((name) => {
            promises.push(this.setFilter(name, defaultFilters[name]))
        })

        Promise.all(promises).then(() => this.fetch())
    }

    render() {
        const { filters, data, total, hasPrevPage, hasNextPage, totalPages, page, isLoading, perPage, links } =
            this.state
        const { children, defaultFilters } = this.props

        const allFilters = {
            ...defaultFilters,
            ...filters,
        }

        const renderProps = {
            fetch: this.fetch.bind(this),
            setFilter: this.setFilter.bind(this),
            filters: allFilters,
            data,
            total,
            hasPrevPage,
            hasNextPage,
            totalPages,
            page,
            isLoading,
            setPage: this.setPage.bind(this),
            perPage,
            resetFilters: this.resetFilters.bind(this),
            links,
            setIsLoading: this.setIsLoading.bind(this),
        }

        return <div className={cx('list-manager-container')}>{children(renderProps)}</div>
    }
}

export { ListManager }
export default { ListManager }
