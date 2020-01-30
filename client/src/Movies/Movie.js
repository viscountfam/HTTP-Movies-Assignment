import React from "react";
import axios from "axios";
import MovieCard from "./MovieCard";
export default class Movie extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      movie: null
    };
  }

  componentDidMount() {
    this.fetchMovie(this.props.match.params.id);
  }

  componentWillReceiveProps(newProps) {
    if (this.props.match.params.id !== newProps.match.params.id) {
      this.fetchMovie(newProps.match.params.id);
    }
  }

  fetchMovie = id => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then(res =>{
         console.log(res.data)
         this.setState({ movie: res.data })})
      .catch(err => console.log(err.response));
  };

  saveMovie = () => {
    console.log("This is the movie state", this.state.movie)
    const addToSavedList = this.props.addToSavedList;
    addToSavedList(this.state.movie);
  };

  handleUpdate = e => {
    e.preventDefault();
    this.props.history.push(`/update-form/${this.state.movie.id}`)
  }

  deleteMovie = e => {
    e.preventDefault();
    axios
      .delete(`http://localhost:5000/api/movies/${this.state.movie.id}`)
      .then(res => {
        console.log(`this is the delete request response`, res);
        this.props.history.push(`/`)
      })
      .catch(err => {
        console.log(`An error occurred when trying to delete ${this.state.movie}`, err)
      })
  }
  
  render() {
    if (!this.state.movie) {
      return <div>Loading movie information...</div>;
    }

    return (
      <div className="save-wrapper">
        <MovieCard movie={this.state.movie} />
        <button onClick={this.handleUpdate}> Update </button>
        <button onClick={this.deleteMovie}> Delete </button>
        <div className="save-button" onClick={this.saveMovie}>
          Save
        </div>
        
      </div>
    );
  }
}
