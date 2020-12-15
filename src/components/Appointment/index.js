import React, { useMemo } from 'react';
import { parseISO, formatRelative, addHours } from 'date-fns';
import pt from 'date-fns/locale/pt-BR';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { Container, Left, Avatar, Info, Name, Time } from './styles';

const Appointment = ({ data, onCancel }) => {
  const dateParsed = useMemo(() => {
    const dateZone = addHours(parseISO(data.date), 3);

    return formatRelative(dateZone, new Date(), {
      locale: pt,
      addSuffix: true,
    });
  }, [data.date]);
  return (
    <Container past={data.past}>
      <Left>
        <Avatar
          source={{
            uri: data.provider.avatar
              ? data.provider.avatar.url
              : `https://i.pinimg.com/236x/91/aa/ef/91aaeffeaf6b29fe0a044568eea90be1.jpg`,
          }}
        />

        <Info>
          <Name>{data.provider.name}</Name>
          <Time>{dateParsed}</Time>
        </Info>
      </Left>

      {data.cancelable && !data.canceled_at && (
        <TouchableOpacity onPress={onCancel}>
          <Icon name="event-busy" size={20} color="#f64c75" />
        </TouchableOpacity>
      )}
    </Container>
  );
};

export default Appointment;
