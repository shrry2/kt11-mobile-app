import React, { useState, useEffect } from 'react';
import { FlatList, View, StyleSheet, Image } from 'react-native';

import { Text, Divider, List, ListItem, Button } from '@ui-kitten/components';

import Title from '../components/Title';
import Label from '../components/Label';

import kateGlass from '../assets/illustrations/kateGlass.jpg';
import ideaBoy from '../assets/illustrations/ideaBoy.jpg'; 

const API_URL = process.env.KT11_API_URL || 'http://192.168.1.10/PERSONAL_PROJECTS/KT11/api/app';

const getCategoriesFromApiAsync = () => {
  return fetch(`${API_URL}/categories/list`)
    .then((response) => response.json())
    .then((responseJson) => {
      return responseJson.list;
    })
    .catch((error) => {
      console.error(error);
    });
};

export default function CategoryList({ categoryList }) {
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
      ListFooterComponent={getFooter}
      keyExtractor={(item) => item.heading_title}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: '#fff',
  },
  heading: {
    marginTop: 30,
    marginBottom: 10,
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
