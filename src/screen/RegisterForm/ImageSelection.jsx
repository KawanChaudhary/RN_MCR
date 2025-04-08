import { Alert, Platform } from 'react-native';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { request, PERMISSIONS, RESULTS } from 'react-native-permissions';

const handleChooseImage = async (form, setForm) => {
  Alert.alert('Upload Image', 'Choose from', [
    {
      text: 'Camera',
      onPress: async () => {
        const permission = await request(
          Platform.OS === 'android'
            ? PERMISSIONS.ANDROID.CAMERA
            : PERMISSIONS.IOS.CAMERA
        );

        if (permission === RESULTS.GRANTED) {
          launchCamera({ mediaType: 'photo' }, res => {
            if (!res.didCancel && res.assets && res.assets.length > 0) {
              setForm({ ...form, image: res.assets[0] });
            } else {
              console.log('Image selection canceled');
            }
          });
        } else {
          Alert.alert('Camera permission denied');
        }
      },
    },
    {
      text: 'Gallery',
      onPress: async () => {
        const permission = await request(
          Platform.OS === 'android'
            ? PERMISSIONS.ANDROID.READ_MEDIA_IMAGES
            : PERMISSIONS.IOS.PHOTO_LIBRARY
        );

        if (permission === RESULTS.GRANTED) {
          launchImageLibrary({ mediaType: 'photo' }, res => {
            if (!res.didCancel && res.assets && res.assets.length > 0) {
              setForm({ ...form, image: res.assets[0] });
            } else {
              console.log('Image selection canceled');
            }
          });
        } else {
          Alert.alert('Gallery permission denied');
        }
      },
    },
    {
      text: 'Cancel',
      style: 'cancel',
      onPress: () => {
        console.log('User canceled image selection');
      },
    },
  ]);
};

export default handleChooseImage;
