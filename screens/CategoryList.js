import React, { useState, useEffect } from 'react';
import { FlatList, View, StyleSheet, Image } from 'react-native';

import { Text, Divider, List, ListItem, Button } from '@ui-kitten/components';

import Title from '../components/Title';
import Label from '../components/Label';

import ideaBoy from '../assets/illustrations/ideaBoy.jpg'; 

export default function CategoryList({ categoryList }) {
  const getHeader = () => (
    <View style={styles.header}>
      <Title>カテゴリ一覧</Title>
    </View>
  );

  const getFooter = () => (
    <View style={styles.footer}>
      <Image source={ideaBoy} style={{ width: 305, height: 159 }} /> 
      <Text>新しいカテゴリをご希望ですか？</Text>
      <Text>お気軽に管理人までどうぞ！</Text>
    </View>
  );

  const renderItemAccessory = (threadCount) => (
    <Label>{threadCount}</Label>
  );

  const renderCategoryList = ({ item, index }) => (
    <ListItem
      style={styles.categoryListItem}
      title={item.name}
      description={item.description.replace(/<br \/>/g, '')}
      accessoryRight={() => renderItemAccessory(item.thread_count)}
    />
  );

  const renderHeading = ({ item }) => (
    <View key={item.heading_title}>
      <Text style={styles.heading} category='h2'>{item.heading_title}</Text>
      <List
        style={styles.list}
        data={item.categories}
        ItemSeparatorComponent={Divider}
        renderItem={renderCategoryList}
        keyExtractor={(item) => item.name}
      />
    </View>
  );

  return (
    <FlatList style={styles.container}
      data={categoryList}
      renderItem={renderHeading}
      ListHeaderComponent={getHeader}
      ListFooterComponent={getFooter}
      keyExtractor={(item) => item.heading_title}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
  },
  header: {
    marginTop: 10,
    padding: 10,
  },
  heading: {
    marginTop: 10,
    padding: 10,
  },
  categoryListItem: {
    paddingTop: 18,
    paddingBottom: 18,
  },
  footer: {
    marginTop: 20,
    paddingBottom: 40,
    flex: 1,
    alignItems: 'center',
  },
});
