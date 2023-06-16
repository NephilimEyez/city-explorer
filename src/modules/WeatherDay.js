import React from "react";

class WeatherDay extends React.Component {
    render() {
        return (
            <div id="weatherContainer">
                {this.props.forecast.map((day, index) => {
                return <div key={index} className="weatherDay">
                <img src="./public/icons/{day.icon}.png" alt="" />
                <p>Date: {day.date}</p>
                <p>Description: {day.description}</p>
                </div>
                })}
            </div>
        )
    }
}

export default WeatherDay;