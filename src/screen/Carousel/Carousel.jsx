import {FlatList, Image, StyleSheet, View, Dimensions} from 'react-native';
import React, { useCallback, useRef, useState } from 'react';

const {width: screenWidth, height: screenHeight} = Dimensions.get('window');

const Carousel = () => {
  const slideList = Array.from({length: 10}).map((_, i) => ({
    id: i,
    image: `https://picsum.photos/1440/2842?random=${i}`,
    title: `This is the title! ${i + 1}`,
    subtitle: `This is the subtitle ${i + 1}!`,
  }));

  const [index, setIndex] = useState(0);

  const indexRef = useRef(index);

  indexRef.current = index;

  const onScroll = useCallback((event) => {
    const slideSize = event.nativeEvent.layoutMeasurement.width;
    const index = event.nativeEvent.contentOffset.x/slideSize;
    const roundIndex = Math.round(index);

    const distance = Math.abs(roundIndex - index);
    // Prevent one pixel triggering setIndex in the middle
    // of the transition. With this we have to scroll a bit
    // more to trigger the index change.
    const isNoMansLand = 0.4 < distance;
    if (roundIndex !== indexRef.current && !isNoMansLand) {
      setIndex(roundIndex);
    }

  }, [])

  const Dot = ({idx}) => {
    return <View style={[styles.dot, idx === index ? styles.colorDot : null]} />;
  };

  const renderImageItem = ({item}) => {
    return (
      <View style={styles.carouselBackground}>
        <Image source={{uri: item?.image}} style={styles.image} />
      </View>
    );
  };

  return (
    <View style={styles.flatlist}>
      <FlatList
        data={slideList}
        keyExtractor={item => item?.id.toString()}
        style={styles.flatlist}
        renderItem={renderImageItem}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{alignItems: 'center'}}
        onScroll={onScroll}
      />
      <View style={styles.carouselNav}>
        {slideList.map((_, idx) => (
          <Dot key={idx} idx={idx} />
        ))}
      </View>
    </View>
  );
};

export default Carousel;

const styles = StyleSheet.create({
  flatlist: {
    flex: 1,
  },
  carouselBackground: {
    width: screenWidth,
    height: screenHeight,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  carouselNav: {
    position: 'absolute',
    alignItems:'center',
    justifyContent:'center',
    left: '50%',
    bottom: 50,
    height: 20,
    flexDirection: 'row',
    transform: [{translateX: '-50%'}],
    backgroundColor: 'rgba(0,0,0,0.5)',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
  },
  dot: {
    height: 6,
    width: 6,
    borderRadius: 6,
    backgroundColor: 'white',
    marginHorizontal: 4,
  },
  colorDot:{
    backgroundColor:'darkred'
  }
});
