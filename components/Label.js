import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from '@ui-kitten/components';

import theme from '../theme';

export default function Label({ children }) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{children}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 1,
    paddingLeft: 8,
    paddingRight: 8,
    backgroundColor: theme.themeColor,
    borderRadius: 10,
    textAlign: 'center',
  },
  text: {
    color: '#fff',
  },
});
