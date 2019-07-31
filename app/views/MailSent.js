import React, { Component } from 'react';
import { View, Image } from 'react-native';
import { Container, Content, Item, Icon, Input, Form, Button, Text, StyleProvider, Row, Grid, Col } from 'native-base';
import styles from '../styles/style';
import getTheme from '../native-base-theme/components';
import platform from '../native-base-theme/variables/platform';
import { AnimatedBackgroundColorView } from 'react-native-animated-background-color-view';
import { widthPercentageToDP, heightPercentageToDP } from 'react-native-responsive-screen';
import { material } from 'react-native-typography';
import LottieView from 'lottie-react-native';


var color = '#efef'
class Auth extends Component {
    constructor(props) {
        super(props);
        this.state = {
            verify: this.props.navigation.getParam('verify', false)
            // verify: false
        };
    }

    componentDidMount(){
        
    }

    render() {
        return (
                <StyleProvider style={getTheme(platform)}>
                    <Content contentContainerStyle={styles.centerVerticalContainer}>
                        <Row style={{justifyContent: 'center', alignItems: 'center', height: heightPercentageToDP('40%'), marginVertical: heightPercentageToDP('3%')}}>
                            <LottieView source={require('../assets/lottie/mail-sent.json')} autoPlay loop />
                        </Row>
                        <Row style={{justifyContent: 'center'}}>
                            <Col>
                                <Text style={{...material.display1, color: platform.brandSuccess, textAlign: 'center', margingVertical: 15}}>
                                    Success
                                </Text>
                                <Text style={{...material.title, marginVertical: 15}}>
                                    Please check your mailbox to proceed.
                                </Text>
                                <Text style={{...material.body1, marginVertical: 15}}>
                                    {this.state.verify?"Please continue to login.\nA mail containing a confirmation link has been sent to your mailbox. Click on it to verify that your really own the email account.":"Click on the link in the mail sent to you to reset your password then proceed to login. The password reset link would expire in a day."}
                                </Text>
                                <Button success block style={{marginVertical: 15}} onPress={() => this.props.navigation.goBack()}>
                                    <Text>
                                        Go Back
                                    </Text>
                                </Button>
                            </Col>
                        </Row>
                    </Content>
                </StyleProvider>
        );
    }
}

export default Auth;
