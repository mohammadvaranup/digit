import React, {Component} from 'react';
import {WebView} from 'react-native-webview';
import {StyleSheet} from 'react-native';

export default class WebViewComponent extends Component {
  render() {
    const {link} = this.props;
    console.log(link);
    return (
      <WebView
        source={{uri: link}}
        style={styles.webView}
        startInLoadingState={true}
      />
    );
  }
}

const styles = StyleSheet.create({
  webView: {
    width: '100%',
    marginBottom: 50,
  },
});
