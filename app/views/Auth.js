import React, { Component } from 'react';
import { View, Image } from 'react-native';
import { Container, Content, Item, Icon, Input, Form, Button, Text, StyleProvider, Row, Grid } from 'native-base';
import styles from '../styles/style';
import getTheme from '../native-base-theme/components';
import platform from '../native-base-theme/variables/platform';
import { AnimatedBackgroundColorView } from 'react-native-animated-background-color-view';
import { widthPercentageToDP } from 'react-native-responsive-screen';
import { material } from 'react-native-typography';

var color = '#efef'
class Auth extends Component {
    constructor(props) {
        super(props);
        this.state = {
            eSuccess: false,
            eFail: false,
            pSuccess: false,
            pFail: false,
            pVisible:false,
            colors: ['#dedede', '#C8C', '#F8F8F8', '#f0ad4e', '#AAC5AA', '#FFB6C1', '#8899FF'],
            // colors: ['#fff', '#25CC', '#C8C8c8', '#A33', ],
            nowColor: 0,
            color: '#efefef'
        };
    }

    componentDidMount(){
        setInterval(()=> {
            var val = this.state.nowColor
            if (val === 6) {
                val= -1;
            }
            val++;
            this.setState({nowColor: val})
        }, 5000)
    }

    render() {
        return (
            <AnimatedBackgroundColorView color={this.state.colors[this.state.nowColor]} duration={2500}>
                <StyleProvider style={getTheme(platform)}>
                    <Content contentContainerStyle={styles.centerVerticalContainer}>
                        <Row style={{justifyContent: 'center', alignItems: 'center', height: 200}}>
                            <Image source={require('../assets/logo.png')} style={{height: 120, width: 120}} resizeMode='center'/>
                        </Row>
                            <Form>
                                <Item regular style={styles.input} success={this.state.eSuccess} error={this.state.eFail}>
                                    <Icon active name='mail' type='Entypo' style={{color: platform.brandDark}}/>
                                    <Input placeholder="Email Address" style={material.body1}/>
                                    {
                                        !this.state.eFail||this.state.eSuccess?(null):(<Icon name='checkmark-circle' />)
                                    }
                                </Item>
                                <Item regular style={styles.input} success={this.state.pSuccess} error={this.state.pFail}>
                                    <Icon active name='lock' type='Entypo' style={{color: platform.brandDark}}/>
                                    <Input placeholder="Password" secureTextEntry={!this.state.pVisible} style={material.body1}/>
                                    {
                                        !this.state.pFail||!this.state.pSuccess?(
                                            <Icon name={this.state.pVisible?'eye-off':'eye'} onPress={() => this.setState({pVisible: !this.state.pVisible})}/>
                                        ):(
                                            <Icon name='checkmark-circle' />
                                        )
                                    }
                                </Item>
                                <Button block style={styles.input}>
                                    <Text style={material.body1White}>LOGIN</Text>
                                </Button>
                                <Button bordered block style={styles.input}>
                                    <Text style={material.body1}>REGISTER</Text>
                                </Button>
                            </Form>
                    </Content>
                </StyleProvider>
            </AnimatedBackgroundColorView>
        );
    }
}

export default Auth;
