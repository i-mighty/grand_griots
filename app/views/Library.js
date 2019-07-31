import React, { Component } from 'react';
import { View, Text, ActivityIndicator, ScrollView } from 'react-native';
import { Content, StyleProvider, Row, Grid, Col, Toast, Icon, Container } from 'native-base';
import platform from '../native-base-theme/variables/platform';
import getTheme from '../native-base-theme/components';
import styles from '../styles/style';
import BookCard from './BookCard';
import Header from './Header'
import { material, systemWeights, materialColors } from 'react-native-typography';
import * as Progress from 'react-native-progress';
import ScrollSection from './ScrollSection';
import firebase from 'react-native-firebase';
import { heightPercentageToDP } from 'react-native-responsive-screen';

var fs = firebase.firestore();
var user = firebase.auth().currentUser;

class Library extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentBook: {},
            loading: true,
            books:[]
        };
    }

    componentDidMount(){
        var books = [];
        try {
            fs.collection('current_book').doc(user.uid).get().then(doc => {
                    if (doc.exists) {
                        this.setState({
                            currentBook: doc.data(),
                            loading: false
                        })
                    }else{
                        this.setState({loading: false})
                    }
                })
            fs.collection('library').doc('saved_books').collection(user.uid).get().then(col => {
                col.forEach(doc => books.push(doc.data()))
                this.setState({books})
            })
        } catch (error) {
            // 
        }
    }

    render() { 
        var {currentBook}  = this.state;
        return (
            <Container style={{backgroundColor: '#444'}}>
                <StyleProvider style={getTheme(platform)}>
                <Content>
                    <Grid>
                        <Header text='My Library' navigation={this.props.navigation} />
                        {
                            this.state.currentBook !=={}?(
                                <Row style={styles.libContainer}>
                                    <Grid>
                                        <Row>
                                            <Col style={{width: null}}>
                                                <BookCard item={this.state.currentBook} index={0} big={true} imageOnly={true} navigation={this.props.navigation}/>
                                            </Col>
                                            <Col style={{justifyContent: 'center'}}>
                                                <Text style={[material.titleWhite, subStyles.infoText]}>
                                                    {currentBook.name}
                                                </Text>
                                                <Text style={[{...material.subheadingWhite, ...systemWeights.light}, subStyles.infoText]}>
                                                    {currentBook.author}
                                                </Text>
                                                <Col style={[subStyles.infoText]}>
                                                    <Text style={[material.body2White, subStyles.progItem]} ellipsizeMode='tail' numberOfLines={1}>1 hour, 50 minutes and 30 seconds</Text>
                                                    <Progress.Bar indeterminate={true } color={platform.brandPrimary} style={subStyles.progItem}/>
                                                </Col>
                                            </Col>
                                        </Row>
                                    </Grid>
                                </Row>
                            ):(
                                <Row>
                                    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', height: heightPercentageToDP('50%')}}>
                                        <View style={{width: '80%', height: '40%', alignItems:'center', justifyContent: 'center'}}>
                                            {
                                                this.state.loading?(
                                                    <ActivityIndicator size={40} color={platform.brandPrimary}/>
                                                ):(
                                                    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                                                        <Icon name="book-open" type="FontAwesome5" style={{color: materialColors.whiteSecondary}}/>
                                                        <Text style={material.subheadingWhite}>No book yet</Text>
                                                    </View>
                                                )
                                            }
                                        </View>
                                    </View>
                                </Row>
                            )
                        }
                        {
                                this.state.books.length > 0?(
                                    <ScrollView>
                                        <ScrollSection title='Saved books' navigation={this.props.navigation} data={this.state.books}/>
                                    </ScrollView>
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
                        
                    </Grid>
                </Content>
            </StyleProvider>
            </Container>
        );
    }
}

const subStyles = {
    infoText: {
        marginVertical: 5,
    },
    progItem:{
        marginVertical: 2
    }
}

export default Library;
