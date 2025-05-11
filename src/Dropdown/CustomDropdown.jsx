import React, {useState} from 'react';
import {
  Text,
  TouchableOpacity,
  Modal,
  View,
  FlatList,
  StyleSheet,
} from 'react-native';

const options = ['Option 1', 'Option 2', 'Option 3'];

const CustomDropdown = () => {
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState('Select');

  return (
    <View>
      <Text style={styles.label}>Custom Dropdown:</Text>
      <TouchableOpacity onPress={() => setVisible(true)} style={styles.button}>
        <Text>{selected}</Text>
      </TouchableOpacity>

      <Modal visible={visible} transparent animationType="slide">
        <View style={styles.overlay}>
          <View style={styles.modal}>
            <FlatList
              data={options}
              keyExtractor={item => item}
              renderItem={({item}) => (
                <TouchableOpacity
                  style={styles.option}
                  onPress={() => {
                    setSelected(item);
                    setVisible(false);
                  }}>
                  <Text>{item}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default CustomDropdown;

const styles = StyleSheet.create({
  label: {
    marginTop: 20,
    fontSize: 16,
    marginBottom: 10,
  },
  button: {
    borderWidth: 1,
    padding: 12,
    borderRadius: 4,
    borderColor: '#ccc',
  },
  overlay: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#00000088',
  },
  modal: {
    marginHorizontal: 40,
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 20,
  },
  option: {
    paddingVertical: 10,
  },
});
