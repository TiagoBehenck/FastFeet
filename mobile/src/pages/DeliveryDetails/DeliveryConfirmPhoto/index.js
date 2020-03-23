import React, { useRef, useState } from 'react';
import { useSelector } from 'react-redux';

import { useRoute } from '@react-navigation/native';

import api from '~/services/api';

import {
  Container,
  Background,
  Content,
  CameraWrapper,
  Camera,
  Button,
} from './styles';

export default function DeliveryConfirmPhoto() {
  // eslint-disable-next-line prefer-const
  let cameraRef = useRef(null);
  const auth = useSelector(state => state.auth);
  const route = useRoute();
  const { id } = route.params;
  const [pictureUri, setPictureUri] = useState('');

  async function handleSubmit() {
    const dataFile = new FormData();
    dataFile.append('file', {
      type: 'image/jpg',
      uri: pictureUri,
      name: 'assignature.jpg',
    });

    const response = await api.patch(
      `/deliveryman/${auth.id}/deliveries/${id}/deliver`,
      dataFile
    );

    console.tron.log(response);
  }

  async function handletakePicture() {
    if (cameraRef) {
      const options = { quality: 0.5, base64: true };
      const data = await cameraRef.current.takePictureAsync(options);
      console.tron.log(data);
      await setPictureUri(data.uri);
      await handleSubmit();
    }
  }

  return (
    <Container>
      <Background />
      <Content>
        <CameraWrapper>
          <Camera ref={cameraRef} type="back" captureAudio={false} />
        </CameraWrapper>
        <Button onPress={handletakePicture} loading={false}>
          Enviar
        </Button>
      </Content>
    </Container>
  );
}
