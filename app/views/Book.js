import React, { Component } from 'react';
import { View, ImageBackground } from 'react-native';
import { Grid, Row, Content, Col, Icon, Button, Text as NBText, StyleProvider } from 'native-base';
import * as Progress from 'react-native-progress';
import styles from '../styles/style';
import * as MagicMove from 'react-native-magic-move';
import platform from '../native-base-theme/variables/platform';
import getTheme from '../native-base-theme/components';
import SubRow from './SubRow';
import Header from './Header';

class Book extends Component {
    constructor(props) {
        super(props);
        this.state = {
            play: true,
            playing: false,
            loading: false
        };
    }

    render() {
        return (
            <StyleProvider style={getTheme(platform)}>
                <Content>
                    <Grid>
                        <Row>
                            {/* <MagicMove.View id='image'> */}
                                <ImageBackground
                                    source={{uri: 'https://images-eu.ssl-images-amazon.com/images/I/61CkmZkUXhL.jpg'}}
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
                                                        <Button full transparent >
                                                            <Icon name='rewind'/>
                                                        </Button>
                                                    </Col>
                                                    <Col style={styles.AudioButtonCont}>
                                                        <Button full transparent >
                                                            <Icon name={!this.state.playing?'playcircleo':'pause'} type='AntDesign' style={{fontSize: 45}}/>
                                                        </Button>
                                                    </Col>
                                                    <Col style={styles.AudioButtonCont}>
                                                        <Button full transparent >
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
                                    </View>
                                </ImageBackground>
                            {/* </MagicMove.View> */}
                        </Row>
                        <Row style={styles.infoRow}>
                            <Col>
                                <SubRow text='Chimamanda Ngozi Adichie' iconType='Entypo' iconName='pencil'/>
                                <SubRow subText='Half of a yellow sun' iconType='Entypo' iconName='open-book'/>
                                <SubRow subText='1 hour 50 minutes' iconType='Entypo' iconName='time-slot'/>
                                <SubRow subText='2019' iconType='AntDesign' iconName='calendar'/>
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
                                <Button full large iconLeft>
                                    <Icon type='AntDesign' name='plus'/> 
                                    <NBText>
                                        Save
                                    </NBText>
                                </Button>
                            </Col>
                        </Row>
                    </Grid>
                </Content>
            </StyleProvider>
        );
    }
}

export default Book;
