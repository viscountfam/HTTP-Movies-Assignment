import React, { useState } from "react";
import { Route } from "react-router-dom";
import SavedList from "./Movies/SavedList";
import MovieList from "./Movies/MovieList";
import Movie from "./Movies/Movie";
import UpdateForm from "./RequestComponents/UpdateForm"

const App = () => {
  const [savedList, setSavedList] = useState([]);
  const [movieData, setMovieData] = useState([])
  const addToSavedList = movie => {
    setSavedList([...savedList, movie]);
  };

  return (
    <>
      <SavedList list={savedList} />
      <Route exact path="/" 
      render={props => <MovieList {...props } setMovieData={setMovieData} />}
      />
      <Route
        path="/movies/:id"
        render={props => {
          return <Movie {...props} addToSavedList={addToSavedList} />;
        }}
      />
      <Route path="/update-form/:id"
      render={props => <UpdateForm {...props} movieData={movieData} />}
      />
    </>
  );
};

export default App;
