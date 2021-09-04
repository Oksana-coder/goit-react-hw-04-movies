import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import * as moviesAPI from '../../../services/movies-api';
import './MovieReviews.scss';

export default function MovieReviews() {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    moviesAPI.fetchMovieReviews(movieId).then(({ results }) => {
      setReviews(results);
    });
  }, [movieId]);

  return (
    reviews.length !== 0 ? (
    <ul className="movie-review-list">
      {reviews.map(review => (
        <li key={review.id} className="movie-review-list__item">
          <p className="movie-review-list__author">Author: {review.author_details.username}</p>
          <p>{review.content}</p>
        </li>
      ))}
    </ul>
    ) : (
        <p className="no-review-comment">There are no reviews for this movie yet.</p>
    )
  )
}