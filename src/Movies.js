import React from "react";
import Movie from './modules/Movie';

class Movies extends React.Component {
    // console.log(this.props.movieData);

    render() {
        return (
            <Movie movieData={this.props.movieData} />
        )
    }
}

export default Movies;