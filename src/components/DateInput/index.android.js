import React, { useMemo, useState } from 'react';
import { Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { format, startOfHour, startOfDay } from 'date-fns';
import pt from 'date-fns/locale/pt';

import Icon from 'react-native-vector-icons/MaterialIcons';

import { Container, DateButton, DateText } from './styles';

const DateInput = ({ date, onChange }) => {
  const [show, setShow] = useState(false);
  const [mode, setMode] = useState('date');

  const dateFormatted = useMemo(
    () => format(date, "dd 'de' MMMM 'de' yyyy", { locale: pt }),
    [date]
  );

  // async function handleOpenPicker() {
  //   const { action, year, month, day } = await DatePickerAndroid.open({
  //     mode: 'spinner',
  //     date,
  //   });

  //   if (action === DatePickerAndroid.dateSetAction) {
  //     const selectedDate = new Date(year, month, day);
  //     console.log(selectedDate)
  //     onChange(selectedDate);
  //   }
  // }
  const showMode = (currentMode) => {
    setShow(true);

    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  const onChangea = (event, selectedDate) => {
    setShow(Platform.OS === 'android');
    if (selectedDate) {
      onChange(startOfDay(selectedDate));
    } else {
      onChange(startOfDay(new Date()));
    }
    setShow(false);
  };

  return (
    <Container>
      <DateButton onPress={showDatepicker}>
        <Icon name="event" color="#FFF" size={30} />

        <DateText>{dateFormatted}</DateText>
        {show && (
          <DateTimePicker
            mode={mode}
            value={new Date()}
            minimumDate={startOfHour(new Date())}
            display="spinner"
            onChange={onChangea}
          />
        )}
      </DateButton>
    </Container>
  );
};

export default DateInput;
// 2020-12-06T01:48:08.291Z
// 2020-12-05T03:00:00.000Z
