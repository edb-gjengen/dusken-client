import {Platform, StyleSheet} from 'react-native';
import {createBottomTabNavigator, createStackNavigator} from "react-navigation";

import AboutScreen from "./screens/AboutScreen";
import EventDetailScreen from "./screens/EventDetailScreen";
import EventListScreen from "./screens/EventListScreen";
import LoginScreen from "./screens/LoginScreen";
import MembershipScreen from "./screens/MembershipScreen";
import UserRegisterScreen from "./screens/UserRegisterScreen";

const tabBarRoutes = {
    EventList: EventListScreen,
    Membership: MembershipScreen,
    About: AboutScreen,
};

const tabBarOptions = {
    tabBarPosition: 'bottom',
    tabBarOptions: {
        style: {
            ...Platform.select({
                android: {
                    backgroundColor: "#fff",
                    borderTopWidth: StyleSheet.hairlineWidth,
                    borderTopColor: 'rgba(0, 0, 0, 0.1)'
                }
            })
        },
        indicatorStyle: {
            backgroundColor: "#f58220"
        },
        activeTintColor: '#f58220',
        inactiveTintColor: '#333333',
        showIcon: true,
        labelStyle: {
            fontSize: 10,
            marginBottom: 0,
            ...Platform.select({
                android: {
                    fontWeight: 'bold',
                }
            }),
        },
    }
};

const tabNav = createBottomTabNavigator(tabBarRoutes, tabBarOptions);

tabNav.navigationOptions = ({ navigation, screenProps }) => {
    const tabTitles = {
      EventList: 'Program',
      Membership: 'Medlemskap',
      About: 'Om oss',
    };
    const { routeName } = navigation.state.routes[navigation.state.index];

    // You can do whatever you like here to pick the title based on the route name
    return {
        headerTitle: tabTitles[routeName],
    };
};

const stackOptions = {
  navigationOptions: {
    initialRouteName: 'Home',
    headerStyle: {
      backgroundColor: '#f58220',
    },
    headerTitleStyle: {
      color: 'white',
    },
    headerTintColor: 'white',
  }
};

const DuskenNavigation = createStackNavigator({
    Root: tabNav,
    Login: LoginScreen,
    UserRegister: UserRegisterScreen,
    EventDetail: EventDetailScreen,
}, stackOptions);

export default DuskenNavigation;
