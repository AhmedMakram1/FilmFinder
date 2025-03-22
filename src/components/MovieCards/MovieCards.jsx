import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useParams, useNavigate } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";
import { useDispatch, useSelector } from "react-redux";
import { toggleFavorite } from "../redux/favoritesSlice"; 
import { fetchMovies } from "../redux/product"; 

function MovieCards() {
  const { page } = useParams();
  const navigate = useNavigate();
  const [pageNumber, setPageNumber] = useState(Number(page) || 1);
  const [searchQuery, setSearchQuery] = useState("");

  const dispatch = useDispatch();
  const { movies, loading, error } = useSelector((state) => state.movies); 
  const favorites = useSelector((state) => state.favorites.favorites);

   // use async thunk to fetch movies
  useEffect(() => {
    dispatch(fetchMovies(pageNumber));
  }, [dispatch, pageNumber]);


  const filteredMovies = movies.filter((movie) =>
    movie.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  
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
        Error: {error}
      </div>
    );

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="mb-4">Popular Movies</h1>
        <div className="input-group w-25">
          <input
            type="text"
            className="form-control"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="row">
        {filteredMovies.length > 0 ? (
          filteredMovies.map((movie) => (
            <div className="col-md-4 col-lg-3 mb-4" key={movie.id}>
              <div className="card h-100 shadow">
                <img
                  src={movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : "https://via.placeholder.com/500x750?text=No+Image"}
                  className="card-img-top"
                  alt={movie.title || "No Image Available"}
                />
                <div className="card-body">
                  <h5 className="card-title">{movie.title}</h5>
                  <p className="card-text small text-muted">
                    {movie.overview.length > 100 ? `${movie.overview.substring(0, 150)}...` : movie.overview}
                  </p>
                </div>

                <div className="card-footer d-flex justify-content-between align-items-center">
                  <button className="btn btn-outline-primary" onClick={() => navigate(`/details/${movie.id}`)}>
                    Details
                  </button>
                  <button
                    className="btn"
                    onClick={() => dispatch(toggleFavorite(movie))}
                    style={{
                      color: favorites.includes(movie.id) ? "red" : "gray",
                      backgroundColor: "#f8f9fa",
                      borderRadius: "50%",
                      padding: "8px",
                    }}
                  >
                    <i className={`bi ${favorites.find((item) => item.id === movie.id) ? "bi-heart-fill text-danger" : "bi-heart"}`} style={{ fontSize: "1.5rem" }}></i>
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center text-muted">No movies found.</div>
        )}
      </div>

   
      <div className="d-flex justify-content-center mt-4">
        <button
          disabled={pageNumber === 1}
          className="btn btn-primary mx-2"
          onClick={() => {
            setPageNumber((prev) => prev - 1);
            navigate(`/movies/${pageNumber - 1}`);
          }}
        >
          Previous
        </button>
        <button
          className="btn btn-primary mx-2"
          onClick={() => {
            setPageNumber((prev) => prev + 1);
            navigate(`/movies/${pageNumber + 1}`);
          }}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default MovieCards;
