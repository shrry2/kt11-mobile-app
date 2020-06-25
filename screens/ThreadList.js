import React, { useState, useEffect } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';

import { Text, Divider, List, ListItem } from '@ui-kitten/components';

import Title from '../components/Title';
import Label from '../components/Label';

const API_URL = process.env.KT11_API_URL || 'http://192.168.1.10/PERSONAL_PROJECTS/KT11/api/app';

const getThreadsFromApiAsync = async (categoryId) => {
  return fetch(`${API_URL}/threads/list?cat_id=${categoryId}`)
    .then((response) => response.json())
    .then((responseJson) => {
      return responseJson.threads;
    })
    .catch((error) => {
      console.error(error);
    });
};

export default function ThreadList({ category }) {
  const [threads, setThreads] = useState([]);

  const loadThreads = async () => {
    const getThreads = await getThreadsFromApiAsync(category.id);
    setThreads(getThreads);
  };

  useEffect(() => {
    loadThreads();
  }, []);

  const getHeader = () => (
    <View style={styles.header}>
      <Title>{category.name}</Title>
      <Text>{category.description}</Text>
    </View>
  );

  const renderItemAccessory = (postCount) => (
    <Label>{postCount}</Label>
  );

  const renderThreadRow = ({ item, index }) => (
    <ListItem
      style={styles.threadRow}
      title={item.title}
      accessoryRight={() => renderItemAccessory(item.post_count)}
    />
  );

  const getFooter = () => (
    <View style={styles.footer}>
    </View>
  );

  return (
    <FlatList style={styles.container}
      data={threads}
      renderItem={renderThreadRow}
      ListHeaderComponent={getHeader}
      ListFooterComponent={getFooter}
      keyExtractor={(item) => item.id}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: '#fff',
  },
  header: {
    marginTop: 10,
  },
  listContainer: {

  },
  threadRow: {

  },
  footer: {
    marginTop: 20,
    paddingBottom: 40,
    flex: 1,
    alignItems: 'center',
  },
});
