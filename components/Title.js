import React from 'react';
import { StyleSheet } from 'react-native';
import { Text } from '@ui-kitten/components';

export default function Title({ children }) {
  return (
    <Text style={styles.text} category='h1'>{children}</Text>
  );
};

const styles = StyleSheet.create({
  text: {
    marginBottom: 20,
    fontSize: 40,
  },
});
