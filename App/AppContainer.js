import React, {Component} from 'react';
import Axios from 'axios';

import {StatusBar} from 'react-native';
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

  componentDidMount() {
    //sync list
    Axios.get('http://smart-lemon.ir/bonyad/api', {withCredentials: true}).then(
      ({data}) => {
        this.setState({list: data, loaded: true});
      },
    );
  }

  render() {
    const {list, loaded} = this.state;
    if (!loaded) {
      return (
        <>
          <StatusBar barStyle="dark-content" />
          <WebViewContainer list={list} />
        </>
      );
    }
    return <SplashScreen />;
  }
}
