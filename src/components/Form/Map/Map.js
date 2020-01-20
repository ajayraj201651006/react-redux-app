import React, { Component } from 'react';
import './Map.css';
import mapboxgl from 'mapbox-gl';
import CloseIcon from '@material-ui/icons/Close';

const token = process.env.REACT_APP_MAPBOX_TOKEN;

mapboxgl.accessToken = token;

class Map extends Component {

    state = {
        lang: 5,
        lat: 34,
        zoom: 2
    }

    componentDidMount() {
         var map = new mapboxgl.Map({
             container: 'map',
             style: 'mapbox://styles/mapbox/streets-v11',
             center: [this.state.lang, this.state.lat],
             zoom: this.state.zoom
         });

         var marker = new mapboxgl.Marker({
             draggable: true
         }).setLngLat([this.state.lang, this.state.lat])
            .addTo(map);

        //  map.on('move', () => {
        //     this.setState({
        //         lang: map.getCenter().lng.toFixed(4),
        //         lat: map.getCenter().lat.toFixed(4),
        //         zoom: map.getZoom().toFixed(2)
        //         });
        // });
        marker.on('dragend', () => {
            var lngLat = marker.getLngLat();
            this.setState({
                lang: lngLat.lng.toFixed(4),
                lat: lngLat.lat.toFixed(4),
                zoom: map.getZoom().toFixed(2)
            });
        });
    }

    componentDidUpdate() {
        console.log(this.state);
    }

    childToParent = (data) => {
        this.props.handleState(data);
    }

    render() {
        return(
            <div className="mapPop">
                <div className='mapPop_inner'>
                    <div className="lat-lang">
                        <div>
                        Longitude: {this.state.lang} | Latitude: {this.state.lat} | Zoom: {this.state.zoom}
                        </div> 
                    </div>
                    <div className="close">
                        <CloseIcon onClick={() => this.childToParent(this.state)}/> 
                    </div>
                    <div id='map' className="mapContainer" />   
                </div>
             </div>
        );
    }
}

export default Map;