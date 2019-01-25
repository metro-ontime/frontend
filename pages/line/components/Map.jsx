import {Component} from 'react';
import { StaticMap } from 'react-map-gl';

class Map extends Component {
  constructor(props) {
    super(props)
    this.state = {
      viewport: {
        width: '100%',
        height: '100%',
        latitude: this.props.data.latitude,
        longitude: this.props.data.longitude,
        zoom: this.props.data.zoom,
      }
    }
  }

  render() {
    return (
      <div style={{ height: '50vh', textAlign: 'justify' }}>
        <StaticMap
          {...this.state.viewport}
          mapboxApiAccessToken="pk.eyJ1IjoiY3RzZXh0b24iLCJhIjoiY2pyYmZnZGZjMDZrNDN5dDhoaWwwZXE5YiJ9.gMMj34iuAtw7FucL6kEMZw"
          mapStyle={ this.props.data.url }
          onViewportChange={(viewport) => this.setState({viewport})}
        />
    </div>
    );
  }
}

export default Map;
