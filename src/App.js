import React from 'react';
import './App.css';
import axios from 'axios';
import Weather from './Weather';
import Movie from './Movie';

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
      movieData: [],
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
      this.getWeather(cityDataFromAxios.data[0].lat, cityDataFromAxios.data[0].lon);
      this.getMovies();
    } catch (error) {
      this.setState({
        error: true,
        errorMsg: error.response.data.error
      })
    }
  }

  getWeather = async (lat, lon) => {
    try {
      let weatherUrl = `${process.env.REACT_APP_SERVER}/weather?lat=${lat}&lon=${lon}`;
      let weatherAxiosData = await axios.get(weatherUrl);
      let weatherData = weatherAxiosData.data;
      this.setState({
        weatherData,
        error: false,
        errorMsg: ''
      })
    } catch (error) {
      this.setState({
        error: true,
        errorMsg: error.message
      })
    }
  }

  getMovies = async () => {
    try {
      let movieUrl = `${process.env.REACT_APP_SERVER}/movie?searchQuery=${this.state.city}`;
      let movieAxiosData = await axios.get(movieUrl);
      let movieData = movieAxiosData.data;
      console.log(movieData);
      this.setState({
        movieData,
        error: false,
        errorMsg: ''
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
            <label> Enter a City Name:
              <input type="text" onInput={this.handleCityInput} />
            </label>
            <button type="submit">Explore!</button>
          </form>
          {
            this.state.error
            ? <p>{this.state.errorMsg}</p>
            : <div id='main_container'>
                  {this.state.lon && <div id='city_header'><h1>{this.state.city}</h1><p>Lattitude: {this.state.lat}</p><p>Longitude: {this.state.lon}</p></div>}
                  <div id='return_container'>
                  {this.state.lon && <div id='map_box'>{this.state.lon && <img src={this.state.mapImg} alt='' />} </div>}
                  {this.state.movieData[1] && <Movie movieData={this.state.movieData} />}
                </div>
                  {this.state.weatherData[1] && <Weather forecast={this.state.weatherData} />}
              </div>
          }
      </main>
    )
  }
}


export default App;
