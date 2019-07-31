import React, { Component } from 'react';
import { View, Text, Image, ImageBackground, ScrollView } from 'react-native';
import { Container, Header, StyleProvider, Left, Button, Icon, Body, Content, Grid, Row, Card as NBCard, CardItem, Text as NBText, Col, Right, Item, Input } from 'native-base';
import { material, materialColors, systemWeights } from "react-native-typography";
import { Card, CardTitle, CardContent, CardAction, CardButton, CardImage } from 'react-native-material-cards'
import * as MagicMove from 'react-native-magic-move';
import platform from '../native-base-theme/variables/platform';
import getTheme from '../native-base-theme/components';
import styles from '../styles/style'
import ScrollSection from './ScrollSection';
import * as Animatable from 'react-native-animatable'
class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            search: false
        };
    }

    render() {
        return (
            <StyleProvider style={getTheme(platform)}>
                <View>
                    <Header style={this.props.style}>
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
                        <Text style={!this.props.dark?material.title:material.titleWhite} numberOfLines={1}>
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
                        <Button transparent onPress={() => this.setState({search: !this.state.search})}>
                            <Icon name='search1' type='AntDesign' style={{color: !this.props.dark?materialColors.blackSecondary:materialColors.whiteSecondary}}/>
                        </Button>
                    </Right>
                </Header>
                </View>
            </StyleProvider>
        );
    }
}
// {
//                     this.state.search&&
//                     <Animatable.View animation="fadeIn" duration={300}>
//                         <Header searchBar rounded>
//                             <Item>
//                                 <Icon name="ios-search" />
//                                 <Input placeholder="Search" />
//                                 <Icon name="ios-people" />
//                             </Item>
//                             <Button transparent>
//                                 <Text>Search</Text>
//                             </Button>
//                         </Header>
//                     </Animatable.View>
//                 }
export default Home;
