import React, {useState} from 'react';
import {View, Text, StyleSheet, FlatList, ScrollView} from 'react-native';
import usePagination from './usePagination';
import {fetchProducts} from './fetchProducts';

const TableRow = ({item}) => (
  <View style={styles.row}>
    <Text style={[styles.cell, {width: 40}]}>{item.id}</Text>
    <Text style={[styles.cell, {width: 200}]}>{item.title}</Text>
    <Text style={[styles.cell, {width: 60}]}>{item.price}</Text>
    <Text style={[styles.cell, {width: 70}]}>{item.rating}</Text>
  </View>
);

const Table = () => {
  const {data, loading, onEndReached} = usePagination(fetchProducts);

  return (
    <ScrollView horizontal style={{backgroundColor:'#fff'}}>
      <View style={styles.table}>
        <View style={[styles.row, styles.headerRow]}>
          <Text style={[styles.cell, styles.header, {width: 40}]}>ID</Text>
          <Text style={[styles.cell, styles.header, {width: 200}]}>Name</Text>
          <Text style={[styles.cell, styles.header, {width: 60}]}>Price</Text>
          <Text style={[styles.cell, styles.header, {width: 70}]}>Rating</Text>
        </View>
        <FlatList
          data={data}
          renderItem={TableRow}
          keyExtractor={item => item.id.toString()}
          onEndReached={onEndReached}
          onEndReachedThreshold={0.5}
          initialNumToRender={10}
          maxToRenderPerBatch={10}
          windowSize={7}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  table: {
    margin: 16,
    // borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#fff',
  },
  row: {
    flexDirection: 'row',
  },
  headerRow: {
    backgroundColor: '#f2f2f2',
  },
  cell: {
    flex: 1,
    padding: 5,
    borderTopWidth: 0.3,
    borderColor: '#ccc',
    textAlign: 'center',
    flexWrap: 'wrap',
  },
  header: {
    fontWeight: 'bold',
  },
});

export default Table;
