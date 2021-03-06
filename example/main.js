import React, { Component } from 'react';
import { render } from 'react-dom';
import { Map, Marker, Popup, TileLayer } from 'react-leaflet';
import { GeoJsonCluster } from'../';
import request from 'superagent';

class App extends Component {

  state = {
    buses: null
  };

  componentWillMount() {
    request
      .get('data/vehicleposition.json')
      .end(function(error, response){
        if (error) return console.error(error);

        this.setState({
          buses: response.body
        });

      }.bind(this));
  }

  render () {
    const { buses } = this.state;

    if (!buses) {
        return (<div>loading...</div>);
    }

    return (
      <Map id="map" center={[30.25, -97.75]} zoom={13}>
        <TileLayer
          url='https://{s}.tiles.mapbox.com/v3/{id}/{z}/{x}/{y}.png'
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          id='paulserraino.n0dn3pbe' />
        <GeoJsonCluster data={buses} />
      </Map>
    );
  }

}

render(<App />, document.getElementById('map-container'));
