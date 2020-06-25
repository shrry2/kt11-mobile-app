import React, { useState, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { Layout, Text } from '@ui-kitten/components';
import Constants from 'expo-constants';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import { themeColor } from '../theme';

import CategolyList from './CategoryList';
import ThreadList from '../screens/ThreadList';

const Tab = createMaterialTopTabNavigator();

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

export default function HomeScreen() {
  const [categoryList, setCategoryList] = useState([]);

  const loadCategoriesList = async () => {
    const list = await getCategoriesFromApiAsync();
    setCategoryList(list);
  };

  useEffect(() => {
    loadCategoriesList();
  }, []);

  const CategoryListScreen = () => <CategolyList categoryList={categoryList} />;

  const categoryTabs = [];
  categoryList.forEach((heading) => {
    heading.categories.forEach((category) => {
      const ThreadListScreen = () => <ThreadList category={category} />;
      categoryTabs.push(
        <Tab.Screen
          name={`cat_${category.id}`}
          component={ThreadListScreen}
          options={{ tabBarLabel: category.name }}
          key={`cat_${category.id}`}
        />
      );
    });
  });

  return (
    <Tab.Navigator
        initialRouteName="Categories"
        tabBarOptions={{
          activeTintColor: themeColor,
          labelStyle: { fontSize: 14 },
          style: { backgroundColor: '#ffffff' },
          scrollEnabled: true,
        }}
        style={styles.container}
      >
        <Tab.Screen
          name="Categories"
          options={{ tabBarLabel: 'カテゴリ一覧' }}
          component={CategoryListScreen}
        />
        {categoryTabs}
      </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#fff',
  },
});
