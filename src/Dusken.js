import React from 'react';
import {connect} from "react-redux";
import {Platform} from 'react-native';
import {TabNavigator, StackNavigator} from "react-navigation";

import AboutScreen from "./screens/AboutScreen";
import EventDetailScreen from "./screens/EventDetailScreen";
import EventListScreen from "./screens/EventListScreen";
import LoginScreen from "./screens/LoginScreen";
import MembershipScreen from "./screens/MembershipScreen";


/* Navigation */
const tabBarRoutes = {
    Membership: { screen: MembershipScreen },
    EventList: { screen: EventListScreen },
    About: { screen: AboutScreen },
};

const tabBarOptions = {
    tabBarPosition: 'bottom',
    tabBarOptions: {
        style: {
            backgroundColor: "#fff"
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

const tabNav = TabNavigator(tabBarRoutes, tabBarOptions);

const DuskenContainer = StackNavigator({
    Root: { screen: tabNav },
    Login: { screen: LoginScreen },
    EventDetail: { screen: EventDetailScreen },
});

export default connect()(DuskenContainer);