import React from "react";
import Movie from './Movie';

class Movies extends React.Component {

    render() {
        return (
            <Movie movieData={this.props.movieData} />
        )
    }
}

export default Movies;