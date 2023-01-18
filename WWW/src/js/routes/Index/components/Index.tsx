import * as React from 'react'
import { Header } from '../../../components/Header'
import { Section } from '../../../components/Section'
import { MoviesContainer } from '../containers/MoviesContainer'
import { SearchField } from '../../../components/SearchField'
import Modal from '../../../components/Modal'
import { Row } from '../../../components/Row'
import { Col } from '../../../components/Col'
import { Movie } from '../../../components/Movie'
import { LoadingOverlay } from '../../../components/LoadingOverlay'

export class IndexView extends React.Component {
    render() {
        return (
            <div>
                <MoviesContainer>
                    {({
                        setSearchFieldFocused,
                        searchFieldFocused,
                        setSearchPhrase,
                        connectionErrorModalVisible,
                        setConnectionErrorModalVisible,
                        movies,
                        isLoading,
                    }) => (
                        <>
                            {isLoading && <LoadingOverlay />}
                            <Header>
                                <SearchField
                                    setSearchFieldFocused={
                                        setSearchFieldFocused
                                    }
                                    searchFieldFocused={searchFieldFocused}
                                    setSearchPhrase={setSearchPhrase}
                                />
                            </Header>
                            <Section>
                                <Row>
                                    {movies.map(
                                        ({
                                            title,
                                            image,
                                            imDbRating,
                                            imDbRatingCount,
                                        }) => {
                                            return (
                                                <Col
                                                    xs={12}
                                                    sm={6}
                                                    md={3}
                                                    key={`${title}${image}${imDbRatingCount}${imDbRating}`}
                                                >
                                                    <Movie
                                                        title={title}
                                                        image={image}
                                                        rating={imDbRating}
                                                        ratingCount={
                                                            imDbRatingCount
                                                        }
                                                    />
                                                </Col>
                                            )
                                        },
                                    )}
                                </Row>
                            </Section>
                            <Modal.ModalContainer
                                visible={connectionErrorModalVisible}
                            >
                                <Modal.ModalHeader
                                    closeIcon
                                    close={() =>
                                        setConnectionErrorModalVisible(false)
                                    }
                                >
                                    <h5>Connection error</h5>
                                </Modal.ModalHeader>
                                <Modal.ModalBody>
                                    <p>
                                        Please check your internet connection.
                                    </p>
                                </Modal.ModalBody>
                            </Modal.ModalContainer>
                        </>
                    )}
                </MoviesContainer>
            </div>
        )
    }
}

export default IndexView
