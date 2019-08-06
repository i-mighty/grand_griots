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
        this.props.navigation.navigate('Auth', {intro: true})
    }
    nextBtnHandle = (index) => {
        console.log(index);
    }
    onSlideChangeHandle = (index, total) => {
        console.log(index, total);
    }

    pageArray = [{
        title: 'The Grand Griots',
        description: 'Description 1',
        image: require('../assets/slide21.png'),
        imageStyle: {
            height: 931,
            width: 557,
            resizeMode: 'center'
        },
        backgroundColor: '#060D15',
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
