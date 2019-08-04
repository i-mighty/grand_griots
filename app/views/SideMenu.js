import React, { Component } from 'react';
import { View, Image } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Grid, Row, Button, Text, Icon, Col, Thumbnail, Toast } from 'native-base';
import platform from '../native-base-theme/variables/platform';
import * as Animated from 'react-native-animatable';
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen';
import { material } from 'react-native-typography';
import firebase from 'react-native-firebase';

class SideMenu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            links:[
                {
                    name: 'Explore', 
                    link: 'Explore',
                    iconName: '',
                    iconType: ''
                },
                {
                    name: 'Categories',
                    link: 'Categories',
                    iconName: '',
                    iconType: ''
                },
                {
                    name: 'My Library',
                    link: 'Library',
                    iconName: '',
                    iconType: ''
                },
                {
                    name: 'New Releases',
                    link: 'NewReleases',
                    iconName: '',
                    iconType: ''
                },
                {
                    name: 'Help and Support',
                    link: 'Help',
                    iconName: '',
                    iconType: ''
                },
                {
                    name: 'Subscription', 
                    link: 'Profile', 
                    iconName: '',
                    iconType: ''
                },
                {
                    name: 'Settings',
                    link: 'Settings',
                    iconName: '',
                    iconType: ''
                },
                {
                    name: 'Suggest a Book',
                    link: 'Suggest',
                    iconName: '',
                    iconType: ''
                }
            ]
        };
    }

    style = {
        justifyContent: 'center',
        alignItems: 'center',
    }

    render() {
        return (
            <ScrollView style={{paddingTop: 10}}>
                <Row style={{ paddingLeft: 5, paddingBottom: 0, marginTop: 2, marginBottom: 10}}>
                    <Button transparent danger onPress={() => this.props.navigation.closeDrawer()}>
                        <Icon type='AntDesign' name='close'/>
                    </Button>
                </Row>
                <ScrollView contentContainerStyle={[this.style]}>
                    <Grid style={this.style}>
                    {
                        this.state.links.map((val, index, arr) =>{
                            if(val.link === this.props.activeItemKey){
                                return (
                                    <Row style={[{borderBottomColor: platform.brandPrimary, borderBottomWidth: 2}]}>
                                        <Button  transparent dark onPress={() => {this.navigate(val.link)}}>
                                            <Text>{val.name}</Text>
                                        </Button>
                                    </Row>
                                )
                            }
                            return (
                                    <Row style={[{borderBottomColor: platform.brandDark, borderBottomWidth: 2}]}>
                                        <Button  transparent dark onPress={() => {this.navigate(val.link)}}>
                                            <Text>{val.name}</Text>
                                        </Button>
                                    </Row>
                            )
                        })
                    }
                        <Row style={[{borderBottomColor: platform.brandDark, borderBottomWidth: 2}]}>
                            <Button transparent dark 
                                onPress={() => {
                                    firebase.auth().signOut().then(() => this.props.navigation.navigate('Auth')).catch(error => {
                                        Toast.show({
                                            text: 'Could not sign you out.\nPlease ensure you have internet access before trying again'
                                        })
                                    })
                                }}
                            >
                                <Text>Logout</Text>
                            </Button>
                        </Row>
                        <Row style={[{borderBottomColor: platform.brandDark, borderBottomWidth: 2}]}>
                            <Button transparent dark >
                                <Text>Recommend Us</Text>
                            </Button>
                        </Row>
                    </Grid>
                </ScrollView>
                <Row style={{paddingVertical: 30, marginVertical: 50}}>
                    <Col style={[this.style, {width: 75}]}>
                        <Thumbnail source={require('../assets/icon.png')} style={{height: 75, width: 75, borderWidth:0, borderColor: platform.brandPrimary}}/>
                    </Col>
                </Row>
            </ScrollView>
        );
    }
    navigate(route){
        this.props.navigation.navigate(route)
    }
}

export default SideMenu;
