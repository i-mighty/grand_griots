import React, { Component } from 'react';
import { View, Image } from 'react-native';
import { Container, Content, Item, Icon, Input, Form, Button, Text, StyleProvider, Row, Grid, Toast } from 'native-base';
import styles from '../styles/style';
import getTheme from '../native-base-theme/components';
import platform from '../native-base-theme/variables/platform';
import { AnimatedBackgroundColorView } from 'react-native-animated-background-color-view';
import { widthPercentageToDP } from 'react-native-responsive-screen';
import { material } from 'react-native-typography';
import  Firebase  from 'react-native-firebase';
import DialogInput from 'react-native-dialog-input';
import Dialog from "react-native-dialog";
import Spinner from 'react-native-loading-spinner-overlay';
import isEmail from 'validator/lib/isEmail';
var color = '#efef'
class Auth extends Component {
    constructor(props) {
        super(props);
        this.state = {
            //Values
            pass: '',
            email: '',
            user: {},
            displayName: '',
            //Display controls
            eSuccess: false,
            eFail: false,
            pSuccess: false,
            pFail: false,
            pVisible:false,
            spinner: false,
            dialog1: false,
            colors: ['#dedede', '#C8C', '#F8F8F8', '#f0ad4e', '#AAC5AA', '#FFB6C1', '#8899FF'],
            // colors: ['#fff', '#25CC', '#C8C8c8', '#A33', ],
            nowColor: 0,
            color: '#fff'
        };
    }

    componentWillMount(){
        if (Firebase.auth().currentUser) {
            this.props.navigation.navigate('Explore');
        } else {
            
        }
    }

    componentDidMount(){
        // setInterval(()=> {
        //     var val = this.state.nowColor
        //     if (val === 6) {
        //         val= -1;
        //     }
        //     val++;
        //     this.setState({nowColor: val})
        // }, 5000)
    }

    render() {
        return (
            <AnimatedBackgroundColorView color={this.state.color} duration={2500}>
                <StyleProvider style={getTheme(platform)}>
                    <Content contentContainerStyle={styles.centerVerticalContainer}>
                        <Row style={{justifyContent: 'center', alignItems: 'center', height: 200}}>
                            <Image source={require('../assets/logo.png')} style={{height: 120, width: 120}} resizeMode='center'/>
                        </Row>
                            <Form>
                                <Item regular style={styles.input} success={this.state.eSuccess} error={this.state.eFail}>
                                    <Icon active name='mail' type='Entypo' style={{color: platform.brandDark}}/>
                                    <Input placeholder="Email Address" style={material.body1} onChangeText={(email) => this.setState({email})}/>
                                    {
                                        !this.state.eFail||this.state.eSuccess?(null):(<Icon name='checkmark-circle' />)
                                    }
                                </Item>
                                <Item regular style={styles.input} success={this.state.pSuccess} error={this.state.pFail}>
                                    <Icon active name='lock' type='Entypo' style={{color: platform.brandDark}}/>
                                    <Input placeholder="Password" secureTextEntry={!this.state.pVisible} style={material.body1} onChangeText={(pass) => this.setState({pass})}/>
                                    {
                                        !this.state.pFail||!this.state.pSuccess?(
                                            <Icon name={this.state.pVisible?'eye-off':'eye'} onPress={() => this.setState({pVisible: !this.state.pVisible})}/>
                                        ):(
                                            <Icon name='checkmark-circle' />
                                        )
                                    }
                                </Item>
                                <Item style={{borderBottomWidth: 0}}>
                                    <Row style={{justifyContent: 'flex-end'}}>
                                    <Button transparent small onPress={() => this.resetPass()}>
                                        <Text>Forgot password</Text>
                                    </Button>
                                </Row>
                                </Item>
                                <Button block style={styles.input} onPress={() => this.login()}>
                                    <Text style={material.body1White}>LOGIN</Text>
                                </Button>
                                <Button bordered block style={styles.input} onPress={() => this.register()}>
                                    <Text style={material.body1}>REGISTER</Text>
                                </Button>
                            </Form>
                    </Content>
                </StyleProvider>
                <Spinner
                    visible={this.state.spinner}
                    textContent={'Loading...'}
                    textStyle={material.body2White}
                />

                <Dialog.Container visible={this.state.dialog1}>
                    <Dialog.Title>Complete your registration</Dialog.Title>
                    <Dialog.Description>
                        We need you to provide a name
                    </Dialog.Description>
                    <Dialog.Input onChangeText={(displayName) => this.setState({displayName})} />
                    <Dialog.Button label="Continue" onPress={() => this.completeReg()} />
                </Dialog.Container>
            </AnimatedBackgroundColorView>
        );
    }

    async resetPass(){
        if (isEmail(this.state.email)) {
            this.loading(true)
            try {
                await Firebase.auth().sendPasswordResetEmail(this.state.email)
                this.loading(false)
                this.props.navigation.navigate('MailSent', {verify: false})
            } catch (error) {
                this.loading(false)
                Toast.show({
                    type: 'danger',
                    text: 'Could not send the password reset email.\n '+error.message
                });
            }
        } else {
            Toast.show({
                type: 'danger',
                text: 'Please enter a valid email to reset your password'
            });
        }
    }

    async login(){
        if (isEmail(this.state.email)&&this.state.pass.length > 5) {
            this.loading(true);
            try {
                let user = (await Firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.pass)).user
                //redux and redirect
                this.loading(false)
                this.props.navigation.navigate('Explore');
                // if (!user.emailVerified) {
                //     user.sendEmailVerification();
                //     this.props.navigation.navigate('MailSent', {verify: true})
                // } else {
                //     this.props.navigation.navigate('Explore');
                // }
            } catch (error) {
                this.loading(false);
                Toast.show({
                    type: 'danger', 
                    text: 'Could not register you.\n'+error.message
                });
            }
        } else {
            Toast.show({
                type: 'danger',
                text: 'Please enter a valid email and ensure that your password is at least 6 characters long'
            });
        }
    }

    async register(){
        if (isEmail(this.state.email)&&this.state.pass.length > 5) {
            this.loading(true);
            try {
                let user = (await Firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.pass)).user;
                this.setState({user, dialog1: true});
                this.loading(false);
            } catch (error) {
                this.loading(false);
                Toast.show({
                    type: 'danger', 
                    text: 'Could not register you.\n'+error.message
                });
            }
        } else {
            Toast.show({
                type: 'danger',
                text: 'Please enter a valid email and ensure that your password is at least 6 characters long'
            });
        }
    }

    loading(spinner){
        this.setState({spinner})
    }

    async completeReg(){
        var initUser = this.state.user;
        this.setState({dialog1: false})
        this.loading(true)
        try {
            await initUser.updateProfile({displayName: this.state.displayName})
            //Save to redux
            //Navigate to 
            this.loading(false)
            this.props.navigation.navigate('MailSent', {verify: true})
        } catch (error) {
            Toast.show({
                type: 'danger',
                text: 'Please use a valid name and ensure that you are connected to the internet'
            });
        }
    }
}

export default Auth;
