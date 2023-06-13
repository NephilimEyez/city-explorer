import React from 'react';
import './App.css';
import axios from 'axios';

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
    } catch (error) {
      this.setState({
        error: true,
        errorMsg: error.response.data.error
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
            : <div>{this.state.lon && <img src={this.state.mapImg} alt='' />} </div>
          }
      </main>
    )
  }
}


export default App;
