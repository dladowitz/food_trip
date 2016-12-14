/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import OAuthSimple from 'oauthsimple';

export default class food_trip extends Component {
  state = {
    position: 'unknown',
    businesses: [],
    waypoints: ['720 Jones st, San Francisco, CA', '160 Visitacion Ave, Brisbane, CA', '340 University Ave, Palo Alto, CA', '18324 Clemson Ave, Saratoga, CA']
  };

  componentDidMount() {
    console.log('componentDidMount....');
    console.log('State: ', this.state);
    // navigator.geolocation.getCurrentPosition(
    //   (position) => {
    //     console.log('Position: ', position);
    //     this.setState({ position });
    //   },
    //   (error) => alert(error),
    //   { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    // );
  }

  findFoodOnRoute() {
    this.state.waypoints.map((waypoint) => {
      console.log('Looking for food around: ', waypoint)
      return this.fetchData(waypoint);
    });
  }

  fetchData(city) {
    // const lat = this.state.position.coords.latitude;
    // const lng = this.state.position.coords.longitude;
    // const latlng = `ll=${String(lat)},${String(lng)}`;
    const consumerKey = 'nVeyIROhiW6EMFBcA5iA1w';
    const consumerSecret = 'GrP921_svILXGljhQSnm1_tMBX8';
    const tokenSecret = '9XpvW154RPZxgB-LPcI5llrs47U';
    const token = 'S5dzlOqQCjgMptscu9cZTG_yzyFaAyvq';
    const searchTerm = 'ramen';
    const location = city;
    const radius = '2000';
    const limit = 5;
    const openNow = true;
    const params = `term=${searchTerm}&location=${location}&radius=${radius}&limit=${limit}&open_now=${openNow}`;
    // const nav = this.props.navigator;

    const oauth = new OAuthSimple(consumerKey, tokenSecret);
    const request = oauth.sign({
      action: 'GET',
      path: 'https://api.yelp.com/v2/search',
      parameters: params,
      signatures: { api_key: consumerKey,
                    shared_secret: consumerSecret,
                    access_token: token,
                    access_secret: tokenSecret },
    });


    fetch(request.signed_url, { method: 'GET' }).then((response) => {
      return response.json();
    }).then((data) => {
      let newBusinesses = this.state.businesses;

      data.businesses.map((business) => {
        return newBusinesses.push(business);
      });

      this.setState({ businesses: newBusinesses });
      console.log('Businesses: ', this.state.businesses);

    }).catch((error) => {
      console.log('Error:', error);
    });
  }


  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Food Trip
        </Text>
        <TouchableOpacity
          style={{ borderRadius: 7, padding: 10, backgroundColor: 'rgb(37, 160, 205)' }}
          // onPress={this.fetchData.bind(this)}
          onPress={this.findFoodOnRoute.bind(this)}
        >
          <Text style={{ fontSize: 15 }}>Find Food!</Text>

        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('food_trip', () => food_trip);
