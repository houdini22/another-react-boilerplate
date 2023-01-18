import * as React from 'react'
import classNames from 'classnames/bind'
import styles from '../../../assets/scss/components/_movie.scss'
import { Card } from '../Card'
import { IoLogoFacebook } from 'react-icons/io'

const cx = classNames.bind(styles)

interface LoadingOverlayProps {
    title: string
    image: string
    rating: number
    ratingCount: number
}

class Movie extends React.Component<LoadingOverlayProps> {
    render() {
        const { title, image, rating, ratingCount } = this.props

        return (
            <Card
                className={cx('movie')}
                color={'primary'}
                header={<h3>{title}</h3>}
            >
                <div className={cx('movie__img-container')}>
                    <div>
                        <img src={image} alt={''} />
                        <div />
                    </div>
                    <IoLogoFacebook />
                </div>
                <div className={cx('movie__description-container')}>
                    <p>
                        Rating: <strong>{rating}</strong>
                    </p>
                    <p>
                        Ratings count: <strong>{ratingCount}</strong>
                    </p>
                </div>
            </Card>
        )
    }
}

export { Movie }
export default { LoadingOverlay: Movie }
