import { View, Text, StyleSheet, ActivityIndicator, FlatList } from 'react-native';
import React, { useCallback, useEffect, useState, useMemo } from 'react';

const InfiniteScroll = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = () => {
        setRefreshing(true);
        let items = Array.from({ length: 20 }, (_, i) => ({
            id: i,
            title: `Item Refreshing ${i}`
        }));
        setProducts(items);
        setRefreshing(false);
    }

    useEffect(() => {
        let items = Array.from({ length: 100 }, (_, i) => ({
            id: i,
            title: `Item ${i}`
        }));
        setProducts(items);
    }, []);

    const renderProduct = useCallback(({ item }) => {
        return (
            <View style={styles.productName}>
                <Text style={styles.title}>{item?.title}</Text>
            </View>
        );
    }, []);

    const itemLayout = useMemo(() => (data, index) => ({
        length: 50,
        offset: 50 * index,
        index,
    }), []);

    const onEndReached = useCallback(() => {
        if (loading) return;
        setLoading(true);
        
        setTimeout(() => {
            setProducts(prevProducts => [
                ...prevProducts,
                ...Array.from({ length: 20 }, (_, i) => ({
                    id: prevProducts.length + i,
                    title: `Item ${prevProducts.length + i}`,
                }))
            ]);
            setLoading(false);
        }, 1000);
    }, [loading]);

    return (
        <FlatList
            data={products}
            keyExtractor={item => item.id.toString()}
            renderItem={renderProduct}
            windowSize={30}
            initialNumToRender={50}
            maxToRenderPerBatch={10}
            removeClippedSubviews={true}
            getItemLayout={itemLayout}
            onEndReached={onEndReached}
            onEndReachedThreshold={0.5}
            ListFooterComponent={loading ? <ActivityIndicator size="small" /> : null}
            style={styles.flatlistContainer}
            refreshing={refreshing}
            onRefresh={onRefresh}
        />
    );
};

const styles = StyleSheet.create({
    flatlistContainer: {
        marginBottom: 50,
    },
    productName: {
        backgroundColor: 'white',
        marginHorizontal: 10,
        padding: 10,
        borderRadius: 5,
        marginTop: 10,
    },
    title: {
        fontSize: 16,
        fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace',
    },
});

export default InfiniteScroll;
