import {
  View,
  Text,
  Modal,
  StyleSheet,
  Button,
} from 'react-native';
import React from 'react';
import {FlatList} from 'react-native-gesture-handler';

const ModalReviews = ({modalVisible, setModalVisible, reviews}) => {
  const closeModal = () => setModalVisible(false);

  const renderReview = ({item}) => {
    return (
      <View style={styles.reviewContainer}>
        <Text style={styles.reviewText}>{item.comment}</Text>
        <Text style={styles.reviewText}>{item.rating}</Text>
      </View>
    );
  };

  return (
    <Modal
      animationType="slide" // 'slide', 'fade', or 'none'
      transparent={true} // Makes the background transparent
      visible={modalVisible} // Controls modal visibility
      onRequestClose={() => setModalVisible(false)} // For Android back button
    >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.heading}>
              <Text style={styles.modalText}>Hello! I'm a Modal 😃</Text>
              <Button title="Close" onPress={closeModal} />
            </View>

            <FlatList
              data={reviews}
              keyExtractor={(item, index) => item.rating + index}
              renderItem={renderReview}
              showsVerticalScrollIndicator={false}
            />
          </View>
        </View>

    </Modal>
  );
};

export default ModalReviews;

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  modalContent: {
    width: '100%',
    maxHeight: '70%',
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
    paddingBottom:50,
  },
  modalText: {
    fontSize: 18,
  },
  heading:{
    width:'100%',
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'baseline',
    marginBottom:20,
  },
  reviewContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(0,0,0,0.1)',
    marginBottom: 5,
    padding: 10,
    borderRadius: 10,
  },
  reviewText: {
    color: 'rgba(0,0,0,0.5)',
    fontWeight: 'bold',
  },
});
