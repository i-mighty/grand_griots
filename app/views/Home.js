import React, { Component } from 'react';
import { View, Text, ScrollView, ActivityIndicator } from 'react-native';
import { Container, StyleProvider, Content, Toast } from 'native-base';
import platform from '../native-base-theme/variables/platform';
import getTheme from '../native-base-theme/components';
import ScrollSection from './ScrollSection';
import Header from './Header'
import firebase from 'react-native-firebase';
import { heightPercentageToDP } from 'react-native-responsive-screen';

var fs = firebase.firestore();

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            books:[],
            new_release:[],
            loading: true,
            faith: [],
        };
    }

    componentDidMount(){
        var books = [];
        var faith = []
        // All books
        try {
            fs.collection('sample_books').get().then(col => {
                col.forEach(doc => {
                    books.push(doc.data());
                })
                this.setState({books, loading: false})
            });
            // Faith Based
            fs.collection('sample_books').get().then(col => {
                col.forEach(doc => {
                    faith.push(doc.data());
                })
            });
        } catch (error) {
            Toast.show({
                text: error.message,
                type: 'danger',
                duration: 3000
            })
        }
    }

    render() {
        return (
            // <MagicMove.Scene>
                <Container style={{backgroundColor: '#444444'}}>
                    <StyleProvider style={getTheme(platform)}>
                        <Content>
                            <Header navigation={this.props.navigation} transparent={false} text='Explore'/>
                            {
                                this.state.books.length > 0?(
                                    <ScrollView>
                                        <ScrollSection title='Popular' navigation={this.props.navigation} data={this.state.books}/>
                                        <ScrollSection title='Fiction' navigation={this.props.navigation} data={this.state.books}/>
                                        <ScrollSection title='Non Fiction' navigation={this.props.navigation} data={this.state.books}/>
                                        <ScrollSection title='Children and Teenagers' navigation={this.props.navigation} data={this.state.books}/>
                                        <ScrollSection title='Love and Marriage' navigation={this.props.navigation} data={this.state.books}/>
                                        <ScrollSection title='Self Help' navigation={this.props.navigation} data={this.state.books}/>
                                        <ScrollSection title='Free' navigation={this.props.navigation} data={this.state.books}/>
                                        <ScrollSection title='Erotica' navigation={this.props.navigation} data={this.state.books}/>
                                        <ScrollSection title='Yoruba' navigation={this.props.navigation} data={this.state.books}/>
                                        <ScrollSection title='Faith Based' navigation={this.props.navigation} data={this.state.books}/>
                                        <ScrollSection title='Business' navigation={this.props.navigation} data={this.state.books}/>
                                    </ScrollView>
                                ):(
                                    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', height: heightPercentageToDP('80%')}}>
                                        <View style={{width: '80%', height: '40%', alignItems:'center', justifyContent: 'center'}}>
                                            {
                                                this.state.loading?(
                                                    <ActivityIndicator size={60} color={platform.brandPrimary}/>
                                                ):(
                                                    <Text>No books yet</Text>
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

export default Home;
