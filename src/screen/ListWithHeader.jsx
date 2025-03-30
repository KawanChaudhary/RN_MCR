import {
  View,
  Text,
  SectionList,
  StyleSheet,
  Platform,
  Image,
} from 'react-native';
import React, {useEffect, useState, useCallback} from 'react';
import {FETCH_CATEGORIES} from './endpoint';

const ListWithHeader = () => {
  const [products, setProducts] = useState([]);

  const fetchProductsWithCategories = async categories => {
    try {
      const results = await Promise.all(
        categories.map(async cat => {
          const res = await fetch(cat?.url);
          const resJson = await res.json();
          return {
            title: cat.name,
            data: resJson?.products,
          };
        }),
      );
      setProducts(results);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const fetchCategories = () => {
    fetch(FETCH_CATEGORIES)
      .then(res => res.json())
      .then(data => fetchProductsWithCategories(data))
      .catch(err => console.log(err));
  };

  useEffect(fetchCategories, []);

  const renderHeader = useCallback(({section: {title}}) => {
    return (
      <View style={styles.header}>
        <Text style={styles.headerTitle}>{title}</Text>
      </View>
    );
  }, []);

  const renderItem = useCallback(({item}) => {
    return (
      <View style={styles.item}>
        <Image source={{uri: item?.thumbnail}} style={styles.image} />
        <View style={styles.itemDetails}>
          <Text style={styles.itemTitle}>{item.title}</Text>
          <Text style={styles.itemPrice}>Price: ${item.price}</Text>
        </View>
      </View>
    );
  }, []);

  const sectionSeparatorComp = () => (
    <View style={styles.sectionSeparatorComp} />
  )

  return (
    <SectionList
      sections={products}
      keyExtractor={item => item.id.toString()}
      renderItem={renderItem}
      renderSectionHeader={renderHeader}
      style={styles.container}
      removeClippedSubviews={true}
      initialNumToRender={10}
      maxToRenderPerBatch={15}
      windowSize={5}
      sectionSeparatorComponent={sectionSeparatorComp}
    />
  );
};

export default ListWithHeader;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  sectionSeparatorComp:{
    marginVertical:30
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom:20,
    marginHorizontal: 16,
    gap: 20,
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  itemDetails: {
    flex: 1,
    gap: 10,
  },
  itemTitle: {
    fontSize: 16,
    fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'Monospace',
  },
  itemPrice: {
    fontWeight: 'bold',
  },
  image: {
    width: 75,
    height: 75,
    borderRadius: 8,
  },
  header: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 6,
    marginBottom:20
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'Monospace',
  },
});
