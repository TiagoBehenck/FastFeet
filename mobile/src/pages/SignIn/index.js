import React, { useRef, useState } from 'react';
import { Image } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import logo from '~/assets/fastfeet-logo-white.png';

import { signInRequest } from '~/store/modules/auth/actions';

import { Container, Input, SubmitButton } from './styles';

export default function SignIn() {
  const dispatch = useDispatch();
  const [id, setID] = useState('');

  const loading = useSelector(state => state.auth.loading);

  function handleSubmit() {
    dispatch(signInRequest(id));
  }

  return (
    <Container>
      <Image source={logo} />
      <Input
        name="id"
        keyboardType="number-pad"
        placeholder="Informe seu ID no cadastro"
        autoCorrect={false}
        returnKeyType="send"
        autoCapitalize="none"
        value={id}
        onChangeText={setID}
      />
      <SubmitButton loading={loading} onPress={handleSubmit}>
        Entrar no sistema
      </SubmitButton>
    </Container>
  );
}
