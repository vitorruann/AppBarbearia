import React, { useEffect, useRef, useState } from 'react';
import { Image } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import logo from '~/assets/logo.png';
import Background from '~/components/Background';
import { signUpRequest, signUpInit } from '~/store/modules/auth/actions';

import {
  Container,
  Form,
  FormInput,
  SubmitButton,
  SignLink,
  SignLinkText,
} from './styles';

const SignUp = ({ navigation }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [log, setLog] = useState(null);
  const login = useSelector((state) => state.auth.log);

  const dispatch = useDispatch();

  useEffect(() => {
    async function veriLogin() {
      if (log === 'Success') {
        navigation.navigate('SignIn');
      }
    }
    dispatch(signUpInit());

    setLog(login);
    veriLogin();
  }, [log, login]);

  const emailRef = useRef();
  const passwordRef = useRef();

  const loading = useSelector((state) => state.auth.loading);

  function handleSubmit() {
    dispatch(signUpRequest(name, email, password));
    setTimeout(() => {
      if (login === 'Success') {
        navigation.navigate('SignIn');
      }
    }, 500);
  }

  return (
    <Background>
      <Container>
        <Image source={logo} />

        <Form>
          <FormInput
            icon="person-outline"
            autoCorrect={false}
            autoCapitalize="none"
            placeholder="Nome completo"
            returnKeyType="next"
            onSubmitEditing={() => emailRef.current.focus()}
            value={name}
            onChangeText={setName}
          />

          <FormInput
            icon="mail-outline"
            keyboardType="email-address"
            autoCorrect={false}
            autoCapitalize="none"
            placeholder="Digite seu e-mail"
            ref={emailRef}
            returnKeyType="next"
            onSubmitEditing={() => passwordRef.current.focus()}
            value={email}
            onChangeText={setEmail}
          />

          <FormInput
            icon="lock-outline"
            secureTextEntry
            placeholder="Digite sua senha"
            ref={passwordRef}
            returnKeyType="send"
            onSubmitEditing={handleSubmit}
            value={password}
            onChangeText={setPassword}
          />

          <SubmitButton loading={loading} onPress={handleSubmit}>
            Criar conta
          </SubmitButton>
        </Form>

        <SignLink onPress={() => navigation.navigate('SignIn')}>
          <SignLinkText>Já tenho conta</SignLinkText>
        </SignLink>
      </Container>
    </Background>
  );
};

export default SignUp;
