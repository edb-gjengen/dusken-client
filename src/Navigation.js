import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/SimpleLineIcons';

import EventListScreen from './screens/EventListScreen';
import EventDetailScreen from './screens/EventDetailScreen';
import UserRegisterScreen from './screens/UserRegisterScreen';

import Membership from './modules/membership/Membership';
import Login from './modules/login/Login';
import AboutContainer from './modules/about/AboutContainer';

const EventStack = createNativeStackNavigator();
const EventStackScreen = () => (
  <EventStack.Navigator initialRouteName="EventList">
    <EventStack.Screen
      name="EventList"
      component={EventListScreen}
      options={{
        title: 'Program',
      }}
    />
    <EventStack.Screen
      name="EventDetail"
      component={EventDetailScreen}
      options={({ route }) => ({ title: route.params.item.title.decoded })}
    />
  </EventStack.Navigator>
);

const UserStack = createNativeStackNavigator();
const UserStackScreen = () => (
  <UserStack.Navigator initialRouteName="Membership">
    <UserStack.Screen name="Membership" component={Membership} options={{ title: 'Medlemskap' }} />
    <UserStack.Screen name="Login" component={Login} options={{ title: 'Logg inn' }} />
    <UserStack.Screen
      name="UserRegister"
      component={UserRegisterScreen}
      options={{
        title: 'Bli medlem',
      }}
    />
  </UserStack.Navigator>
);

const HomeTabs = createBottomTabNavigator();
const Navigation = () => (
  <NavigationContainer>
    <HomeTabs.Navigator initialRouteName="EventStack">
      <HomeTabs.Screen
        name="EventStack"
        component={EventStackScreen}
        options={{
          headerShown: false,
          tabBarLabel: 'Program',
          tabBarIcon: ({ color, size }) => <Icon name="event" size={size} color={color} style={{ marginTop: 5 }} />,
        }}
      />
      <HomeTabs.Screen
        name="UserStack"
        component={UserStackScreen}
        options={{
          headerShown: false,
          tabBarLabel: 'Medlemskap',
          tabBarIcon: ({ color, size }) => <Icon name="user" size={size} color={color} style={{ marginTop: 5 }} />,
        }}
      />
      <HomeTabs.Screen
        name="About"
        component={AboutContainer}
        options={{
          title: 'Om oss',
          tabBarIcon: ({ color, size }) => <Icon name="info" size={size} color={color} style={{ marginTop: 5 }} />,
        }}
      />
    </HomeTabs.Navigator>
  </NavigationContainer>
);
export default Navigation;