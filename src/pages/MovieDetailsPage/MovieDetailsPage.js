import { useState, useEffect } from 'react';
import { NavLink, Route, useHistory, useLocation, useRouteMatch } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import * as moviesAPI from '../../services/movies-api';
import MovieCast from './MovieCast/MovieCast';
import MovieReviews from './MovieReviews/MovieReviews';
import './MovieDetailsPage.scss';

export default function MovieDetailsPage() {
  const history = useHistory();
  const location = useLocation();
  const { url } = useRouteMatch();
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const BASE_IMAGE_URL = 'https://image.tmdb.org/t/p/w500';

  useEffect(() => {
    moviesAPI.fetchMovieById(movieId).then(setMovie);
  }, [movieId]);

  const onGoBack = () => {
    history.push(location?.state?.from ?? '/movies');
  }

  return (
    <>
      {movie && (
        <>
          <button type="button" className="go-back-btn" onClick={onGoBack}>
            {location?.state?.from?.label ?? 'Go Back'}
          </button>
          <div className="movie-page__movie-card">
            <img src={`${BASE_IMAGE_URL}/${movie.poster_path}`} alt={movie.title} width="300" className="movie-page__movie-poster"/>
            <div className="movie-page__movie-details">
              <h2>{movie.title} <span>({movie.release_date.substring(0, 4)})</span></h2>
              <h3>User Score: <span className="movie-page__user-score">{movie.vote_average}</span></h3>
              <h3>Overview</h3>
              <p>{movie.overview}</p>
              <h3>Genres</h3>
              <ul className="movie-page__movie-genres">
                {movie.genres.map(({ id, name }) => (
                  <li key={id} className="movie-page__movie-genres-item">{name}</li>
                ))}
              </ul>
            </div>
          </div>
          <div>
            <h3>Additional information</h3>

            <NavLink
              to={{
                pathname: `${url}/cast`,
                state: { from: location?.state?.from },
              }}
              className="movie-page__cast">Cast</NavLink>
            <NavLink
              to={{
                pathname: `${url}/reviews`,
                state: { from: location?.state?.from },
              }}
              className="movie-page__reviews">Reviews</NavLink>

            <Route path="/movies/:movieId/cast">
              <MovieCast />      
            </Route>
              
            <Route path="/movies/:movieId/reviews">
              <MovieReviews />     
            </Route>
          </div>
        </>
      )}
    </>
  )
}