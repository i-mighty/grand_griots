import React, { Component } from 'react';
import { View, Text, ScrollView, ActivityIndicator } from 'react-native';
import { Container, StyleProvider, Content, Toast } from 'native-base';
import platform from '../native-base-theme/variables/platform';
import getTheme from '../native-base-theme/components';
import ScrollSection from './ScrollSection';
import Header from './Header'
import firebase from 'react-native-firebase';
import {BackHandler} from 'react-native'
import { heightPercentageToDP } from 'react-native-responsive-screen';

var fs = firebase.firestore();

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            books:[],
            new_release:[],
            loading: true,
            non_fiction: [],
            fiction: [],
            love: [],
            children: [],
            self_help: [],
            free: [],
            erotica: [],
            yoruba: [],
            faith: [],
            business: []
        };
    }

    componentDidMount(){
        BackHandler.addEventListener('hardwareBackPress', () => {return true});
        var books = [];
        var new_release=[];
        var fiction = []
        var non_fiction = []
        var love = []
        var children = []
        var self_help = []
        var free = []
        var erotica = []
        var yoruba = []
        var faith = []
        var business = []
        // All books
        try {
            fs.collection('sample_books').get().then(col => {
                col.forEach(doc => {
                    books.push(doc.data());
                })
                this.setState({books, loading: false})
            });
            // New Release
            fs.collection('sample_books').limit(10).get().then(col => {
                col.forEach(doc => {
                    new_release.push(doc.data());
                })
                this.setState({new_release, loading: false})
            });
            // Fiction
            fs.collection('sample_books').where('genre', '==', 'fiction').get().then(col => {
                col.forEach(doc => {
                    fiction.push(doc.data());
                })
                this.setState({fiction, loading: false})
            });
            // Non Fiction
            fs.collection('sample_books').where('genre', '==', 'non_fiction').get().then(col => {
                col.forEach(doc => {
                    non_fiction.push(doc.data());
                })
                this.setState({
                    non_fiction,
                    loading: false
                })
            });
            // Love
            fs.collection('sample_books').where('genre', '==', 'love').get().then(col => {
                col.forEach(doc => {
                    love.push(doc.data());
                })
                this.setState({love, loading: false})
            });
            // Children
            fs.collection('sample_books').where('genre', '==', 'children').get().then(col => {
                col.forEach(doc => {
                    children.push(doc.data());
                })
                this.setState({children, loading: false})
            });
            // Self Help
            fs.collection('sample_books').where('genre', '==', 'self_help').get().then(col => {
                col.forEach(doc => {
                    self_help.push(doc.data());
                })
                this.setState({self_help, loading: false})
            });
            // Free
            fs.collection('sample_books').where('genre', '==', 'free').get().then(col => {
                col.forEach(doc => {
                    free.push(doc.data());
                })
                this.setState({free, loading: false})
            });
            // Erotica
            fs.collection('sample_books').where('genre', '==', 'erotica').get().then(col => {
                col.forEach(doc => {
                    erotica.push(doc.data());
                })
                this.setState({erotica, loading: false})
            });
            // Yoruba
            fs.collection('sample_books').where('genre', '==', 'yoruba').get().then(col => {
                col.forEach(doc => {
                    yoruba.push(doc.data());
                })
                this.setState({yoruba, loading: false})
            });
            // Faith
            fs.collection('sample_books').where('genre', '==', 'faith').get().then(col => {
                col.forEach(doc => {
                    faith.push(doc.data());
                })
                this.setState({faith, loading: false})
            });
            // Business
            fs.collection('sample_books').where('genre', '==', 'business').get().then(col => {
                col.forEach(doc => {
                    business.push(doc.data());
                })
                this.setState({business, loading: false})
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
                            <ScrollView>
                            {
                                this.state.books.length > 0?(
                                        <ScrollSection title='Popular' navigation={this.props.navigation} data={this.state.books}/>
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
                            {
                                this.state.fiction.length >0?(
                                    <ScrollSection title='Fiction' navigation={this.props.navigation} data={this.state.fiction}/>
                                ):(null)
                            }
                            {
                                this.state.non_fiction.length >0?(
                                    <ScrollSection title='Non Fiction' navigation={this.props.navigation} data={this.state.non_fiction}/>
                                ):(null)
                            }
                            {
                                this.state.love.length >0?(
                                    <ScrollSection title='Love and Marriage' navigation={this.props.navigation} data={this.state.love}/>
                                ):(null)
                            }
                            {
                                this.state.children.length >0?(
                                    <ScrollSection title='Children and Teenagers' navigation={this.props.navigation} data={this.state.children}/>
                                ):(null)
                            }
                            {
                                this.state.self_help.length >0?(
                                    <ScrollSection title='Self Help' navigation={this.props.navigation} data={this.state.self_help}/>
                                ):(null)
                            }
                            {
                                this.state.free.length >0?(
                                    <ScrollSection title='Free' navigation={this.props.navigation} data={this.state.free}/>
                                ):(null)
                            }
                            {
                                this.state.erotica.length >0?(
                                    <ScrollSection title='Erotica' navigation={this.props.navigation} data={this.state.erotica}/>
                                ):(null)
                            }
                            {
                                this.state.yoruba.length >0?(
                                    <ScrollSection title='Yoruba' navigation={this.props.navigation} data={this.state.yoruba}/>
                                ):(null)
                            }
                            {
                                this.state.faith.length >0?(
                                    <ScrollSection title='Faith Based' navigation={this.props.navigation} data={this.state.faith}/>
                                ):(null)
                            }
                            {
                                this.state.business.length >0?(
                                    <ScrollSection title='Business' navigation={this.props.navigation} data={this.state.business}/>
                                ):(null)
                            }
                            </ScrollView>
                        </Content>
                    </StyleProvider>
                </Container>
            // </MagicMove.Scene>
        );
    }
}

export default Home;
