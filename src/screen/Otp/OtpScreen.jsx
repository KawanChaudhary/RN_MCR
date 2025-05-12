import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import OtpInput from './OTP';

const OtpScreen = () => {
  const [otp, setOtp] = useState('');

  const handleChange = (val) => {
    setOtp(val);
    if (val.length === 6) {
      Alert.alert('OTP Complete', val);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Enter OTP</Text>
      <OtpInput length={6} value={otp} onChange={handleChange} />
      <Text style={styles.preview}>Current: {otp}</Text>
    </View>
  );
};

export default OtpScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 80,
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  preview: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
  },
});
