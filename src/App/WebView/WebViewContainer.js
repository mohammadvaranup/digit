import React, {Component} from 'react';
import {StyleSheet, TouchableHighlight, View, Image, Text} from 'react-native';

import WebViewComponent from './WebViewComponent';

export default class WebViewContainer extends Component {
  state = {
    index: 0,
  };

  onPress = index => {
    this.setState({index});
  };

  renderList = () => {
    const {index} = this.state;
    const {list} = this.props;

    return (
      list.length > 1 && (
        <View style={styles.navView}>
          {list.length &&
            list.map((item, i) => {
              let isAactive = !!(index === i);
              return (
                <TouchableHighlight
                  key={i}
                  style={styles.button}
                  underlayColor="#fff0"
                  onPress={() => this.onPress(i)}>
                  <View style={styles.buttonView}>
                    <Image
                      source={{uri: item.icon}}
                      style={styles.buttonImage}
                      tintColor={isAactive ? '#222' : '#999'}
                    />
                    <Text
                      style={styles.buttonLabel}
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

  render() {
    const {index} = this.state;
    const {list} = this.props;

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
    paddingBottom: 24,
  },
  navView: {
    width: '100%',
    height: 75,
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
  buttonView: {
    alignItems: 'center',
  },
  buttonImage: {
    height: 36,
    width: 36,
  },
  buttonLabel: {
    color: '#999',
    textAlign: 'justify',
  },
});
