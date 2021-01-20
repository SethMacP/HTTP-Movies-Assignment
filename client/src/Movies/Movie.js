import React, { useEffect, useState } from "react";
import axios from "axios";
import {  Link, useParams, useHistory } from "react-router-dom";
import MovieCard from "./MovieCard";

function Movie({ addToSavedList }) {
  const [movie, setMovie] = useState(null);
  const params = useParams();
  

  // console.log('this movie', movie)

  const fetchMovie = (id) => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then((res) => setMovie(res.data))
      .catch((err) => console.log(err.response));
  };

  const saveMovie = () => {
    addToSavedList(movie);
  };

  

  const deleteMovie = (e) => {
    e.preventDefault();
    console.log('deleting: ', movie.id )
      axios
        .delete(`http://localhost:5000/api/movies/${movie.id}`)
        .then(res => {
          console.log(res);
          
          })
        .catch(err => {
          console.log(err)
          })



  }

  const {push} = useHistory();

  useEffect(() => {
    fetchMovie(params.id);
    console.log("UE run, Movie")
  }, []);


  if (!movie) {
    return <div>Loading movie information...</div>;
  }

  return (
    <div className="save-wrapper">
      
      <MovieCard movie={movie} />

      <button 
        onClick={()=> push(`/update-movie/${movie.id}`)}
        className="updateButton"
        >
          Update</button>

          <button 
        onClick={deleteMovie}
        className="updateButton"
        >
          Delete</button>


      <div className="save-button" onClick={saveMovie}>
        Save
      </div>
      
      
    </div>
  );
}

export default Movie;
