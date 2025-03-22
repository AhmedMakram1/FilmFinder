import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Outlet } from 'react-router-dom';

function MovieSlider() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const apiKey = 'c94b800b13b9b455a5d91c9b54e821a3';
    
    axios.get(`https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}`)
      .then(response => {
        // Get the first 5 movies for the slider
        setMovies(response.data.results.slice(0, 5));
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
        console.error('Error fetching movies for slider:', err);
      });
  }, []);

  // Auto-slide functionality
  useEffect(() => {
    if (movies.length > 0) {
      const interval = setInterval(() => {
        setActiveIndex((prevIndex) => (prevIndex + 1) % movies.length);
      }, 5000);
      
      return () => clearInterval(interval);
    }
  }, [movies]);

  const goToSlide = (index) => {
    setActiveIndex(index);
  };

  const goToPrevSlide = () => {
    setActiveIndex((prevIndex) => 
      prevIndex === 0 ? movies.length - 1 : prevIndex - 1
    );
  };

  const goToNextSlide = () => {
    setActiveIndex((prevIndex) => 
      (prevIndex + 1) % movies.length
    );
  };

  if (loading) return (
    <div className="d-flex justify-content-center my-5">
      <div className="spinner-border text-primary" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );

  if (error) return (
    <div className="alert alert-danger m-3" role="alert">
      Error: {error}
    </div>
  );

  if (movies.length === 0) return (
    <div className="alert alert-info m-3" role="alert">
      No movies available for the slider.
    </div>
  );

  return (


    <>
    
    <div className="custom-carousel position-relative mb-5">
      <div className="carousel-inner">
        {movies.map((movie, index) => (
          <div 
            key={movie.id} 
            className={`carousel-item ${index === activeIndex ? "d-block" : "d-none"}`}
          >
            <div className="position-relative">
              <img 
                src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`} 
                className="d-block w-100" 
                alt={movie.title}
                style={{ height: '60vh', objectFit: 'cover', filter: 'brightness(0.7)' }}
              />
              <div className="position-absolute bottom-0 start-0 text-start bg-dark bg-opacity-50 p-4 m-3 rounded text-white">
                <h2>{movie.title}</h2>
                <p className="mb-2">
                  <span className="badge bg-warning text-dark me-2">
                    <i className="bi bi-star-fill me-1"></i>
                    {movie.vote_average.toFixed(1)}
                  </span>
                  <span className="badge bg-primary">{movie.release_date.split('-')[0]}</span>
                </p>
                <p className="d-none d-lg-block">
                  {movie.overview.substring(0, 150)}...
                </p>
                <button className="btn btn-primary">View Details</button>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Custom controls */}
      <button 
        className="carousel-control-prev" 
        type="button" 
        onClick={goToPrevSlide}
        style={{ zIndex: 10 }}
      >
        <span className="carousel-control-prev-icon bg-dark bg-opacity-50 rounded p-3" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button 
        className="carousel-control-next" 
        type="button" 
        onClick={goToNextSlide}
        style={{ zIndex: 10 }}
      >
        <span className="carousel-control-next-icon bg-dark bg-opacity-50 rounded p-3" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
      
      {/* Custom indicators */}
      <div className="carousel-indicators position-absolute bottom-0 mb-0 pb-3 w-100 d-flex justify-content-center" style={{ zIndex: 10 }}>
        {movies.map((_, index) => (
          <button 
            key={`indicator-${index}`}
            className={`rounded-circle mx-1 border-0 ${activeIndex === index ? "bg-primary" : "bg-secondary"}`}
            style={{ width: '12px', height: '12px' }}
            onClick={() => goToSlide(index)}
          ></button>
        ))}
      </div>
    </div>
    </>
  );
}

export default MovieSlider;