import axios from "axios";
import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { useNavigate, useParams } from "react-router-dom";

function Details() {
  let { id } = useParams();
  let [movie, setMovie] = useState({});
  const nav = useNavigate();
  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/movie/${id}?api_key=bf85c6cd8c2021f4fe2f6fdae05710eb`
      )
      .then((res) => {
        setMovie(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err, "error");
      });
  }, [id]);

  return (
  
<>


  <div className="card mb-3 h-50 shadow mt-4"> 
    <div className="row g-0">
      <div className="col-md-4 center" >
        <img  
          src={"https://image.tmdb.org/t/p/w500" + movie.poster_path} 
          className="img-fluid rounded-start" 
          alt={movie.original_title}
        />
      </div>
      <div className="col-md-12">
        <div className="card-body h-100 d-flex flex-column">
          <h5 className="card-title">{movie.original_title}</h5>
          <p className="card-text">{movie.overview}</p>
          <div className="mt-auto">
        
          </div>
        </div>
      </div>
    </div>
  </div>

  <Button className="mb-4" variant="primary" onClick={() => nav(-1)}>
    Go Back
  </Button>
</>
  );
}

export default Details;
