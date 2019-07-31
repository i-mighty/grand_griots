import React, { Component } from 'react';
import { View, ImageBackground, Text } from 'react-native';
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
import firebase from 'react-native-firebase';
import { ConfirmDialog } from 'react-native-simple-dialogs';

class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            quote:'',
            progress: 0,
            dialogVisible: false
        };
    }

    render() {
        var user = firebase.auth().currentUser;
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
                                            <Header transparent={true} style={{backgroundColor: '#222A'}} dark={true} navigation={this.props.navigation} editUser={true}/>
                                        <View style = {
                                            [{
                                                backgroundColor: '#222A',
                                                alignItems: 'center',
                                                justifyContent: 'center'
                                            }, styles.imgBackground]
                                        }>
                                            <Thumbnail style={{borderWidth: 1, borderColor: platform.brandPrimary, height: 120, width: 120}} large source={{uri: 'https://i.ytimg.com/vi/hrAAEMFAG9E/maxresdefault.jpg'}}/>
                                        </View>
                                    </ImageBackground>
                                </Row>
                                <Row style={styles.infoRow}>
                                    <Col>
                                        <SubRow text={user.displayName} iconType='Entypo' iconName='user'/>
                                        <SubRow subText={user.email} iconType='Entypo' iconName='mail'/>
                                        <SubRow subText='No active subscription' iconType='AntDesign' iconName='creditcard'/>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col style={{justifyContent: 'center', alignItems: 'center', paddingVertical: 20, borderRightColor: platform.brandPrimary, borderRightWidth: 0.5}}>
                                        <Text style={{...material.display1Object, color: platform.brandInfo}}>0</Text>
                                        <Text style={{...material.body1Object, color: platform.brandInfo}}>Books listened to</Text>
                                    </Col>
                                    <Col style={{justifyContent: 'center', alignItems: 'center', paddingVertical: 20}}>
                                        <Progress.Circle size={50} progress={this.state.progress} thickness={3} strokeCap='round' showsText color={platform.brandInfo}
                                            formatText={(progress) => {
                                                return (<Text style={{...material.body1Object, color: platform.brandInfo}}>{100*this.state.progress}%</Text>)
                                            }}
                                        />
                                        <Text style={{...material.body1Object, color: platform.brandInfo}}>Upgrade to premium</Text>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <Button full onPress={() => this.setState({dialogVisible: false})}>
                                            <NBText>Extend your subscription</NBText>
                                        </Button>
                                    </Col>
                                </Row>
                            </Grid>
                        </Content>
                    </StyleProvider>
                    <ConfirmDialog
                        title={"Would you like to continue?"}
                        message={"You would be charged "+ '\u20A6' +"1000 for this subscription"}
                        visible={this.state.dialogVisible}
                        onTouchOutside={() => this.setState({dialogVisible: false})}
                        positiveButton={{
                            title: "YES",
                            onPress: () => this.props.navigation.navigate('Payment', {plan:'M', price: 1000})
                        }}
                        negativeButton={{
                            title: "NO",
                            onPress: () => this.setState({dialogVisible: false})
                        }}
                    />
                </Container>
            // </MagicMove.Scene>
        );
    }
}

export default Profile;
