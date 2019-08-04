import React, { Component } from 'react';
import { View, Image, ImageBackground, ScrollView } from 'react-native';
import { material, materialColors, systemWeights } from "react-native-typography";
import { Card, CardTitle, CardContent, CardAction, CardButton, CardImage } from 'react-native-material-cards'
import * as MagicMove from 'react-native-magic-move';
import platform from '../native-base-theme/variables/platform';
import getTheme from '../native-base-theme/components';
import styles from '../styles/style'
import ScrollSection from './ScrollSection';
import Header from './Header'
import { Container, Content, Item, Icon, Input, Form, Button, Text, StyleProvider, Row, Grid, Toast, Textarea } from 'native-base';
import { widthPercentageToDP } from 'react-native-responsive-screen';
import  Firebase  from 'react-native-firebase';
import DialogInput from 'react-native-dialog-input';
import Dialog from "react-native-dialog";
import Spinner from 'react-native-loading-spinner-overlay';
import isEmail from 'validator/lib/isEmail';
import firebase from 'react-native-firebase';
import { duration } from 'moment';

const fs = firebase.firestore();
const auth = firebase.auth();

class Help extends Component {
    constructor(props) {
        super(props);
        this.state = {
            subject: '',
            message: "",
            spinner: false,
        };
    }

    render() {
        return (
            // <MagicMove.Scene>
                <Container>
                    <StyleProvider style={getTheme(platform)}>
                        <Content>
                            <Header navigation={this.props.navigation} transparent={false} text='Help & Support'/>
                            <StyleProvider style={getTheme(platform)}>
                                <Content contentContainerStyle={styles.centerVerticalContainer}>
                                    <Row style={{justifyContent: 'center', alignItems: 'center', height: 150}}>
                                        <Image source={require('../assets/logo.png')} style={{height: 120, width: 120}} resizeMode='center'/>
                                    </Row>
                                    <Row>
                                        <Text style={{...material.body1}}>
                                            Noticed anything wrong or out of place? Please feel free to send a report to us. We are working hard to improve your experience.
                                        </Text>
                                    </Row>
                                    <Form>
                                        <Item regular style={styles.input} success={this.state.eSuccess} error={this.state.eFail}>
                                            <Input placeholder="Subject" style={material.body1} onChangeText={(subject) => this.setState({subject})}/>
                                        </Item>
                                        <Textarea rowSpan={5} bordered style={styles.input} placeholder="Your message" onChangeText={(message) => this.setState({message})}/>
                                        <Button block style={styles.input} onPress={() => this.submit()}>
                                            <Text style={material.body1White}>Submit</Text>
                                        </Button>
                                    </Form>
                                </Content>
                            </StyleProvider>
                            <Spinner
                                visible={this.state.spinner}
                                textContent={'Loading...'}
                                textStyle={material.body2White}
                            />
                        </Content>
                    </StyleProvider>
                </Container>
            // </MagicMove.Scene>
        );
    }

    submit(){
        var {subject, message} = this.state;
        this.setState({spinner: true})
        if (this.state) {
            fs.collection('reports').add({
                subject: subject,
                message: message,
                user: auth.currentUser.toJSON()
            }).then(val => {
                Toast.show({
                    text: 'Your report has been submitted successfully.\nWe would review it and get back to you.',
                    duration: 4000
                })
                this.setState({spinner: false})
            }).catch(err => {
                Toast.show({
                    text: 'You report may not have been successfully sent.\nPlease try again.',
                    type: 'danger',
                    duration: 4000,
                })
                this.setState({spinner: false})
            })
        } else {
            
        }
    }
}

export default Help;
