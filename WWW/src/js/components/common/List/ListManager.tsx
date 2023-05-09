import React from 'react'
import { myGet } from '../../../modules/http'
import styles from '../../../../assets/scss/components/_list_manager.scss'
import classNames from 'classnames/bind'
import { ifDeepDiff } from '../../../utils/javascript'
import { actions as listsActions, selectors as listsSelectors } from '../../../reducers/lists'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

const cx = classNames.bind(styles)

interface ListManagerProps {
    url: string
    filters: Object
    filtersDataUrl?: string
}

class ListManagerBase extends React.Component<ListManagerProps> {
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
        const { setPage, url } = this.props

        setPage(url, page)
    }

    componentDidUpdate(prevProps: Readonly<ListManagerProps>, prevState: Readonly<ListManagerState>, snapshot?: any) {
        const { filters, setIsLoading, page } = this.props

        if (ifDeepDiff(prevProps.filters, filters) || prevProps.page !== page) {
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

            const { url, filters, page, setListData } = this.props

            const params = {
                filters,
                page,
            }

            Promise.all([
                new Promise((resolve) => {
                    return myGet(url, params).then((data) => {
                        setListData(url, data)
                        resolve()
                    })
                }),
                new Promise((resolve) => {
                    const { filtersDataUrl, setFiltersData, url } = this.props

                    if (!filtersDataUrl) {
                        resolve()
                        return
                    }

                    myGet(`${filtersDataUrl}`, {
                        filters,
                    }).then((data) => {
                        setFiltersData(url, data)
                        resolve()
                    })
                }),
            ]).then(() => {
                resolve()
                this.requestInProgress = false
            })
        })
    }

    render() {
        const { children, listData, filtersData, page = 1 } = this.props

        const renderProps = {
            fetch: this.fetch.bind(this),
            data: listData,
            setPage: this.setPage.bind(this),
            filtersData,
            page,
        }

        return <div className={cx('list-manager-container')}>{children(renderProps)}</div>
    }
}

const mapStateToProps = (state, { url }) => ({
    listData: listsSelectors['getListData'](state, url),
    filtersData: listsSelectors['getFiltersData'](state, url),
    page: listsSelectors['getPage'](state, url),
})

const ListManager = connect(mapStateToProps, (dispatch) => {
    return bindActionCreators(
        {
            setListData: listsActions.setListData,
            setFiltersData: listsActions.setFiltersData,
            setPage: listsActions.setPage,
        },
        dispatch,
    )
})(ListManagerBase)

export { ListManager }
