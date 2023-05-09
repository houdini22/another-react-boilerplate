import React from 'react'
import { http, myGet } from '../../../modules/http'
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
    filtersData: Object
}

class ListManager extends React.Component<ListManagerProps, ListManagerState> {
    state = {
        data: [],
        filtersData: {},
        page: 1,
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
                    return myGet(url, params).then((data) => {
                        this.setState(
                            {
                                data,
                            },
                            () => {
                                resolve()
                            },
                        )
                    })
                }),
                new Promise((resolve) => {
                    const { filtersDataUrl } = this.props

                    if (!filtersDataUrl) {
                        resolve()
                        return
                    }

                    myGet(`${filtersDataUrl}`, {
                        filters,
                    }).then((data) => {
                        this.setState(
                            {
                                filtersData: data,
                            },
                            () => {
                                resolve()
                            },
                        )
                    })
                }),
            ]).then(() => {
                resolve()
                this.requestInProgress = false
            })
        })
    }

    render() {
        const { data, filtersData, page } = this.state
        const { children } = this.props

        const renderProps = {
            fetch: this.fetch.bind(this),
            data,
            setPage: this.setPage.bind(this),
            filtersData,
            page,
        }
        return <div className={cx('list-manager-container')}>{children(renderProps)}</div>
    }
}

export { ListManager }
