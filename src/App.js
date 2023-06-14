import React from 'react';
import './App.css';
import axios from 'axios';
import Weather from './Weather'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      city: '',
      locationData: [],
      error: false,
      errorMsg: '',
      lat: '',
      lon: '',
      mapImg: '',
      weatherData: [],
      // condition: '',
      API_KEY: process.env.REACT_APP_LOCATIONIQ_API
    }
  }

  handleCityInput = (event) => this.setState({city: event.target.value});

  handleGetCityInfo = async (event) => {
    event.preventDefault();

    try {
      let url = `https://us1.locationiq.com/v1/search?key=${this.state.API_KEY}&q=${this.state.city}&format=json`;

      let cityDataFromAxios = await axios.get(url);
      console.log(cityDataFromAxios.data[0]);

      this.setState({
        locationData: cityDataFromAxios.data[0],
        lat: cityDataFromAxios.data[0].lat,
        lon: cityDataFromAxios.data[0].lon,
        mapImg: `https://maps.locationiq.com/v3/staticmap?key=${this.state.API_KEY}&center=${cityDataFromAxios.data[0].lat},${cityDataFromAxios.data[0].lon}&zoom=10&size='25vw'x'25vw'&format=png&maptype=roadmap'>`,
        error: false,
        errorMsg: ''
      })
      this.getWeather();
    } catch (error) {
      this.setState({
        error: true,
        errorMsg: error.response.data.error
      })
    }
  }

  // createIcon = () => {
  //   // let holder = '';
  //   if(this.props.forecast.description.toLowerCase() === 'light rain') {
  //       // holder = 'wi wi-sprinkle';
  //       this.setState({
  //           condition: 'wi wi-sprinkle'
  //       })
  //       // return holder;
  //   } else if (this.props.forecast.description.toLowerCase() === 'broken clouds') {
  //       // holder = 'wi wi-night-partly-cloudy'
  //       this.setState({
  //           condition: 'wi wi-night-partly-cloudy'
  //       })
  //       // return holder;
  //   } else if (this.props.forecast.description.toLowerCase() === 'scattered clouds') {
  //       this.setState({
  //           condition: 'wi wi-cloud'
  //       })
  //   } else {
  //       this.setState({
  //           condition: 'wi wi-alien'
  //       })
  //   }
  // }

  getWeather = async () => {
    try {
      let weatherUrl = `${process.env.REACT_APP_SERVER}/weather?searchQuery=${this.state.city}`;
      let weatherAxiosData = await axios.get(weatherUrl);
      let weatherData = weatherAxiosData.data;
      console.log(weatherAxiosData);
      this.setState({
        weatherData,
      })
    } catch (error) {
      this.setState({
        error: true,
        errorMsg: error.message
      })
    }
  }


  render() {
    return (
      <main>
        <form onSubmit={this.handleGetCityInfo}>
            <label htmlFor=""> Enter a City Name:
              <input type="text" onInput={this.handleCityInput} />
            </label>
            <button type="submit">Explore!</button>
          </form>
          {
            this.state.error
            ? <p>{this.state.errorMsg}</p>
            : <div>
                {this.state.lon && <div id='return_container'><div><h1>{this.state.city}</h1><p>Lattitude: {this.state.lat}</p><p>Longitude: {this.state.lon}</p></div><div>{this.state.lon && <img src={this.state.mapImg} alt='' />} </div></div>}
                {this.state.weatherData.length > 0 && <Weather forecast={this.state.weatherData} condition={this.state.condition} />}
              </div>
          }
      </main>
    )
  }
}


export default App;
