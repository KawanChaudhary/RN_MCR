import {View, Text, StyleSheet, TextInput} from 'react-native';
import React from 'react';

const InputText = props => {
  const {label, error, ...rest} = props;
  return (
    <View>
      <Text style={styles.label}>{label}</Text>
      <TextInput style={styles.input} selectionColor='black' {...rest} />
      {error ? <Text style={styles.error}>{error}</Text> : null}
    </View>
  );
};

export default InputText;

const styles = StyleSheet.create({
  label: {
    fontWeight: '600',
    marginTop: 10,
    marginBottom: 4,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 6,
  },
  error: {
    color: 'red',
    fontSize: 12,
  },
});
