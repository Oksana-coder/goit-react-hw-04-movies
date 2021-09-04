import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import * as moviesAPI from '../../../services/movies-api';
import NoImage from '../../no_image-300x245.jpeg';
import './MovieCast.scss';

export default function MovieCast() {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);
  const BASE_IMAGE_URL = 'https://image.tmdb.org/t/p/w500';

  useEffect(() => {
    moviesAPI.fetchMovieCast(movieId).then(({ cast }) => {
      setCast(cast);
    });
  }, [movieId]);

  return (
    <ul className="movie-cast-list">
      {cast.map(actor => (
        <li key={actor.id} className="movie-cast-list__item">
          <div className="movie-cast-list__actor-card">
            <img
              src={ actor.profile_path ? `${BASE_IMAGE_URL}/${actor.profile_path}` : NoImage }
              alt={actor.name}
              width="100"
              className="movie-cast-list__actor-image" />
            <p className="movie-cast-list__actor-name">{actor.name}</p>
            <p className="movie-cast-list__actor-character">Character: {actor.character}</p>
          </div>
        </li>
      ))}
    </ul>
  )
}