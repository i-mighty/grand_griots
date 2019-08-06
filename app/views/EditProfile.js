import React, { Component } from 'react';
import { View, ImageBackground, Text, TouchableOpacity } from 'react-native';
import { Grid, Row, Content, Col, Icon, Button, Text as NBText, StyleProvider, Thumbnail, Container, Toast } from 'native-base';
import * as MagicMove from 'react-native-magic-move';
import styles from '../styles/style';
import platform from '../native-base-theme/variables/platform';
import getTheme from '../native-base-theme/components';
import * as Progress from 'react-native-progress';
import Header from './Header';
import SubRow from './SubRow';
import SubRowInput from './SubRowInput';
import Axios from 'axios';
import Spinner from 'react-native-loading-spinner-overlay';
import firebase from 'react-native-firebase';
import ImagePicker from 'react-native-image-picker';
import { material, iOSColors, materialColors } from 'react-native-typography';

const user = firebase.auth().currentUser;
const st = firebase.storage();
const options = {
  title: 'Select Image',
  storageOptions: {
    skipBackup: true,
    path: 'images'
  }
};
class EditProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            quote:'',
            progress: 0.5,
            name: '',
            imageUri: '',
            imageLink: '',
            imageSource: {uri: user.photURL},
            spinner: false
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
                                            <TouchableOpacity style={styles.imgBackground} >
                                                <View style = {
                                                    [{
                                                        backgroundColor: '#222A',
                                                        alignItems: 'center',
                                                        justifyContent: 'center'
                                                    }, styles.imgBackground]
                                                }>
                                                    <TouchableOpacity onPress={() => this.pickImage()}>
                                                        <Thumbnail style={{borderColor: platform.brandPrimary, height: 150, width: 150, borderWidth: 1}} source={this.state.imageSource}/>
                                                    </TouchableOpacity>
                                                </View>
                                            </TouchableOpacity>
                                        
                                    </ImageBackground>
                                </Row>
                                <Row style={styles.infoRow}>
                                    <Col>
                                        <SubRowInput placeholder='Enter your new name' iconType='Entypo' iconName='user' onChangeText={(name) => this.setState({name})}/>
                                        {/* <SubRowInput placeholder='Your inspirational quote' iconName='quote'/> */}
                                        {/* <SubRowInput subText='adeolathecrown@gmail.com' iconType='Entypo' iconName='mail'/> */}
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <Button full large onPress={() => this.submit()}>
                                            <NBText>Submit</NBText>
                                        </Button>
                                    </Col>
                                </Row>
                            </Grid>
                        </Content>
                    </StyleProvider>
                    <Spinner
                        visible={this.state.spinner}
                        textContent={'Loading...'}
                        textStyle={material.body2White}
                    />
                </Container>
            // {/* </MagicMove.Scene> */}
        );
    }

    pickImage = () => {
        ImagePicker.showImagePicker(options, response => {
        if (response.didCancel) {
            alert('You cancelled image picker 😟');
        } else if (response.error) {
            alert('And error occured: ', response.error);
        } else {
            const source = { uri: response.uri };
            this.setState({
                imageSource: source,
                imageUri: response.uri
            });
        }
        });
    };


    submit(){
        this.setState({spinner: true})
        const {name, imageLink} = this.state;
        const ext = this.state.imageUri.split('.').pop(); // Extract image extension
        const filename = user.uid+ext; // Generate unique name
        st.ref('users/'+filename).putFile(this.state.imageUri).then(val => {
            this.setState({imageLink: val.downloadURL})
            user.updateProfile({displayName: name, photoURL: imageLink}).then(() => {
                this.setState({spinner: false});
                Toast.show({
                    text: 'Updated successfully',
                })
            }).catch(() =>{
                Toast.show({
                    text: 'Could not update your profile',
                    type: 'danger'
                })
            })
        }).catch(err =>{
            Toast.show({
                text: 'Could not update your image\n'+err.message,
                type: 'danger'
            })
        })
    }
}

export default EditProfile;
