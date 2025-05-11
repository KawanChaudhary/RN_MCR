import {
  FlatList,
  Image,
  StyleSheet,
  View,
  Dimensions,
  Pressable,
  Text,
} from 'react-native';
import React, {useCallback, useRef, useState} from 'react';

const {width: screenWidth, height: screenHeight} = Dimensions.get('window');

const slideList = Array.from({length: 10}).map((_, i) => ({
  id: i,
  image: `https://picsum.photos/1440/2842?random=${i}`,
  title: `This is the title! ${i + 1}`,
  subtitle: `This is the subtitle ${i + 1}!`,
}));

const Carousel = () => {
  const [index, setIndex] = useState(0);
  const flatListRef = useRef(null);
  const indexRef = useRef(index);

  indexRef.current = index;

  const onScroll = useCallback(event => {
    const slideSize = event.nativeEvent.layoutMeasurement.width;
    const index = event.nativeEvent.contentOffset.x / slideSize;
    const roundIndex = Math.round(index);

    const distance = Math.abs(roundIndex - index);
    // Prevent one pixel triggering setIndex in the middle
    // of the transition. With this we have to scroll a bit
    // more to trigger the index change.
    const isNoMansLand = 0.4 < distance;
    if (roundIndex !== indexRef.current && !isNoMansLand) {
      setIndex(roundIndex);
    }
  }, []);

  const scrollToIndex = newIndex => {
    if (newIndex >= 0 && newIndex < slideList.length) {
      flatListRef?.current?.scrollToIndex({index: newIndex, animated: true});
      setIndex(newIndex);
    }
  };

  const handlePrev = () => {
    scrollToIndex(index - 1);
  };

  const handleNext = () => {
    scrollToIndex(index + 1);
  };

  const Dot = ({idx}) => {
    return (
      <View style={[styles.dot, idx === index ? styles.colorDot : null]} />
    );
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
        ref={flatListRef}
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
      <View style={styles.btn}>
        <Pressable
          style={index === 0 ? styles.disabled : styles.pressable}
          onPress={handlePrev}
          disabled={index === 0}>
          {index > 0 && <Text style={styles.pressableText}>Prev</Text>}
        </Pressable>
        <Pressable
          style={
            index === slideList.length - 1 ? styles.disabled : styles.pressable
          }
          onPress={handleNext}
          disabled={index === slideList.length - 1}>
          {index < slideList.length - 1 && (
            <Text style={styles.pressableText}>Next</Text>
          )}
        </Pressable>
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
    alignItems: 'center',
    justifyContent: 'center',
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
  colorDot: {
    backgroundColor: 'darkred',
  },
  btn: {
    flexDirection: 'row',
    width: '100%',
    padding: 20,
    position: 'absolute',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  pressable: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 5,
    borderRadius: 5,
  },
  pressableText: {
    color: 'white',
    fontWeight: 'bold',
  },
  disabled: {
    display: 'hidden',
  },
});
