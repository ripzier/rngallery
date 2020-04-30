import React, {useState} from 'react';
import {
  Image,
  Modal,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';
import ImagePicker from 'react-native-image-picker';
import Video from 'react-native-video';

const Media = ({type, ...props}) => {
  if (type === 'image') {
    return <Image {...props} />;
  }
  return <Video {...props} />;
};

const App = () => {
  const [media, setMedia] = useState({visible: false});

  const selectImage = () => {
    const options = {
      title: null,
      cancelButtonTitle: 'Cancelar',
      takePhotoButtonTitle: 'Tomar nueva foto...',
      chooseFromLibraryButtonTitle: 'Elegir de la galería...',
      mediaType: 'photo',
    };

    ImagePicker.showImagePicker(options, response => {
      if (!response.didCancel) {
        const source = {uri: response.uri};
        setMedia({visible: true, type: 'image', source});
      }
    });
  };

  const selectVideo = () => {
    const options = {
      title: null,
      cancelButtonTitle: 'Cancelar',
      takePhotoButtonTitle: 'Grabar nuevo video...',
      chooseFromLibraryButtonTitle: 'Elegir de la galería...',
      mediaType: 'video',
    };

    ImagePicker.showImagePicker(options, response => {
      if (!response.didCancel) {
        const source = {uri: response.uri};
        setMedia({visible: true, type: 'video', source});
      }
    });
  };

  return (
    <View style={styles.container}>
      <TouchableHighlight
        style={styles.button}
        underlayColor="#EFEFEF"
        onPress={selectImage}>
        <Text>Imagen</Text>
      </TouchableHighlight>

      <TouchableHighlight
        style={styles.button}
        underlayColor="#EFEFEF"
        onPress={selectVideo}>
        <Text>Video</Text>
      </TouchableHighlight>

      <Modal
        animationType="slide"
        visible={media.visible}
        onRequestClose={() => setMedia({visible: false})}>
        <View style={styles.modalContainer}>
          <Media
            type={media.type}
            style={styles.media}
            source={media.source}
            resizeMode="contain"
          />
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 75,
    elevation: 10,
    marginVertical: 15,
    paddingVertical: 20,
    shadowColor: 'black',
    shadowOpacity: 0.9,
    width: '50%',
  },
  media: {
    flex: 1,
  },
  modalContainer: {
    backgroundColor: 'black',
    flex: 1,
    justifyContent: 'center',
  },
});

export default App;
