import {Component} from 'react';
import { StaticMap } from 'react-map-gl';

class Map extends Component {

  state = {
    viewport: {
      width: '100%',
      height: '100%',
      latitude: 34.093382,
      longitude: -118.063454,
      zoom: 11,
    }
  };

  render() {
    return (
      <div style={{ height: '50vh', textAlign: 'justify' }}>
        <StaticMap
          {...this.state.viewport}
          mapboxApiAccessToken="pk.eyJ1IjoiY3RzZXh0b24iLCJhIjoiY2pyYmZnZGZjMDZrNDN5dDhoaWwwZXE5YiJ9.gMMj34iuAtw7FucL6kEMZw"
          mapStyle="mapbox://styles/ctsexton/cjrbfw0eh005t2ssddgy66l7d"
          onViewportChange={(viewport) => this.setState({viewport})}
        />
    </div>
    );
  }
}

export default Map;
