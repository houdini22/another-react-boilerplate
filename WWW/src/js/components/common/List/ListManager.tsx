import React from 'react'
import { http } from '../../../modules/http'
import styles from '../../../../assets/scss/components/_list_manager.scss'
import classNames from 'classnames/bind'
import { SetIsLoading } from '../../../../types.d'
import { ifDeepDiff } from '../../../utils/javascript'

const cx = classNames.bind(styles)

interface ListManagerProps {
    url: string
    filters: Object
    filtersDataUrl?: string
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
    setIsLoading: SetIsLoading
    filtersData: Object
}

class ListManager extends React.Component<ListManagerProps, ListManagerState> {
    state = {
        data: [],
        isLoading: false,
        page: 1,
        hasPrevPage: false,
        hasNextPage: false,
        totalPages: 0,
        total: 0,
        perPage: 0,
        links: [],
        filtersData: {},
    }

    requestInProgress = false

    componentDidMount() {
        const { setIsLoading } = this.props
        setIsLoading(true).then(() => {
            this.fetch().then(() => {
                setIsLoading(false)
            })
        })
    }

    setPage(page: number) {
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

    componentDidUpdate(prevProps: Readonly<ListManagerProps>, prevState: Readonly<ListManagerState>, snapshot?: any) {
        const { filters, setIsLoading } = this.props
        const { page } = this.state

        if (ifDeepDiff(prevProps.filters, filters) || prevState.page !== page) {
            setIsLoading(true).then(() => {
                this.fetch().then(
                    () => {
                        setIsLoading(false)
                    },
                    () => setIsLoading(false),
                )
            })
        }
    }

    fetch() {
        return new Promise((resolve, reject) => {
            if (this.requestInProgress) {
                reject()
                return
            }

            this.requestInProgress = true

            const { url, filters } = this.props
            const { page } = this.state

            const params = {
                filters,
                page,
            }

            Promise.all([
                new Promise((resolve) => {
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
                                    resolve()
                                },
                            )
                        },
                        () => {
                            resolve()
                        },
                    )
                }),
                new Promise((resolve) => {
                    const { filtersDataUrl } = this.props

                    if (!filtersDataUrl) {
                        resolve()
                        return
                    }

                    http.get(`${filtersDataUrl}`, {
                        params: {
                            filters,
                        },
                    }).then(
                        ({ data: { data: { data } } = {} }) => {
                            this.setState(
                                {
                                    filtersData: data,
                                },
                                () => {
                                    resolve()
                                },
                            )
                        },
                        () => {
                            resolve()
                        },
                    )
                }),
            ]).then(() => {
                resolve()
                this.requestInProgress = false
            })
        })
    }

    render() {
        const { data, total, hasPrevPage, hasNextPage, totalPages, page, perPage, links, filtersData } = this.state
        const { children } = this.props

        const renderProps = {
            fetch: this.fetch.bind(this),
            data,
            total,
            hasPrevPage,
            hasNextPage,
            totalPages,
            page,
            setPage: this.setPage.bind(this),
            perPage,
            links,
            filtersData,
        }

        return <div className={cx('list-manager-container')}>{children(renderProps)}</div>
    }
}

export { ListManager }
