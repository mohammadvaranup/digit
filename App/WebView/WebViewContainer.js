import React, {Component} from 'react';
import {StyleSheet, TouchableHighlight, View, Image, Text} from 'react-native';

import WebViewComponent from './WebViewComponent';
import Axios from 'axios';

export default class WebViewContainer extends Component {
  state = {
    index: 0,
    list: [
      {
        text: '',
        icon: '',
        link: '',
      },
    ],
  };

  onPress = index => {
    this.setState({index});
  };

  renderList = () => {
    const {list, index} = this.state;

    return (
      list.length > 1 && (
        <View style={styles.navView}>
          {list.length &&
            list.map((item, i) => {
              const isAactive = !!(index === i);
              return (
                <TouchableHighlight
                  key={i}
                  style={styles.button}
                  underlayColor="#fff0"
                  onPress={() => this.onPress(i)}>
                  <View style={styles.buttonContent}>
                    <Image
                      source={{uri: item.icon}}
                      style={styles.image}
                      tintColor={isAactive ? '#222' : '#999'}
                    />
                    <Text
                      style={styles.label}
                      tintColor={isAactive ? '#222' : '#999'}>
                      {item.text}
                    </Text>
                  </View>
                </TouchableHighlight>
              );
            })}
        </View>
      )
    );
  };

  componentDidMount() {
    //sync list
    Axios.get('http://smart-lemon.ir/bonyad/api', {withCredentials: true}).then(
      ({data}) => {
        this.setState({list: data});
      },
    );
  }

  render() {
    const {index, list} = this.state;

    return (
      <View style={styles.appContainer}>
        <View style={styles.webView}>
          <WebViewComponent link={list.length ? list[index].link : null} />
        </View>
        {this.renderList()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  appContainer: {
    backgroundColor: '#fff',
  },
  webView: {
    height: '100%',
    paddingBottom: 0,
  },
  navView: {
    width: '100%',
    height: 95,
    bottom: 0,
    position: 'absolute',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#fff',
    borderTopColor: '#9992',
    borderTopWidth: 1,
  },
  button: {
    width: 64,
    marginTop: 12,
  },
  buttonContent: {
    alignItems: 'center',
  },
  image: {
    height: 36,
    width: 36,
  },
  label: {
    color: '#999',
    textAlign: 'justify',
  },
});
