import React, { Component } from 'react';
import { View, Image, ImageBackground, ScrollView } from 'react-native';
// import { Container, StyleProvider, Left, Button, Icon, Body, Content, Grid, Row, Card as NBCard, CardItem, Text as NBText, Col, Right, List, ListItem } from 'native-base';
import { material, materialColors, systemWeights } from "react-native-typography";
import { Container, Content, Button, ListItem, Text, Icon, List, Left, Body, Right, Switch, StyleProvider, Row } from 'native-base';
import * as MagicMove from 'react-native-magic-move';
import platform from '../native-base-theme/variables/platform';
import getTheme from '../native-base-theme/components';
import styles from '../styles/style'
import ScrollSection from './ScrollSection';
import Header from './Header'

const listItemStyle = {
    marginVertical: 10,
}

class Setting extends Component {
    constructor(props) {
        super(props);
        this.state = {
            notify: false
        };
    }

    render() {
        return (
            // <MagicMove.Scene>
                <Container>
                    <StyleProvider style={getTheme(platform)}>
                        <Content>
                            <Header navigation={this.props.navigation} transparent={false} text='Help & Support'/>
                            <Row style={{justifyContent: 'center', alignItems: 'center', height: 150}}>
                                <Image source={require('../assets/logo.png')} style={{height: 120, width: 120}} resizeMode='center'/>
                            </Row>
                            <List>
                                <ListItem icon style={listItemStyle}>
                                    <Left>
                                        <Button dark transparent>
                                            <Icon name="notifications" />
                                        </Button>
                                    </Left>
                                    <Body>
                                        <Text style={material.subheading} >Notifications</Text>
                                    </Body>
                                    <Right>
                                        <Switch value={this.state.notify} onValueChange={() => this.setState({notify: !this.state.notify})} />
                                    </Right>
                                </ListItem>
                                <ListItem icon style={listItemStyle}>
                                    <Left>
                                        <Button dark transparent>
                                            <Icon name="information-circle" />
                                        </Button>
                                    </Left>
                                    <Body>
                                        <Text style={material.subheading} >About this app</Text>
                                    </Body>
                                    <Right>
                                        <Text>On</Text>
                                        <Icon active name="arrow-forward" />
                                    </Right>
                                </ListItem>
                                {/* <ListItem icon style={listItemStyle}>
                                    <Left>
                                        <Button dark transparent>
                                            <Icon name="person" />
                                        </Button>
                                    </Left>
                                    <Body>
                                        <Text style={material.subheading} >Sign Out</Text>
                                    </Body>
                                    <Right>
                                        <Icon active name="log-out" />
                                    </Right>
                                </ListItem> */}
                            </List>
                        </Content>
                    </StyleProvider>
                </Container>
            // </MagicMove.Scene>
        );
    }
}

export default Setting;
