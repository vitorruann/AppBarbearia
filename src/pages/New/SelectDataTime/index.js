import React, { useState, useEffect } from 'react';
import api from '~/services/api';

import Background from '~/components/Background';
import DataInput from '~/components/DateInput';

import { Container, HourList, Hour, Title } from './styles';

const SelectDataTime = ({ route, navigation }) => {
  const [date, setDate] = useState(new Date());
  const [hours, setHours] = useState([]);

  const { provider } = route.params;
  console.tron.log(provider.id);

  useEffect(() => {
    async function loadAvailable() {
      const response = await api.get(`providers/${provider.id}/available`, {
        params: {
          date: date.getTime(),
        },
      });
      setHours(response.data);
    }

    loadAvailable();
  }, [date, provider.id]);

  function handleSelectHour(time) {
    navigation.navigate('Confirm', {
      provider,
      time,
    });
  }

  return (
    <Background>
      <Container>
        <DataInput date={date} onChange={setDate} />

        <HourList
          data={hours}
          extraData={date}
          keyExtractor={(item) => item.time}
          renderItem={({ item }) => (
            <Hour
              onPress={() => handleSelectHour(item.value)}
              enabled={item.available}
            >
              <Title>{item.time}</Title>
            </Hour>
          )}
        />
      </Container>
    </Background>
  );
};

export default SelectDataTime;
