import React, { Component } from 'react';
import { View } from 'react-native';
import { WebView } from 'react-native-webview';

export default class MyWebView extends Component {
    static navigationOptions = ({ navigation }) => ({
        title: navigation.getParam('staredRepo').name
    });

    render() {
        const { navigation } = this.props;
        const repository = navigation.getParam('staredRepo');

        return (
            <WebView source={{ uri: repository.html_url }} style={{ flex: 1 }} />
        )
    }
}