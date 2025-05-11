import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {Button, Menu, Text} from 'react-native-paper';

const options = ['Option 1', 'Option 2', 'Option 3'];

const PaperDropdown = () => {
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState('Select');

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Paper Dropdown:</Text>
      <Menu
        visible={visible}
        onDismiss={() => setVisible(false)}
        anchor={
          <Button mode="contained-tonal" onPress={() => setVisible(true)}>
            {selected}
          </Button>
        }
        style={{
          width:'100%',
          marginTop: 40,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        {options.map(option => (
          <Menu.Item
            key={option}
            onPress={() => {
              setSelected(option);
              setVisible(false);
            }}
            title={option}
          />
        ))}
      </Menu>
    </View>
  );
};

export default PaperDropdown;

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 10,
  },
});
