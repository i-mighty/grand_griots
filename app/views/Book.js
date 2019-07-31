import React, { Component } from 'react';
import { View, ImageBackground } from 'react-native';
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

        await fs.collection('subscriptions').doc(user.uid).get().then(doc => {
            var sub_due_date = doc.data().due_date
            if (moment().isBefore(sub_due_date)) {
                var active_sub = true
            }else{
                var active_sub = false
            }
            this.setState({sub_due_date, active_sub, spinner: false})
        }).catch(err => {
            Toast.show({
                text: 'Please try again' + err.message,
                type: 'danger'
            })
        } )

        TrackPlayer.setupPlayer().then(async () => {
            //Add the book to queue
            await TrackPlayer.add({
                id:'1',
                url: this.state.active_sub?this.state.book.audio_file: this.state.book.preview_file,
                title: this.state.book.name,
                artist: this.state.book.voiced_by,
                artwork: this.state.book.image
            });
        })
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
                                    <Header text='Preview' navigation={this.props.navigation} subView={true} dark={true} style={{backgroundColor: '#2228'}}/>
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
                                                    <Progress.Pie indeterminate size={60} color={platform.brandPrimary}/>
                                                </Col>
                                            )
                                        }
                                        <ProgressSlider/>
                                    </View>
                                </ImageBackground>
                            {/* </MagicMove.View> */}
                        </Row>
                        <Row style={styles.infoRow}>
                            <Col>
                                <SubRow text={this.state.book.author} iconType='Entypo' iconName='pencil'/>
                                <SubRow subText={this.state.book.name} iconType='Entypo' iconName='open-book'/>
                                <SubRow subText={this.state.book.info} iconType='AntDesign' iconName='infocirlceo'/>
                                <SubRow subText={this.state.book.genre} iconType='FontAwesome5' iconName='theater-masks'/>
                                <SubRow subText={this.state.book.time + "minutes"} iconType='Entypo' iconName='time-slot'/>
                                <SubRow subText={this.state.book.language} iconType='Entypo' iconName='language'/>
                                <SubRow subText={this.state.book.voiced_by} iconType='Entypo' iconName='mic'/>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Button success full large iconLeft>
                                    <Icon type='AntDesign' name='playcircleo'/> 
                                    <NBText>
                                        Listen
                                    </NBText>
                                </Button>
                            </Col>
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
