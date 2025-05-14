import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';

const imgUrl = 'https://cdn-icons-png.flaticon.com/512/149/149071.png';

const ImageComponent = React.memo(() => (
  <Image source={{uri: imgUrl}} style={styles.img} />
));

const Comment = props => {
  const {comment} = props;

  return (
    <View style={styles.container}>
      <ImageComponent />
      <View style={styles.comment}>
        <View style={{width: '80%'}}>
          <Text style={styles.username}>{comment?.user?.username}</Text>
          <Text>{comment?.body}</Text>
        </View>
        <View>
          <Text>{comment?.likes}</Text>
        </View>
      </View>
    </View>
  );
};

export default Comment;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    width: '100%',
    gap: 10,
  },
  comment: {
    width: '80%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  img: {height: 50, width: 50},
  username: {
    fontWeight: 'bold',
    fontSize: 15,
  },
});
