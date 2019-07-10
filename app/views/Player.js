import React, { Component } from 'react';
import { View, Text } from 'react-native';
// import { AudioControls } from 'react-native-hue-player';
const list = [
    {
        key: 'audio01',
        title: 'To our God',
        author: 'Chingtok Ishaku',
        path: '../assets/TOG.mp3',
        thumbnailLocal: require('../assets/image.jpg')
    }
];
class Player extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <AudioControls
                playlist={list}
                initialTrack={0}
                activeColor='#888'
            />
        );
    }
}

export default Player;
