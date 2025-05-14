import React from 'react';
import {
  FlatList,
  ActivityIndicator,
  StyleSheet,
  View,
} from 'react-native';
import Comment from './components/Comment';
import usePagination from './usePagination';

export default function Comments() {
  const { items, loading, onEndReached } = usePagination(10);

  return (
    <View style={styles.container}>
      <FlatList
        data={items}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => <Comment comment={item} />}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        onEndReached={onEndReached}
        onEndReachedThreshold={0.5}
        ListFooterComponent={loading ? <ActivityIndicator size="small" /> : null}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10 },
  separator: {
    marginVertical: 15,
    borderTopWidth: 0.4,
  },
});