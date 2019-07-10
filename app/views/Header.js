import React, { Component } from 'react';
import { View, Text, Image, ImageBackground, ScrollView } from 'react-native';
import { Container, Header, StyleProvider, Left, Button, Icon, Body, Content, Grid, Row, Card as NBCard, CardItem, Text as NBText, Col, Right } from 'native-base';
import { material, materialColors, systemWeights } from "react-native-typography";
import { Card, CardTitle, CardContent, CardAction, CardButton, CardImage } from 'react-native-material-cards'
import * as MagicMove from 'react-native-magic-move';
import platform from '../native-base-theme/variables/platform';
import getTheme from '../native-base-theme/components';
import styles from '../styles/style'
import ScrollSection from './ScrollSection';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <StyleProvider style={getTheme(platform)}>
                <Header transparent style={this.props.style}>
                    <Left>
                        {
                            this.props.subView?(
                                <Button transparent onPress={()=>this.props.navigation.goBack()}>
                                    <Icon name='arrow-round-back' style={{color: !this.props.dark?materialColors.blackSecondary:materialColors.whiteSecondary}}/>
                                </Button>
                            ):(
                                <Button transparent onPress={()=>this.props.navigation.openDrawer()}>
                                    <Icon name='menuunfold' type='AntDesign' style={{color: !this.props.dark?materialColors.blackSecondary:materialColors.whiteSecondary}}/>
                                </Button>
                            )
                        }
                    </Left>
                    <Body>
                        <Text style={!this.props.dark?material.title:material.titleWhite}>
                            {this.props.text}
                        </Text>
                    </Body>
                    <Right>
                        {
                            this.props.editUser?(
                                <Button transparent onPress={() => this.props.navigation.navigate('Edit')}>
                                    <Icon name={'adduser'} type='AntDesign' style={{color: !this.props.dark?materialColors.blackSecondary:materialColors.whiteSecondary}}/>
                                </Button>
                            ):(
                                <Button transparent onPress={() => this.props.navigation.navigate('Profile')}>
                                    <Icon name={'user'} type='AntDesign' style={{color: !this.props.dark?materialColors.blackSecondary:materialColors.whiteSecondary}}/>
                                </Button>
                            )
                        }
                        <Button transparent>
                            <Icon name='customerservice' type='AntDesign' style={{color: !this.props.dark?materialColors.blackSecondary:materialColors.whiteSecondary}}/>
                        </Button>
                    </Right>
                </Header>
            </StyleProvider>
        );
    }
}

export default Home;
