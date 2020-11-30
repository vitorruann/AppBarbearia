import React from 'react';
import { TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Icon from 'react-native-vector-icons/MaterialIcons';

import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';

import SelectProvider from './pages/New/SelectProvider';
import SelectDataTime from './pages/New/SelectDataTime';
import Confirm from './pages/New/Confirm';

import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';

const TabBarOptions = {
  keyboardHidesTabBar: true,
  labelStyle: {
    fontSize: 15,
  },
  style: {
    backgroundColor: '#858080',
  },
  activeTintColor: '#FFF',
  inactiveTintColor: 'rgba(255,255,255, 0.6)',
};

const optionsDashbroad = {
  title: 'Agendamentos',
  tabBarIcon: ({ color }) => <Icon name="event" size={20} color={color} />,
};

const optionsNew = {
  title: 'Agendar',
  tabBarVisible: false,
  tabBarIcon: () => (
    <Icon
      name="add-circle-outline"
      size={20}
      color="rgba(255, 255, 255, 0.6)"
    />
  ),
};

const screenOptionsNew = {
  headerTransparent: true,
  headerTintColor: '#fff',
  headerLeftContainerStyle: {
    marginLeft: 20,
  },
};

const optionsProfile = {
  title: 'Meu perfil',
  tabBarIcon: ({ color }) => <Icon name="person" size={20} color={color} />,
};

const optionsSelectProvider = ({ navigation }) => ({
  title: 'Selecione o prestador',
  headerTitleAlign: 'center',
  headerLeft: () => (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('Dashboard');
      }}
    >
      <Icon name="chevron-left" size={20} color="#FFF" />
    </TouchableOpacity>
  ),
});

const optionsSelectDataTime = ({ navigation }) => ({
  title: 'Selecione o horário',
  headerTitleAlign: 'center',
  headerLeft: () => (
    <TouchableOpacity
      onPress={() => {
        navigation.goBack();
      }}
    >
      <Icon name="chevron-left" size={20} color="#FFF" />
    </TouchableOpacity>
  ),
});

const optionsConfirm = ({ navigation }) => ({
  title: 'Confirmar agendamento',
  headerTitleAlign: 'center',
  headerLeft: () => (
    <TouchableOpacity
      onPress={() => {
        navigation.goBack();
      }}
    >
      <Icon name="chevron-left" size={20} color="#FFF" />
    </TouchableOpacity>
  ),
});

function SignInScreen({ navigation }) {
  return <SignIn navigation={navigation} />;
}

function SignUpScreen({ navigation }) {
  return <SignUp navigation={navigation} />;
}

function DashboardScreen() {
  return <Dashboard />;
}

function ProfileScreen() {
  return <Profile />;
}

function SelectProviderScreen({ navigation }) {
  return <SelectProvider navigation={navigation} />;
}

function SelectDataTimeScreen({ navigation, route }) {
  return <SelectDataTime route={route} navigation={navigation} />;
}

function ConfirmScreen({ navigation, route }) {
  return <Confirm route={route} navigation={navigation}/>;
}

const AppTab = createBottomTabNavigator();
const Stack = createStackNavigator();

function New() {
  return (
    <Stack.Navigator
      screenOptions={screenOptionsNew}
    >
      <Stack.Screen
        name="SelectProvider"
        options={optionsSelectProvider}
        component={SelectProviderScreen}
      />
      <Stack.Screen
        name="SelectDataTime"
        options={optionsSelectDataTime}
        component={SelectDataTimeScreen}
      />
      <Stack.Screen name="Confirm"
        component={ConfirmScreen}
        options={optionsConfirm}
        component={ConfirmScreen}
      />
    </Stack.Navigator>
  );
}

function App() {
  return (
    <AppTab.Navigator
      tabBarOptions={TabBarOptions}
    >
      <AppTab.Screen
        name="Dashboard"
        options={optionsDashbroad}
        component={DashboardScreen}
      />
      <AppTab.Screen
        name="New"
        options={optionsNew}
        component={New}
      />
      <AppTab.Screen
        name="Profile"
        options={optionsProfile}
        component={ProfileScreen}
      />
    </AppTab.Navigator>
  );
}

function auth() {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="SignIn" component={SignInScreen} />
      <Stack.Screen name="SignUp" component={SignUpScreen} />
    </Stack.Navigator>
  );
}

export default (isSigned = false) => {
  return (
    <NavigationContainer>
      <Stack.Navigator headerMode="none">
        {isSigned ? (
          <Stack.Screen name="Dashboard" component={App} />
        ) : (
          <Stack.Screen name="auth" component={auth} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};
