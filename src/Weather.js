import React from "react";
import WeatherDay from './modules/WeatherDay';

class Weather extends React.Component {



    render () {
        return (
            <WeatherDay forecast={this.props.forecast}/>
        )
    }
}

export default Weather;