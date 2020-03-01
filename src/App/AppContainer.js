import React, {Component} from 'react';
import Axios from 'axios';

//import firebase from 'react-native-firebase';

import {StatusBar, SafeAreaView} from 'react-native';
import WebViewContainer from './WebView/WebViewContainer';
import SplashScreen from './SplashScreen/SplashScreen';

export default class AppContainer extends Component {
  state = {
    loaded: false,
    list: [
      {
        text: '',
        icon: '',
        link: '',
      },
    ],
  };

  async componentDidMount() {
    //sync list
    await Axios.get('http://smart-lemon.ir/bonyad/api', {
      withCredentials: true,
    }).then(({data}) => {
      this.setState({list: data, loaded: true});
    });

    //check push notification permissions
    /*const enabled = await firebase.messaging().hasPermission();
    if (enabled) {
      console.log('has permission');
      // user has permissions
    } else {
      console.log('no permission');
      // user doesn't have permission
    }*/
  }

  render() {
    const {list, loaded} = this.state;
    if (loaded) {
      return (
        <>
          <StatusBar barStyle="dark-content" />
          <SafeAreaView>
            <WebViewContainer list={list} />
          </SafeAreaView>
        </>
      );
    }
    return <SplashScreen />;
  }
}
