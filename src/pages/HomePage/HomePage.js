import { useState, useEffect } from 'react';
import { Link, useLocation, useRouteMatch } from 'react-router-dom';
import * as moviesAPI from '../../services/movies-api';
import NoImage from '../no_image-300x245.jpeg';
import './HomePage.scss';

export default function HomeView() {
  const location = useLocation();
  const { url } = useRouteMatch();
  const [movies, setMovies] = useState([]);
  const BASE_IMAGE_URL = 'https://image.tmdb.org/t/p/w500';

  useEffect(() => {
    moviesAPI.fetchTrendingMovies().then(({ results }) => {
      setMovies([...results]);
    });
  }, []);
  
  return (
    <>
    
      <h2>Trending today</h2>

      {movies && (
        <ul className="homepage__movie-list">
          {movies.map(({ poster_path, id, title, release_date}) => (
            <li key={id} className="homepage__movie-list-item">
              <Link to={{
                pathname: `${url}movies/${id}`,
                state: { from: location },
              }}>
                <div className="homepage__movie-card">
                  <img
                  src={poster_path ? `${BASE_IMAGE_URL}/${poster_path}` : NoImage}
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
  );
}