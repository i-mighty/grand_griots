import React, { Component } from 'react';
import { View, ImageBackground, Text } from 'react-native';
import { Grid, Row, Content, Col, Icon, Button, Text as NBText, StyleProvider, Toast } from 'native-base';
import * as Progress from 'react-native-progress';
import styles from '../styles/style';
import * as MagicMove from 'react-native-magic-move';
import platform from '../native-base-theme/variables/platform';
import getTheme from '../native-base-theme/components';
import SubRow from './SubRow';
import Header from './Header';
import TrackPlayer, { ProgressComponent } from 'react-native-track-player';
import { widthPercentageToDP } from 'react-native-responsive-screen';
import Slider from '@react-native-community/slider';
import firebase from 'react-native-firebase';
import Spinner from 'react-native-loading-spinner-overlay';
import { material } from 'react-native-typography';
import moment from 'moment';

const genres = {
    non_fiction: "Non Fiction",
    fiction: "Fiction",
    love: "Love",
    children: "Children and Teenagers",
    self_help: "Self Help",
    free: "Free",
    erotica: "Erotica",
    yoruba: "Yoruba",
    faith: "Faith Based",
    business: "Business",
    poetry: "Poetry"
}


const fs = firebase.firestore();
var user  = firebase.auth().currentUser;
class Book extends Component {
    constructor(props) {
        super(props);
        this.state = {
            play: true,
            playing: false,
            loading: false,
            active_sub: false,
            sub_due_date: '',
            play_progress: 0,
            spinner: true,
            // book: this.props.navigation.getParam('book', {
            //     name: 'Half of a Yellow Sun',
            //     author: 'Chimamanda Ngozi Adichie',
            //     image: 'https://images-eu.ssl-images-amazon.com/images/I/61CkmZkUXhL.jpg'
            // }),
            book: this.props.navigation.getParam('book', {
                name: 'Half of a Yellow Sun',
                info: 'The little story about the story that the story teller is telling in the book.',
                author: 'Chimamanda Ngozi Adichie',
                genre: 'Spiralling Genre',
                time: '1 hour 50 minutes',
                language: 'English',
                voiced_by: 'An unknown talker',
                image: 'https://images-eu.ssl-images-amazon.com/images/I/61CkmZkUXhL.jpg',
                audio_file: 'https://firebasestorage.googleapis.com/v0/b/the-grand-griots.appspot.com/o/sample%2FTOG.mp3?alt=media&token=120d3a4e-3b9b-485f-a565-3037036dc061',
                preview_file: 'https://firebasestorage.googleapis.com/v0/b/the-grand-griots.appspot.com/o/sample%2Fbensound-sunny.mp3?alt=media&token=d823633a-b02b-4c97-b3cc-69a8205453e9'
            })
        };
    }

    async componentDidMount(){
        const {book} = this.state;
        fs.collection('subscriptions').doc(user.uid).get().then(doc => {
            if (doc.exists) {
                var sub_due_date = doc.data().due_date
                if (moment().isBefore(sub_due_date)) {
                    var active_sub = true
                } else {
                    var active_sub = false
                }
            } else {
                var active_sub = false
            }
            this.setState({sub_due_date, active_sub, spinner: false})

            if (book.audio_file !== '') {
                TrackPlayer.setupPlayer().then(async () => {
                    //Add the book to queue
                    TrackPlayer.add({
                        id: '1',
                        url: this.state.active_sub ? this.state.book.audio_file : this.state.book.preview_file,
                        title: this.state.book.name,
                        artist: this.state.book.voiced_by,
                        artwork: this.state.book.image
                    });
                    TrackPlayer.updateOptions({
                        stopWithApp: true,
                        // capabilities: [
                        //     TrackPlayer.CAPABILITY_PLAY,
                        //     TrackPlayer.CAPABILITY_PAUSE,
                        //     TrackPlayer.CAPABILITY_SKIP_TO_NEXT,
                        //     TrackPlayer.CAPABILITY_SKIP_TO_PREVIOUS,
                        //     TrackPlayer.CAPABILITY_STOP
                        // ],
                        // compactCapabilities: [
                        //     TrackPlayer.CAPABILITY_PLAY,
                        //     TrackPlayer.CAPABILITY_PAUSE
                        // ]
                    });

                })
            } else {
                this.setState({play: false})
            }
        }).catch(err => {
            this.setState({spinner: false})
            Toast.show({
                text: 'Could not confirm your subscription. Please confirm if you have an active subscription before trying again.\n',
                type: 'danger',
                duration: 3000,
            })
        } )

    }

    onPlayButtonPush(){
        var {book} = this.state;
        this.setState({playing: !this.state.playing})
        if (!this.state.playing) {
            book['percentageDone'] = (TrackPlayer.getPosition()/TrackPlayer.getDuration())*100;
            this.setState({book})
            fs.collection('current_book').doc(user.uid).set(book).then({
                //
            }).catch(error => {
                Toast.show({
                    text: 'Looks like your network connection just failed.'
                })
            })
        }
        this.state.playing?TrackPlayer.pause():TrackPlayer.play();
    }

    async onPrev(){
        let currentTime = await TrackPlayer.getPosition();
        TrackPlayer.seekTo(currentTime-15);
    }

    async onNext(){
        let currentTime = await TrackPlayer.getPosition();
        TrackPlayer.seekTo(currentTime + 15);
    }

