import { useEffect } from 'react'
import http from '../../../modules/http'
import config from '../../../config'
import {
    actions as commonActions,
    CommonStateInterface,
    selectors as commonSelectors,
} from '../../../reducers/common'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

export interface MovieInterface {
    title: string
    image: string
    imDbRatingCount: number
    imDbRating: number
}

interface MoviesContainerProps {
    children: any
    common: CommonStateInterface
    setConnectionErrorModalVisible: Function
    setSearchFieldFocused: Function
    setSearchPhrase: Function
    setMovies: Function
    setIsLoading: Function
    movies: Array<MovieInterface>
}

const MoviesContainerBase = ({
    children,
    common: {
        connectionErrorModalVisible,
        searchFieldFocused,
        searchPhrase,
        isLoading,
    },
    movies,
    setConnectionErrorModalVisible,
    setSearchFieldFocused,
    setSearchPhrase,
    setMovies,
    setIsLoading,
}: MoviesContainerProps) => {
    const renderProps = {
        setSearchFieldFocused: setSearchFieldFocused,
        setSearchPhrase: setSearchPhrase,
        searchFieldFocused,
        searchPhrase,
        connectionErrorModalVisible,
        setConnectionErrorModalVisible,
        movies,
        isLoading,
    }

    useEffect(() => {
        http.get(`Top250Movies/${config.api.key}`).then(
            ({ data: { items = [] } }) => {
                setMovies(items)
                setIsLoading(false)
            },
        )
    }, [])

    return children(renderProps)
}

const {
    setConnectionErrorModalVisible,
    setMovies,
    setSearchPhrase,
    setSearchFieldFocused,
    setIsLoading,
} = commonActions

const mapStateToProps = (state) => ({
    common: commonSelectors['getState'](state),
    movies: commonSelectors['getMovies'](state),
})

const MoviesContainer = connect(mapStateToProps, (dispatch) => {
    return bindActionCreators(
        {
            setConnectionErrorModalVisible,
            setMovies,
            setSearchPhrase,
            setSearchFieldFocused,
            setIsLoading,
        },
        dispatch,
    )
})(MoviesContainerBase)

export { MoviesContainer }
export default { MoviesContainer }
