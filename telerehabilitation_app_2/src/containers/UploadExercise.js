import React from 'react';
import {View, Text, Button, ActivityIndicator, StyleSheet} from 'react-native';
import {useState} from 'react';
import colors from '../res/colors';
import Video from 'react-native-video';

const UploadExercise = ({route}) => {
  /* const uploadVideo = async videoPath => {
    try {
      const response = await fetch(videoPath);
      const blob = await response.blob();

      const filename = 'filename.mp4';
      const serverResponse = await Storage.put(filename, blob);
    } catch (e) {
      console.error(e);
    }
  }; */

  const {videoUri} = route.params;

  const [uploadProgress, setUploadProgress] = useState(0);
  const [response, setResponse] = useState('Response xd');

  const handleProgress = event => {
    setUploadProgress(Math.round((event.loaded * 100) / event.total));
  };

  const uploadVideo = () => {
    var xhr = new XMLHttpRequest();
    const formData = new FormData();

    formData.append('video', {
      uri: videoUri,
      type: 'video/mp4',
      name: 'exercisevid.mp4',
    });
    console.log(formData);
    xhr.upload.addEventListener('progress', handleProgress);
    xhr.addEventListener('load', () => {
      setUploadProgress(100);
      setResponse(xhr.response);
    });
    xhr.open('POST', 'https://api.imgur.com/3/upload');
    xhr.setRequestHeader('Authorization: Client-ID {{7bfed039e41aaa7}}');
    xhr.send(formData);
  };

  return (
    <View style={styles.body}>
      <View style={styles.content}>
        <Video
          style={styles.exerciseVideo}
          source={{
            uri: videoUri,
          }}
          controls={true}
          resizeMode="contain"
          onBuffer={console.log('buffering')}
          onError={err => console.warn(err)}
          name="video2w"
        />
        <Button title={'Upload video'} onPress={uploadVideo} />
        <Text style={styles.text}>Subiendo video</Text>
        {console.log('ola')}
        {console.log(videoUri)}

        {/* <Text>Uploaded {uploadProgress}%</Text> */}
        {/* {console.log(response)}
        <Text>{response}</Text> */}
        <ActivityIndicator size="large" color="grey" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  body: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  content: {
    alignSelf: 'center',
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.dark,
    paddingBottom: 20,
  },
  exerciseVideo: {
    width: '100%',
    flex: 1,
  },
});

export default UploadExercise;
