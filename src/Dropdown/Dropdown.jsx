import React, {useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {RadioButton, Provider as PaperProvider} from 'react-native-paper';
import CustomDropdown from './CustomDropdown';
import PaperDropdown from './PaperDropdown';

const DropdownSelector = () => {
  const [type, setType] = useState('custom');

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Choose Dropdown Type</Text>

      <RadioButton.Group onValueChange={value => setType(value)} value={type}>
        <View style={styles.radioRow}>
          <RadioButton value="custom" />
          <Text>Custom</Text>
        </View>
        <View style={styles.radioRow}>
          <RadioButton value="library" />
          <Text>Library</Text>
        </View>
      </RadioButton.Group>

      {type === 'custom' ? <CustomDropdown /> : <PaperDropdown />}
    </View>
  );
};

export default DropdownSelector;

const styles = StyleSheet.create({
  container: {
    marginTop: 60,
    padding: 20,
  },
  title: {
    fontSize: 18,
    marginBottom: 10,
    fontWeight: '600',
  },
  radioRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
