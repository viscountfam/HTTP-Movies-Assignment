import React, {useState} from 'react';
import axios from 'axios';



export default function MovieForm(props) {
    const [newMovie, setNewMovie] = useState({
        title: "",
        director: "",
        metascore: "",
        stars: []
    })

    const changeHandler = e => {
        if(e.target.name === "stars1"){
            let current = newMovie.stars
            current[0] = e.target.value
            setNewMovie({
                ...newMovie,
                stars: current
            })
            return null
        }
        if(e.target.name === "stars2"){
            let current = newMovie.stars
            current[1] = e.target.value
            setNewMovie({
                ...newMovie,
                stars: current
            })
            return null
        }
        if(e.target.name === "stars3"){
            let current = newMovie.stars
            current[2] = e.target.value
            setNewMovie({
                ...newMovie,
                stars: current
            })
            return null
        }


        if(e.target.name === "stars"){
            setNewMovie({
                ...newMovie,
                stars: [newMovie.stars, e.target.value]
            })
        } else{
        setNewMovie({
            ...newMovie,
            [e.target.name]: e.target.value
        });
        };
    };

    const movieSubmission = e => {
        e.preventDefault();
        console.log("new movie right before the call", newMovie)
        axios
            .post(`http://localhost:5000/api/movies`, newMovie)
            .then(res => {
                console.log(`new movie ${newMovie} was added`, res)
                props.history.push(`/`)
            })
            .catch(err => {
                console.log(`new post updated`, err)
            })

    }

    return (
        <div>
            <h2>New movies</h2>
            <form onSubmit={movieSubmission}>
                <input
                    type="text"
                    name="title"
                    onChange={changeHandler}
                    placeholder="title"
                    value = {newMovie.title}
                />
                 <input
                    type="text"
                    name="director"
                    onChange={changeHandler}
                    placeholder="director"
                    value = {newMovie.director}
                />
                 <input
                    type="number"
                    name="metascore"
                    onChange={changeHandler}
                    placeholder="metascore"
                    value = {newMovie.metascore}
                />
                 <input
                    type="text"
                    name="stars1"
                    onChange={changeHandler}
                    placeholder="Headliner"
                    value = {newMovie.stars[0]}
                />
                 <input
                    type="text"
                    name="stars2"
                    onChange={changeHandler}
                    placeholder="Second star"
                    value = {newMovie.stars[1]}
                />
                 <input
                    type="text"
                    name="stars3"
                    onChange={changeHandler}
                    placeholder="Third star"
                    value = {newMovie.stars[2]}
                />
                <button>Add Movie</button>
            </form>
        </div>
    )
}
