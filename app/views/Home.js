import React, { Component } from 'react';
import { View, Text, Image, ImageBackground, ScrollView } from 'react-native';
import { Container, StyleProvider, Left, Button, Icon, Body, Content, Grid, Row, Card as NBCard, CardItem, Text as NBText, Col, Right } from 'native-base';
import { material, materialColors, systemWeights } from "react-native-typography";
import { Card, CardTitle, CardContent, CardAction, CardButton, CardImage } from 'react-native-material-cards'
import * as MagicMove from 'react-native-magic-move';
import platform from '../native-base-theme/variables/platform';
import getTheme from '../native-base-theme/components';
import styles from '../styles/style'
import ScrollSection from './ScrollSection';
import Header from './Header'

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            // <MagicMove.Scene>
                <Container>
                    <StyleProvider style={getTheme(platform)}>
                        <Content>
                            <Header navigation={this.props.navigation} transparent={false} text='Explore'/>
                            <ScrollSection title='Popular' navigation={this.props.navigation}/>
                            <ScrollSection title='Fiction' navigation={this.props.navigation}/>
                            <ScrollSection title='Religious' navigation={this.props.navigation}/>
                        </Content>
                    </StyleProvider>
                </Container>
            // </MagicMove.Scene>
        );
    }
}

export default Home;
