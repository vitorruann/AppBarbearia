import React, { useState, useEffect } from 'react';
import { useIsFocused } from '@react-navigation/native';
import api from '~/services/api';

import Background from '~/components/Background';
import Appointment from '~/components/Appointment';

import { Container, Title, List } from './styles';

const Dashboard = ({ navigation }) => {
  const [appointments, setAppointments] = useState([]);
  const isFocused = useIsFocused();

  async function loadAppointment() {
    const response = await api.get('appointments');

    setAppointments(response.data);
  }

  useEffect(() => {
    if (isFocused) {
      loadAppointment();
    }
  }, [isFocused]);

  async function handleCancel(id) {
    const response = await api.delete(`appointments/${id}`);
    navigation.push('Dashboard');

    setAppointments(
      appointments.map((appointment) =>
        appointment.id === id
          ? {
              ...appointment,
              canceled_at: response.data.canceled_at,
            }
          : appointment
      )
    );
  }

  return (
    <Background>
      <Container>
        <Title>Agendamentos</Title>

        <List
          data={appointments}
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item }) => (
            <Appointment onCancel={() => handleCancel(item.id)} data={item} />
          )}
        />
      </Container>
    </Background>
  );
};

export default Dashboard;
