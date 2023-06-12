import React from "react";
import maplibregl from 'maplibre-gl';
import './Map.css';

class Map extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            mapContainer: null,
            map: null,
            lng: this.props.lon,
            lat: this.props.lat,
            zoom: 12,
            API_KEY: process.env.REACT_APP_LOCATIONIQ_API
        }
    }

    useEffect = () => {
        if (this.map) return; //stops map from intializing more than once
        this.map = new maplibregl.Map({
          container: this.mapContainer,
          style: `https://api.maptiler.com/maps/streets-v2/style.json?key=${this.state.API_KEY}`,
          center: [this.state.lng, this.state.lat],
          zoom: this.zoom
        });
      
      };

    render() {
        return (
            <div className="map-wrap">
                <div ref={this.state.mapContainer} className="map" />
            </div>
        )
    }
}

export default Map;