import React, { Component } from 'react';
import { View, Text } from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
import firebase from 'react-native-firebase';

class Intro extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    componentWillMount(){
        if (firebase.auth().currentUser) {
            this.props.navigation.navigate('Auth')
        } else {
            
        }
    }

    onSkipBtnHandle = (index) => {
        console.log(index);
    }
    doneBtnHandle = () => {
        this.props.navigation.navigate('Auth')
    }
    nextBtnHandle = (index) => {
        console.log(index);
    }
    onSlideChangeHandle = (index, total) => {
        console.log(index, total);
    }

    pageArray = [{
        title: 'Page 2',
        description: 'Description 2',
        image: require('../assets/slide1.jpg'),
        imageStyle: {
            height: 931,
            width: 557,
            resizeMode: 'center'
        },
        backgroundColor: '#EAC902',
        fontColor: '#fff',
        level: 10,
    }, {
        title: 'Page 1',
        description: 'Description 1',
        image: require('../assets/slide2.jpg'),
        imageStyle: {
            height: 931,
            width: 557,
            resizeMode: 'center'
        },
        backgroundColor: '#1C1B21',
        fontColor: '#fff',
        level: 15,
    }];

    render() {
        return (
            <AppIntroSlider
                slides={this.pageArray}
                onDone={this.doneBtnHandle}
            />
        );
    }
}

export default Intro;
