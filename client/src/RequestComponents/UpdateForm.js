import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
const initialMovie = {
    id: '',
    title: '',
    director: '',
    metascore: '',
    stars: []
}

export default function UpdateForm(props) {
    const [movie, setMovie] = useState(initialMovie);
    const { id } = useParams();

    useEffect(() => {
        const movieToUpdate = props.movieData.find(movie => `${movie.id}` === id);
        console.log("this is moveToUpdate", movieToUpdate)
        console.log("this is movie", movie)
        setMovie(movieToUpdate)
        console.log("this is movie after the update", movie)
    }, [props.movieData, id])
    
    useEffect(() => {
      setMovie({
          ...movie,
          id: id
      })
    }, [])

    const changeHandler = e => {
        if(e.target.name === "stars1"){
            let current = movie.stars
            current[0] = e.target.value
            setMovie({
                ...movie,
                stars: current
            })
            return null
        }
        if(e.target.name === "stars2"){
            let current = movie.stars
            current[1] = e.target.value
            setMovie({
                ...movie,
                stars: current
            })
            return null
        }
        if(e.target.name === "stars3"){
            let current = movie.stars
            current[2] = e.target.value
            setMovie({
                ...movie,
                stars: current
            })
            return null
        }


        if(e.target.name === "stars"){
            setMovie({
                ...movie,
                stars: [...movie.stars, e.target.value]
            })
        } else{
        setMovie({
            ...movie,
            [e.target.name]: e.target.value
        });
        };
    };

    const submissionHandler = e => {
        e.preventDefault();
        console.log("Movie right before api call", movie)
        axios
            .put(`http://localhost:5000/api/movies/${id}`, movie)
            .then(res => {
                console.log(`update successful ${movie.name} was updated`)
                props.history.push(`/movies/${id}`)
            })
            .catch(err => {
                console.log(`update failed`, err)
            })

    }


    

    return (
        <div>
            <h2>Update Movie</h2>
            <form onSubmit={submissionHandler}>
                <input
                    type="text"
                    name="title"
                    onChange={changeHandler}
                    placeholder="title"
                    value={movie.title}
                />
                 <input
                    type="text"
                    name="director"
                    onChange={changeHandler}
                    placeholder="director"
                    value={movie.director}
                />
                 <input
                    type="number"
                    name="metascore"
                    onChange={changeHandler}
                    placeholder="metascore"
                    value={movie.metascore}
                />
                 <input
                    type="text"
                    name="stars1"
                    onChange={changeHandler}
                    placeholder="Headliner"
                    value={movie.stars[0]}
                />
                 <input
                    type="text"
                    name="stars2"
                    onChange={changeHandler}
                    placeholder="Second star"
                    value={movie.stars[1]}
                />
                 <input
                    type="text"
                    name="stars3"
                    onChange={changeHandler}
                    placeholder="Third star"
                    value={movie.stars[2]}
                />
                 {/* <input
                    type="text"
                    name="stars"
                    onChange={changeHandler}
                    placeholder="stars"
                    value={newstar}
                /> */}

                
                <button>Submit update</button>
            </form>
        </div>
    )
}
