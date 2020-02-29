import React, {Component} from 'react';
import {StyleSheet, TouchableHighlight, View, Image, Text} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import WebViewComponent from './WebViewComponent';
import Axios from 'axios';

export default class WebViewContainer extends Component {
  state = {
    index: 0,
    list: [
      {
        icon_link: 'https://img.icons8.com/dusk/64/000000/dribbble.png',
        link: 'http://dribbble.com',
      },
      {
        icon_link: 'https://img.icons8.com/dusk/64/000000/instagram-new.png',
        link: 'http://instagram.com',
      },
      {
        icon_link: 'https://img.icons8.com/dusk/64/000000/home.png',
        link: 'http://google.com',
      },
      {
        icon_link: 'https://img.icons8.com/dusk/64/000000/linkedin.png',
        link: 'http://linkedin.com',
      },
      {
        icon_link: 'https://img.icons8.com/dusk/64/000000/pinterest.png',
        link: 'http://pinterest.com',
      },
    ],
  };

  onPress = index => {
    this.setState({index});
  };

  renderList = () => {
    const {list} = this.state;

    return (
      list.length &&
      list.map((item, i) => {
        return (
          <TouchableHighlight
            key={i}
            style={styles.button}
            onPress={() => this.onPress(i)}>
            <Image source={{uri: item.icon_link}} style={styles.image} />
          </TouchableHighlight>
        );
      })
    );
  };

  componentDidMount() {
    //sync list
    Axios.get('http://smart-lemon.ir/bonyad/api', {withCredentials: true}).then(
      ({data: list}) => {
        this.setState({list});
      },
    );
  }

  render() {
    const {index, list} = this.state;

    return (
      <>
        <View style={styles.webView}>
          <WebViewComponent link={list.length ? list[index].link : null} />
        </View>
        <View style={styles.navView}>{this.renderList()}</View>
      </>
    );
  }
}

const styles = StyleSheet.create({
  webView: {
    height: '100%',
  },
  navView: {
    width: '100%',
    height: 50,
    backgroundColor: '#2225',
    position: 'absolute',
    bottom: 0,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  image: {
    height: 36,
    width: 36,
  },
  button: {
    width: 36,
    margin: 8,
  },
});
