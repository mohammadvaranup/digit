import React from 'react';
import {StyleSheet, View, Image} from 'react-native';

export default function() {
  return (
    <View style={styles.splashView}>
      <Image source={require('./SplashImage.png')} />
    </View>
  );
}

const styles = StyleSheet.create({
  splashView: {
    backgroundColor: '#296EFA',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
