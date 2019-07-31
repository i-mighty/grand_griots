import React, { Component } from 'react';
import { View, Text, Image, ImageBackground, ScrollView } from 'react-native';
import { Container, StyleProvider, Left, Button, Icon, Body, Content, Grid, Row, Card as NBCard, CardItem, Text as NBText, Col, Right, Toast } from 'native-base';
import { material, materialColors, systemWeights } from "react-native-typography";
import { Card, CardTitle, CardContent, CardAction, CardButton, CardImage } from 'react-native-material-cards'
import * as MagicMove from 'react-native-magic-move';
import platform from '../native-base-theme/variables/platform';
import getTheme from '../native-base-theme/components';
import styles from '../styles/style'
import ScrollSection from './ScrollSection';
import Header from './Header'
import GridSection from './GridSection';
import firebase from 'react-native-firebase';
const fs = firebase.firestore()
import { heightPercentageToDP } from 'react-native-responsive-screen';

class NewRelease extends Component {
    constructor(props) {
        super(props);
        this.state = {
            books: [],
        };
    }

    componentDidMount(){
        var books = [];
        fs.collection('sample_books').get().then(col => {
            col.forEach(doc => books.push(doc.data()))
            this.setState({books})
        }).catch(error =>{
            Toast.show({
                text: error.message
            })
        })
    }

    render() {
        return (
            // <MagicMove.Scene>
                <Container style={{backgroundColor: '#444'}}>
                    <StyleProvider style={getTheme(platform)}>
                        <Content>
                            <Header navigation={this.props.navigation} transparent={false} text='New Releases'/>
                            {
                                this.state.books.length > 0?(
                                    <ScrollView>
                                        <GridSection navigation={this.props.navigation} data={this.state.books}/>
                                    </ScrollView>
                                ):(
                                    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', height: heightPercentageToDP('80%')}}>
                                        <View style={{width: '80%', height: '40%', alignItems:'center', justifyContent: 'center'}}>
                                            {
                                                this.state.loading?(
                                                    <ActivityIndicator size={60} color={platform.brandPrimary}/>
                                                ):(
                                                    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', height: heightPercentageToDP('50%')}}>
                                                        <View style={{width: '80%', height: '40%', alignItems:'center', justifyContent: 'center'}}>
                                                            {
                                                                this.state.loading?(
                                                                    <ActivityIndicator size={60} color={platform.brandPrimary}/>
                                                                ):(
                                                                    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                                                                        <Icon name="book-open" type="FontAwesome5" style={{color: materialColors.whiteSecondary}}/>
                                                                        <Text style={material.subheadingWhite}>No books yet</Text>
                                                                    </View>
                                                                )
                                                            }
                                                        </View>
                                                    </View>
                                                )
                                            }
                                        </View>
                                    </View>
                                )
                            }
                        </Content>
                    </StyleProvider>
                </Container>
            // </MagicMove.Scene>
        );
    }
}

export default NewRelease;
