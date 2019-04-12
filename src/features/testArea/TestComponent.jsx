import React, { Component } from 'react'
import { connect } from 'react-redux'
import GoogleMapReact from 'google-map-react'
import { Icon } from 'semantic-ui-react'
import { testOperations } from 'app/ducks/test'

type Props = {
  center: {
    lat: Number,
    lng: Number
  },
  zoom: number,
  incrementCounter: any,
  decrementCounter: any
}

const Marker = () => <Icon name="marker" size="big" color="red" />

// function new_script(src) {
//   return new Promise(function(resolve, reject){
//     var script = document.createElement('script');
//     script.src = src;
//     script.addEventListener('load', function () {
//       resolve();
//     });
//     script.addEventListener('error', function (e) {
//       reject(e);
//     });
//     document.body.appendChild(script);
//   })
// };
// Promise Interface can ensure load the script only once.
// new_script("https://maps.googleapis.com/maps/api/js?key=AIzaSyCh-6nXj4ZWOCtTl6K7tYeS_c7xg2LiGb4&libraries=places");

// const GOOGLE_API_KEY = 'AIzaSyCh-6nXj4ZWOCtTl6K7tYeS_c7xg2LiGb4'

class TestComponent extends Component<Props> {
  static defaultProps = {
    center: {
      lat: 59.95,
      lng: 30.33
    },
    zoom: 11
  }

  render() {
    return (
      <div style={{ height: '300px', width: '100%' }}>
        <GoogleMapReact bootstrapURLKeys={{ key: 'AIzaSyCzSo3on_8SiV6ewl-l6n7T8W7ljvpCbRE' }} defaultCenter={this.props.center} defaultZoom={this.props.zoom}>
          <Marker />
        </GoogleMapReact>
      </div>
    )
  }
}

function mapStateToProps(state) {
  const { data = 0, counter = 0 } = state.test
  return {
    data,
    counter
  }
}

function mapDispatchToProps(dispatch) {
  return {
    setData: data => dispatch(testOperations.setData(data)),
    incrementCounter: data => dispatch(testOperations.incrementCounter()),
    decrementCounter: data => dispatch(testOperations.decrementCounter())
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TestComponent)
