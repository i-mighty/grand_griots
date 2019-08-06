import React, { Component } from 'react';
import { View, Text, ActivityIndicator, ScrollView } from 'react-native';
import { Container, StyleProvider, Content, Toast } from 'native-base';
import platform from '../native-base-theme/variables/platform';
import getTheme from '../native-base-theme/components';
import Header from './Header'
import GridSection from './GridSection';
import firebase from 'react-native-firebase';
import { heightPercentageToDP } from 'react-native-responsive-screen';
import { material } from 'react-native-typography';

const fs = firebase.firestore();

class Category extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // title: this.props.navigation.getParam('title', 'Category'),
            title: this.props.navigation.getParam('title', ''),
            link: this.props.navigation.getParam('link', ''),
            loading: true,
            books: []
        };
    }

    async componentDidMount(){
        var books = [];
        fs.collection('sample_books').where('genre', '==', this.state.link.toLowerCase()).get().then(col => {
            col.forEach(doc => {
                books.push(doc.data());
            })
            this.setState({books, loading:false})
        }).catch(err => {
            Toast.show({
                text: 'Could not fetch your books\n.Please try again.',
                duration: 4000,
                type: 'danger'
            })
        })
    }

    render() {
        return (
            // <MagicMove.Scene>
                <Container style={{backgroundColor: '#444'}}>
                    <StyleProvider style={getTheme(platform)}>
                        <Content>
                            <Header navigation={this.props.navigation} subView={true} transparent={false} text={this.props.navigation.getParam('title', 'Category')}/>
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
                                                    <Text style={material.titleWhite}>No books yet</Text>
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

export default Category;
