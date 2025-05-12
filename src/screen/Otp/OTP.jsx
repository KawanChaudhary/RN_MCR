import React from 'react';
import {View, TextInput, StyleSheet} from 'react-native';

const OtpInput = ({length = 6, value = '', onChange}) => {
  const inputsRef = React.useRef([]);
  const [focusedIndex, setFocusedIndex] = React.useState(null);

  const handleChange = (text, index) => {
    if (text && !(text >= 0 && text <= 9)) return;

    const otpArray = value.split('');
    otpArray[index] = text;
    onChange(otpArray.join(''));

    if (text && index < length - 1) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (e, index) => {
    if (e.nativeEvent.key === 'Backspace' && !value[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  return (
    <View style={styles.container}>
      {Array.from({length}).map((_, index) => (
        <TextInput
          key={index}
          ref={ref => (inputsRef.current[index] = ref)}
          style={[
            styles.input,
            focusedIndex === index && styles.activeInput
          ]}
          selectionColor='orange'
          keyboardType="number-pad"
          maxLength={1}
          value={value[index] || ''}
          onChangeText={text => handleChange(text, index)}
          onKeyPress={e => handleKeyPress(e, index)}
          autoFocus={index === 0}
          onFocus={() => setFocusedIndex(index)}
        />
      ))}
    </View>
  );
};

export default OtpInput;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 10,
    marginVertical: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#999',
    width: 50,
    height: 50,
    textAlign: 'center',
    fontSize: 20,
    borderRadius: 8,
  },
  activeInput: {
    borderColor: 'orange',
    borderWidth: 2,
  },
});
