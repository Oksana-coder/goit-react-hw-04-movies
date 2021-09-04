import { useState, useEffect } from 'react';
import { Link, useRouteMatch, useHistory, useLocation } from 'react-router-dom';
import * as moviesAPI from '../../services/movies-api';
import { toast } from 'react-toastify';
import NoImage from '../no_image-300x245.jpeg';
import './MoviesPage.scss';

export default function MoviesPage() {
  const history = useHistory();
  const location = useLocation();
  const { url } = useRouteMatch();
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const BASE_IMAGE_URL = 'https://image.tmdb.org/t/p/w500';

  useEffect(() => {
    const urlQuery = new URLSearchParams(location.search).get('query') ?? '';
    if (urlQuery === '') {
      return;
    }

    moviesAPI.fetchMovieByKeyword(urlQuery).then(({ results }) => {
      setMovies(results);
    });
  }, [location.search]);

  const handleChange = event => {
    setQuery(event.currentTarget.value.toLowerCase());
  };

  const handleQueryChange = query => {
    
    history.push({
      ...location,
      search:`query=${query}`
    })
  };
  
    const handleSubmit = event => {
      event.preventDefault();

    if (query.trim() === '') {
      toast.error('Enter your search query!', {
        theme: 'colored',
      });
      return;
    }
      
      handleQueryChange(query);
      setQuery('');
  };

  return (
    <>
      <form className="SearchForm" onSubmit={handleSubmit}>
        <input
          className="SearchForm__input"
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search movies"
          name="query"
          value={query}
          onChange={handleChange}
        />
          
        <button type="submit" className="SearchForm__button">
          <span className="SearchForm__button-label">Search</span>
        </button> 
      </form>

      {movies && (
        <ul className="homepage__movie-list">
          {movies.map(({ poster_path, id, title, release_date}) => (
            <li key={id} className="homepage__movie-list-item">
              <Link to={{
                pathname: `${url}/${id}`,
                state: { from: location },
              }}>
                <div className="homepage__movie-card">
                  <img
                  src={ poster_path ? `${BASE_IMAGE_URL}/${poster_path}` : NoImage}
                  alt={title}
                  width="200"
                  className="homepage__movie-poster"
                />
                  <p className="movie-title">{title} {release_date && (<span>({release_date.substring(0, 4)})</span>)}</p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}

    </>
    )
}