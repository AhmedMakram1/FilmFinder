import React, { useState, useEffect } from "react";
import axios from "axios";
import { Carousel } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

function MovieCards() {
  const [movies, setMovies] = useState([]);
  const [featuredMovies, setFeaturedMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");

  const apiKey = "c94b800b13b9b455a5d91c9b54e821a3";

  useEffect(() => {
    fetchMovies();
  }, [page, searchQuery]);

  useEffect(() => {
    fetchFeaturedMovies();
  }, []);

  const fetchMovies = async () => {
    setLoading(true);
    setError(null);
    try {
      const endpoint = searchQuery
        ? `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${searchQuery}&page=${page}`
        : `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&page=${page}`;

      const response = await axios.get(endpoint);
      setMovies(response.data.results);
      setTotalPages(response.data.total_pages);
    } catch (err) {
      setError("Failed to fetch movies");
    }
    setLoading(false);
  };

  const fetchFeaturedMovies = async () => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/top_rated?api_key=${apiKey}&page=1`
      );
      setFeaturedMovies(response.data.results.slice(0, 5));
    } catch (err) {
      console.error("Error fetching featured movies", err);
    }
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    setPage(1);
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  if (loading)
    return (
      <div className="d-flex justify-content-center my-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );

  if (error)
    return (
      <div className="alert alert-danger m-3" role="alert">
        {error}
      </div>
    );

  return (
    <div className="container mt-4">
      <h1 className="mb-4 text-center">Movies</h1>

      {/* 🎥 Movie Slider */}
      {featuredMovies.length > 0 && (
        <Carousel className="mb-4">
          {featuredMovies.map((movie) => (
            <Carousel.Item key={movie.id}>
              <img
                className="d-block w-100"
                src={`https://image.tmdb.org/t/p/w1280${movie.backdrop_path}`}
                alt={movie.title}
                style={{ height: "400px", objectFit: "cover" }}
              />
              <Carousel.Caption className="bg-dark bg-opacity-50 rounded p-3">
                <h3>{movie.title}</h3>
                <p className="small">
                  <i className="bi bi-star-fill text-warning me-1"></i>
                  {movie.vote_average.toFixed(1)}
                </p>
              </Carousel.Caption>
            </Carousel.Item>
          ))}
        </Carousel>
      )}

      {/* 🔍 Search Input */}
      <div className="mb-4">
        <input
          type="text"
          className="form-control"
          placeholder="Search for movies..."
          value={searchQuery}
          onChange={handleSearch}
        />
      </div>

      {/* 🎬 Movie Cards */}
      <div className="row">
        {movies.map((movie) => (
          <div className="col-md-4 col-lg-3 mb-4" key={movie.id}>
            <div className="card h-100 shadow">
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                className="card-img-top"
                alt={movie.title}
              />
              <div className="card-body">
                <h5 className="card-title">{movie.title}</h5>
                <span className="badge bg-primary">
                  {movie.release_date?.split("-")[0]}
                </span>
                <span className="badge bg-warning text-dark ms-2">
                  <i className="bi bi-star-fill me-1"></i>
                  {movie.vote_average.toFixed(1)}
                </span>
                <p className="card-text small text-muted mt-2">
                  {movie.overview.length > 100
                    ? `${movie.overview.substring(0, 100)}...`
                    : movie.overview}
                </p>
              </div>
              <div className="card-footer d-grid">
                <button className="btn btn-outline-primary">
                  View Details
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 📄 Pagination Controls */}
      <div className="d-flex justify-content-center mt-4">
        <button
          className="btn btn-outline-primary me-2"
          onClick={() => handlePageChange(page - 1)}
          disabled={page === 1}
        >
          Previous
        </button>
        <span className="fw-bold mx-3">
          Page {page} of {totalPages}
        </span>
        <button
          className="btn btn-outline-primary"
          onClick={() => handlePageChange(page + 1)}
          disabled={page === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default MovieCards;
