import React from 'react';
import './App.css';
import axios from 'axios';
import Map from './Map';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      city: '',
      locationData: [],
      error: false,
      errorMsg: ''
    }
  }

  handleCityInput = (event) => this.setState({city: event.target.value});

  handleGetCityInfo = async (event) => {
    event.preventDefault();

    try {
      let url = `https://us1.locationiq.com/v1/search?key=${process.env.REACT_APP_LOCATIONIQ_API}&q=${this.state.city}&format=json`;

      let cityDataFromAxios = await axios.get(url);

      this.setState({
        locationData: cityDataFromAxios.data[0],
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
      <>
      <form onSubmit={this.handleGetCityInfo}>
          <label htmlFor=""> Enter a City Name:
            <input type="text" onInput={this.handleCityInput} />
          </label>
          <button type="submit">Explore!</button>
        </form>
        {
          this.state.error
          ? <p>{this.state.errorMsg}</p>
          : <Map 
          lat={this.state.locationData.lat} 
          lon={this.state.locationData.lon}
          />
        }
      </>
    )
  }
}


export default App;