    render() {
        const {book} = this.state
        return (
            <StyleProvider style={getTheme(platform)}>
                <Content>
                    <Grid>
                        <Row>
                            {/* <MagicMove.View id='image'> */}
                                <ImageBackground
                                    source={{uri: this.state.book.image}}
                                    resizeMode='cover'
                                    style={styles.imgBackground}
                                >
                                    <Header text={this.state.book.name} navigation={this.props.navigation} subView={true} dark={true} style={{backgroundColor: '#2228'}}/>
                                    <View style = {
                                        [{
                                            backgroundColor: '#2228',
                                            flex: 1,
                                            alignItems: 'center',
                                            justifyContent: 'center'
                                        }, styles.imgBackground]
                                    }>
                                        {
                                            this.state.play?(
                                                <Row>
                                                    <Col style={styles.AudioButtonCont}>
                                                        <Button full transparent onPress={() => this.onPrev()} >
                                                            <Icon name='rewind'/>
                                                        </Button>
                                                    </Col>
                                                    <Col style={styles.AudioButtonCont}>
                                                        <Button full transparent onPress={() => this.onPlayButtonPush()} >
                                                            <Icon name={!this.state.playing?'playcircleo':'pause'} type='AntDesign' style={{fontSize: 50}}/>
                                                        </Button>
                                                    </Col>
                                                    <Col style={styles.AudioButtonCont}>
                                                        <Button full transparent onPress={() => this.onNext()}>
                                                            <Icon name='fastforward'/>
                                                        </Button>
                                                    </Col>
                                                </Row>
                                            ):(
                                                <Col style={styles.AudioButtonCont}>
                                                    <Text style={[material.titleWhite, {textAlign: 'center'}]}>Audio book would be available shortly</Text>
                                                </Col>
                                            )
                                        }
                                        {
                                            this.state.play?(
                                                <ProgressSlider/>
                                            ):(null)
                                        }
                                    </View>
                                </ImageBackground>
                            {/* </MagicMove.View> */}
                        </Row>
                        {
                            this.state.book.audio_file !==''?(
                                <Row>
                                    
                                </Row>
                            ):(null)
                        }
                        <Row style={styles.infoRow}>
                            <Col>
                                <SubRow text={book.author} iconType='Entypo' iconName='pencil'/>
                                <SubRow subText={book.name} iconType='Entypo' iconName='open-book'/>
                                <SubRow subText={book.info} iconType='AntDesign' iconName='infocirlceo'/>
                                <SubRow subText={this.getGenre(book.genre)} iconType='FontAwesome5' iconName='theater-masks'/>
                                <SubRow subText={book.time + " minutes"} iconType='Entypo' iconName='time-slot'/>
                                <SubRow subText={book.language} iconType='Entypo' iconName='language'/>
                                <SubRow subText={book.voiced_by} iconType='Entypo' iconName='mic'/>
                            </Col>
                        </Row>
                        <Row>
                            {/* <Col>
                                <Button success full large iconLeft>
                                    <Icon type='AntDesign' name='playcircleo'/> 
                                    <NBText>
                                        Listen
                                    </NBText>
                                </Button>
                            </Col> */}
                            <Col>
                                <Button full large iconLeft onPress={() => this.save()}>
                                    <Icon type='AntDesign' name='plus'/> 
                                    <NBText>
                                        Save
                                    </NBText>
                                </Button>
                            </Col>
                        </Row>
                    </Grid>
                    <Spinner
                        visible={this.state.spinner}
                        textContent={'Loading...'}
                        textStyle={material.body2White}
                    />
                </Content>
            </StyleProvider>
        );
    }

    getGenre(genre){
        var out = '';
        switch (genre) {
            case 'non_fiction': out = "Non Fiction"; break;
            case 'fiction': out = "Fiction"; break;
            case 'love': out = "Love"; break;
            case 'children': out = "Children and Teenagers"; break;
            case 'self_help': out = "Self Help"; break;
            case 'free': out = "Free"; break;
            case 'erotica': out = "Erotica"; break;
            case 'yoruba': out = "Yoruba"; break;
            case 'faith': out = "Faith Based"; break;
            case 'business': out = "Business"; break;
            case 'poetry': out = "Poetry"; break;
            default: out = "Unclassified"; break;
        }
        return out;
    }

    save(){
        this.setState({loading:false})
        Toast.show({
            text: 'Saving...'
        });
        fs.collection('library').doc('saved_books').collection(user.uid).add(this.state.book).then(val => {
            this.setState({loading: false})
            Toast.show({
                text: this.state.book.name+' has been added to your library.'
            })
        }).catch(err => {
            this.setState({loading: false})
            Toast.show({
                text: 'Please try again, we could not add the book to your library at the moment.'
            })
        })
    }
}


class ProgressSlider extends ProgressComponent {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    render() {
        let progress = this.getProgress();
        let duration = this.state.duration;
        return (
            <Slider
                style={{width: widthPercentageToDP('100%'), height: 50}}
                minimumValue={0}
                maximumValue={1}
                minimumTrackTintColor={platform.brandPrimary}
                maximumTrackTintColor={platform.brandDark}
                thumbTintColor={platform.brandPrimary}
                value={progress}
                onValueChange={(value) => TrackPlayer.seekTo(duration*value)}
            />
        );
    }
}


export default Book;
