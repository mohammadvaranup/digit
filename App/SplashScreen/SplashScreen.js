import React from 'react';
import {StyleSheet, View, Text} from 'react-native';

export default function() {
  return (
    <View style={styles.splashView}>
      <Text style={styles.text}>Loading...</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  splashView: {
    flex: 1,
    justifyContent: 'center',
  },
  text: {},
});
