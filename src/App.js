import { lazy, Suspense } from 'react';
import { Switch, Route } from 'react-router-dom';
import AppBar from './components/AppBar/AppBar';
import Container from './components/Container/Container';
import Loader from 'react-loader-spinner';
import { ToastContainer } from 'react-toastify';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import 'react-toastify/dist/ReactToastify.css';

const HomePage = lazy(() => import('./pages/HomePage' /* webpackChunkName: "home-page" */));
const MoviesPage = lazy(() => import('./pages/MoviesPage' /* webpackChunkName: "movies-page" */));
const MovieDetailsPage = lazy(() => import('./pages/MovieDetailsPage' /* webpackChunkName: "movie-details-page" */));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage' /* webpackChunkName: "not-found-page" */));

export default function App() {
  return (
    <Container>
      <AppBar />
    
      <Suspense fallback={
        <Loader
            type="Puff"
            color="#00BFFF"
            height={100}
            width={100}
          />
      }>
        <Switch>
          <Route path="/" exact>
            <HomePage />
          </Route>

          <Route path="/movies" exact>
            <MoviesPage />
          </Route>

          <Route path="/movies/:movieId">
            <MovieDetailsPage />
          </Route>

          <Route>
            <NotFoundPage />
          </Route>
          </Switch>
        </Suspense>
        <ToastContainer autoClose={3000} />
    </Container>
  );
}