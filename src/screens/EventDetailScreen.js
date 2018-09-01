import React, { Component } from 'react';
import {StyleProvider} from "native-base";
import EventDetail from "../modules/events/EventDetail";
import getTheme from '../../native-base-theme/components';

export default class EventDetailScreen extends Component {
    static navigationOptions = ({navigation}) => ({
        title: navigation.state.params.item.title.decoded,
    });

    render() {
        const { params } = this.props.navigation.state;
        return (
            <StyleProvider style={getTheme()}>
                <EventDetail item={params.item}/>
            </StyleProvider>
        );
    }
}
