import React, {useState} from 'react';
import {
  Text,
  TextInput,
  Button,
  Image,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
} from 'react-native';
import handleChooseImage from './ImageSelection';


export default function RegisterForm() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    image: null,
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    let valid = true;
    let newErrors = { name: '', email: '', phone: '', image: '' };

    if (!form.name.trim()) {
      newErrors.name = 'Name is required';
      valid = false;
    }

    if (!form.email.trim()) {
      newErrors.email = 'Email is required';
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = 'Invalid email format';
      valid = false;
    }

    if (!form.phone.trim()) {
      newErrors.phone = 'Phone number is required';
      valid = false;
    } else if (!/^[0-9]{10}$/.test(form.phone)) {
      newErrors.phone = 'Phone number must be 10 digits';
      valid = false;
    }

    if (!form.image) {
      newErrors.image = 'Image is required';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleImage = () => {
    handleChooseImage(form, setForm);
  }

  

  const handleSubmit = async () => {
    if (!validate()) return;

    const data = new FormData();
    data.append('name', form.name);
    data.append('email', form.email);
    data.append('phone', form.phone);
    data.append('image', {
      uri: form.image.uri,
      type: form.image.type,
      name: form.image.fileName || `profile_${Date.now()}.jpg`,
    });

    try {
    //   const response = await fetch('https://your-server.com/api/register', {
    //     method: 'POST',
    //     body: data,
    //     headers: {
    //       'Content-Type': 'multipart/form-data',
    //     },
    //   });

    //   const json = await response.json();
      Alert.alert('Success', 'User registered successfully!');
      console.log(data);
    } catch (err) {
      console.error(err);
      Alert.alert('Error', 'Something went wrong');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.label}>Name</Text>
      <TextInput
        style={styles.input}
        value={form.name}
        onChangeText={text => setForm({...form, name: text})}
        placeholder="Enter name"
      />
      {errors.name ? <Text style={styles.error}>{errors.name}</Text> : null}

      <Text style={styles.label}>Email</Text>
      <TextInput
        style={styles.input}
        value={form.email}
        onChangeText={text => setForm({...form, email: text})}
        placeholder="Enter email"
        keyboardType="email-address"
        autoCapitalize="none"
      />
      {errors.email ? <Text style={styles.error}>{errors.email}</Text> : null}

      <Text style={styles.label}>Phone</Text>
      <TextInput
        style={styles.input}
        value={form.phone}
        onChangeText={text => setForm({...form, phone: text})}
        placeholder="Enter phone number"
        keyboardType="number-pad"
        maxLength={10}
      />
      {errors.phone ? <Text style={styles.error}>{errors.phone}</Text> : null}

      <TouchableOpacity style={styles.imageUpload} onPress={handleImage}>
        {form.image ? (
          <Image source={{uri: form.image.uri}} style={styles.image} />
        ) : (
          <Text>Select Profile Image</Text>
        )}
      </TouchableOpacity>
      {errors.image ? <Text style={styles.error}>{errors.image}</Text> : null}

      <Button title="Register" onPress={handleSubmit} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingBottom: 60,
    backgroundColor: '#fff',
  },
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
  imageUpload: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    marginBottom: 10,
    height: 120,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
  },
  image: {width: 100, height: 100, borderRadius: 8},
});
