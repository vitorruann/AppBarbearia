import React, { useMemo } from 'react';
import { formatRelative, parseISO, addHours } from 'date-fns';
import pt from 'date-fns/locale/pt';

import api from '~/services/api';

import Background from '~/components/Background';

import { Container, Avatar, Name, Time, SubmitButton } from './styles';

const Confirm = ({ route, navigation }) => {
  const { provider } = route.params;
  const { time } = route.params;
  const dateZone = addHours(parseISO(time), 3);

  const dateFormatted = useMemo(
    () => formatRelative(dateZone, new Date(), {locale: pt} ),
    [time]
  );

  async function handleAddAppointment() {
    await api.post('appointments', {
      provider_id: provider.id,
      date: time,
    });

    navigation.navigate('Dashboard');
  }

  return (
    <Background>
      <Container>
        <Avatar
          source={{
            uri: provider.avatar
              ? provider.avatar.url
              : `https://i.pinimg.com/236x/91/aa/ef/91aaeffeaf6b29fe0a044568eea90be1.jpg`,
          }}
        />

        <Name>{provider.name}</Name>

        <Time>{dateFormatted}</Time>

        <SubmitButton onPress={handleAddAppointment}>
          Confirmar agendamento
        </SubmitButton>
      </Container>
    </Background>
  );
};

export default Confirm;
