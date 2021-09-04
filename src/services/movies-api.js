const BASE_URL = 'https://api.themoviedb.org/3';
const KEY = 'f07ddcd98b659a708969018bbe4352ee';

async function fetchWithErrorHandling(url = '', config = {}) {
  const response = await fetch(url, config);
  return response.ok
    ? await response.json()
    : Promise.reject(new Error('Not found'));
}

export function fetchTrendingMovies() {
  return fetchWithErrorHandling(`${BASE_URL}/trending/movie/week?api_key=${KEY}`);
}

export function fetchMovieByKeyword(keyword) {
  return fetchWithErrorHandling(`${BASE_URL}/search/movie?api_key=${KEY}&query=${keyword}`);
}

export function fetchMovieById(movieId) {
  return fetchWithErrorHandling(`${BASE_URL}/movie/${movieId}?api_key=${KEY}`);
}

export function fetchMovieCast(movieId) {
  return fetchWithErrorHandling(`${BASE_URL}/movie/${movieId}/credits?api_key=${KEY}`);
}

export function fetchMovieReviews(movieId) {
  return fetchWithErrorHandling(`${BASE_URL}/movie/${movieId}/reviews?api_key=${KEY}`);
}
