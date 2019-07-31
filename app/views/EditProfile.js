import React, { Component } from 'react';
import { View, ImageBackground, Text, TouchableOpacity } from 'react-native';
import { Grid, Row, Content, Col, Icon, Button, Text as NBText, StyleProvider, Thumbnail, Container } from 'native-base';
import * as MagicMove from 'react-native-magic-move';
import styles from '../styles/style';
import platform from '../native-base-theme/variables/platform';
import getTheme from '../native-base-theme/components';
import * as Progress from 'react-native-progress';
import Header from './Header';
import SubRow from './SubRow';
import SubRowInput from './SubRowInput';
import Axios from 'axios';
import { material, iOSColors, materialColors } from 'react-native-typography';

class EditProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            quote:'',
            progress: 0.5
        };
    }

    render() {
        return (
            // <MagicMove.Scene>
                <Container>
                    <StyleProvider style={getTheme(platform)}>
                        <Content>
                            <Grid>
                                <Row>
                                    <ImageBackground
                                        source={{uri: 'https://images-eu.ssl-images-amazon.com/images/I/61CkmZkUXhL.jpg'}}
                                        resizeMode='cover'
                                        style={[styles.imgBackground]}
                                    >
                                        <Header subView={true} transparent={true} style={{backgroundColor: '#222A'}} dark={true} navigation={this.props.navigation}/>
                                            <TouchableOpacity style={styles.imgBackground} onPress={() => alert('logic to change cover picture')}>
                                                <View style = {
                                                    [{
                                                        backgroundColor: '#222A',
                                                        alignItems: 'center',
                                                        justifyContent: 'center'
                                                    }, styles.imgBackground]
                                                }>
                                                    <TouchableOpacity onPress={() => alert('logic to change avatar')}>
                                                        <Thumbnail style={{borderColor: platform.brandPrimary, height: 150, width: 150, borderWidth: 1}} source={{uri: 'https://i.ytimg.com/vi/hrAAEMFAG9E/maxresdefault.jpg'}}/>
                                                    </TouchableOpacity>
                                                </View>
                                            </TouchableOpacity>
                                        
                                    </ImageBackground>
                                </Row>
                                <Row style={styles.infoRow}>
                                    <Col>
                                        <SubRowInput placeholder='Chimamanda Ngozi Adichie' iconType='Entypo' iconName='user'/>
                                        {/* <SubRowInput placeholder='Your inspirational quote' iconName='quote'/> */}
                                        {/* <SubRowInput subText='adeolathecrown@gmail.com' iconType='Entypo' iconName='mail'/> */}
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <Button full large>
                                            <NBText>Submit</NBText>
                                        </Button>
                                    </Col>
                                </Row>
                            </Grid>
                        </Content>
                    </StyleProvider>
                </Container>
            // {/* </MagicMove.Scene> */}
        );
    }
}

export default EditProfile;
