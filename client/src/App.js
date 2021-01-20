import React, { useState, useEffect } from "react";
import { Route } from "react-router-dom";
import { useParams, useHistory} from 'react-router'
import SavedList from "./Movies/SavedList";
import AddMovie from "./Movies/AddMovie"
import MovieList from "./Movies/MovieList";
import Movie from "./Movies/Movie";
import UpdateMovie from './Movies/UpdateMovie';
import axios from 'axios';

const App = () => {
  const [savedList, setSavedList] = useState([]);
  const [movieList, setMovieList] = useState([]);

  const params = useParams();
  const history = useHistory();

  const getMovieList = () => {
    axios
      .get("http://localhost:5000/api/movies")
      .then(res => setMovieList(res.data))
      .catch(err => console.log(err.response));
  };

  const addToSavedList = movie => {
    setSavedList([...savedList, movie]);
  };

  useEffect(() => {
    getMovieList();
    console.log("UE Ran, APP")
  }, [params] );

  return (
    <>
    <button onClick={()=>{history.push("/add-movie")}}>Add Movie</button>
      <SavedList list={savedList} />

      <Route exact path="/">
        <MovieList movies={movieList} />
      </Route>

      <Route path="/movies/:id">
        <Movie addToSavedList={addToSavedList} />
      </Route>

      <Route 
        path="/update-movie/:id"
        component={UpdateMovie}/>
        
      <Route 
        path="/add-movie"
        component={AddMovie}
      />
    </>
  );
};

export default App;
