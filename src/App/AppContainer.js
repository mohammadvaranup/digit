import React, {Component} from 'react';
import Axios from 'axios';
import firebase from 'react-native-firebase';

//import firebase from 'react-native-firebase';

import {AsyncStorage, Alert, StatusBar, SafeAreaView} from 'react-native';
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

    // fcm
    this.checkPermission();
    this.createNotificationListeners();
  }

  //1
  async checkPermission() {
    const enabled = await firebase.messaging().hasPermission();
    if (enabled) {
      this.getToken();
    } else {
      this.requestPermission();
    }
  }

  //3
  async getToken() {
    let fcmToken = await AsyncStorage.getItem('fcmToken');
    if (!fcmToken) {
      fcmToken = await firebase.messaging().getToken();
      if (fcmToken) {
        // user has a device token
        await AsyncStorage.setItem('fcmToken', fcmToken);
      }
    }
  }

  //2
  async requestPermission() {
    try {
      await firebase.messaging().requestPermission();
      // User has authorised
      this.getToken();
    } catch (error) {
      // User has rejected permissions
      console.log('permission rejected');
    }
  }

  async createNotificationListeners() {
    /*
     * Triggered when a particular notification has been received in foreground
     * */
    this.notificationListener = firebase
      .notifications()
      .onNotification(notification => {
        const {title, body} = notification;
        this.showAlert(title, body);
      });

    /*
     * If your app is in background, you can listen for when a notification is clicked / tapped / opened as follows:
     * */
    this.notificationOpenedListener = firebase
      .notifications()
      .onNotificationOpened(notificationOpen => {
        const {title, body} = notificationOpen.notification;
        this.showAlert(title, body);
      });

    /*
     * If your app is closed, you can check if it was opened by a notification being clicked / tapped / opened as follows:
     * */
    const notificationOpen = await firebase
      .notifications()
      .getInitialNotification();
    if (notificationOpen) {
      const {title, body} = notificationOpen.notification;
      this.showAlert(title, body);
    }
    /*
     * Triggered for data only payload in foreground
     * */
    this.messageListener = firebase.messaging().onMessage(message => {
      //process data message
      console.log(JSON.stringify(message));
    });
  }

  showAlert(title, body) {
    Alert.alert(
      title,
      body,
      [{text: 'OK', onPress: () => console.log('OK Pressed')}],
      {cancelable: false},
    );
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
