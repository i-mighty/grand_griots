import React, { Component } from 'react';
import { View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Grid, Row, Button, Text, Icon } from 'native-base';
import platform from '../native-base-theme/variables/platform';
import * as Animated from 'react-native-animatable';

class SideMenu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            links:[
                {
                    name: 'My Library',
                    link: 'Library',
                    iconName: '',
                    iconType: ''
                },
                {
                    name: 'Explore', 
                    link: 'Explore',
                    iconName: '',
                    iconType: ''
                },
                {
                    name: 'Profile', 
                    link: 'Profile', 
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
            <View style={{padding: 30}}>
                <Row style={{ paddingLeft: 5, paddingBottom: 20, marginTop: 2, marginBottom: 30}}>
                    <Button transparent danger onPress={() => this.props.navigation.closeDrawer()}>
                        <Icon type='AntDesign' name='close'/>
                    </Button>
                </Row>
                <ScrollView contentContainerStyle={[this.style, {}]}>
                    <Grid style={this.style}>
                    {
                        this.state.links.map((val, index, arr) =>{
                            if(val.link === this.props.activeItemKey){
                                return (
                                        <Row style={[{borderBottomColor: platform.brandPrimary, borderBottomWidth: 2}]}>
                                            <Button large transparent dark onPress={() => {this.navigate(val.link)}}>
                                                <Text>{val.name}</Text>
                                            </Button>
                                        </Row>
                                )
                            }
                            return (
                                    <Row style={[{borderBottomColor: platform.brandDark, borderBottomWidth: 2}]}>
                                        <Button large transparent dark onPress={() => {this.navigate(val.link)}}>
                                            <Text>{val.name}</Text>
                                        </Button>
                                    </Row>
                            )
                        })
                    }
                    </Grid>
                </ScrollView>
            </View>
        );
    }
    navigate(route){
        this.props.navigation.navigate(route)
    }
}

export default SideMenu;
