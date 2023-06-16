import React from "react";

class Movie extends React.Component {
    render() {
        return (
            <div id="movie_container">
            {this.props.movieData.map((film, index) => {
                return <div key={index} className="movieCard">
                    <h3 className="film_title">{film.title}</h3>
                    <img src="" alt="" />
                    <p>{film.voteRating}</p>
                    <p>{film.description}</p>
                </div>
            })}
            </div>
        )
    }
}

export default Movie;