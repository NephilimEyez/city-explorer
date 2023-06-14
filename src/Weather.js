import React from "react";
// import Icon from './Icon';

class Weather extends React.Component {



    render () {
        return (
            <div id="weatherContainer">
                {this.props.forecast.map((day, index) => {
                    return <div key={index} className="weatherDay">
                        {/* <p><Icon condition={this.props.condition}/></p> */}
                        <p>Date {day.date}</p>
                        <p>Description: {day.description}</p>
                    </div>
                })}
            </div>
        )
    }
}

export default Weather;