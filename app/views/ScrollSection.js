import React, { Component } from 'react';
import { View, Text, Image, ImageBackground, ScrollView } from 'react-native';
import * as MagicMove from 'react-native-magic-move';
import { Container, Header, StyleProvider, Left, Button, Icon, Body, Content, Grid, Row, Card as NBCard, CardItem, Text as NBText, Col } from 'native-base';
import {heightPercentageToDP as hp, widthPercentageToDP as wp} from 'react-native-responsive-screen';
import PropTypes from 'prop-types'
import Carousel from 'react-native-snap-carousel';
import platform from '../native-base-theme/variables/platform';
import getTheme from '../native-base-theme/components';
import styles from '../styles/style'
import BookCard2 from './BookCard2'

class ScrollSection extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: this.props.data
            // data:[
            //     {
            //         name: 'ABC of Gardening',
            //         author: 'Eben Rexford', 
            //         image: 'https://firebasestorage.googleapis.com/v0/b/the-grand-griots.appspot.com/o/sample%2F20190710_185926_0000.png?alt=media&token=0950365c-4f18-486e-b76f-01370d829ab6g'
            //     },
            //     {
            //         name: 'Morning and Evening Thoughts',
            //         author: 'James Allen',
            //         image: 'https://firebasestorage.googleapis.com/v0/b/the-grand-griots.appspot.com/o/sample%2F20190710_191126_0000.png?alt=media&token=f478c71e-b5f4-49d5-9df1-7046944708d5'
            //     },
            //     {
            //         name: 'Eight Pillars of Prosperity',
            //         author: 'James Allen',
            //         image: 'https://firebasestorage.googleapis.com/v0/b/the-grand-griots.appspot.com/o/sample%2F20190710_192735_0000.png?alt=media&token=3ae8d20f-870c-48aa-81e8-3756bb3bcc99'
            //     },
            //     {
            //         name: 'Out From the Heart',
            //         author: 'James Allen',
            //         image: 'https://firebasestorage.googleapis.com/v0/b/the-grand-griots.appspot.com/o/sample%2F20190710_193224_0000.png?alt=media&token=227d7974-e573-435f-8108-ee4305b9b3bc'
            //     },
            //     {
            //         name: 'As a Man Thinketh',
            //         author: 'James Allen',
            //         image: 'https://firebasestorage.googleapis.com/v0/b/the-grand-griots.appspot.com/o/sample%2F20190710_194803_0000.png?alt=media&token=707ee65f-1c74-45bf-b9dc-54b3f90de80d'
            //     },
            //     {
            //         name: 'But Why All This Grammar',
            //         author: 'Mallami Adekunle',
            //         image: 'https://firebasestorage.googleapis.com/v0/b/the-grand-griots.appspot.com/o/sample%2FIMG-8229.JPG?alt=media&token=f1140c8b-46eb-453c-bf45-aea9f7a4061d'
            //     },
            //     {
            //         name: 'In a Kings Quarters',
            //         author: 'Mallami Adekunle',
            //         image: 'https://firebasestorage.googleapis.com/v0/b/the-grand-griots.appspot.com/o/sample%2FIMG_8936.jpeg?alt=media&token=32fb0a47-b52e-43b3-87bc-74bce5af9ac9'
            //     }
            // ],
        };
    }

    render() {
        return (
            // <MagicMove.Scene>
                <StyleProvider style={getTheme(platform)}>
                    <ScrollView>
                        <Grid>
                            <Row>
                                <Text style={styles.headerText}>{this.props.title}</Text>
                            </Row>
                            <Row horizontal style={{margin: 5}}>
                                {
                                    this.state.data.length > 0?(
                                        <Carousel
                                            ref={(c) => { this._carousel = c; }}
                                            data={this.state.data}
                                            renderItem={({item, index}) => this._renderItem({item, index}) }
                                            sliderWidth={wp('98')}
                                            itemWidth={140}
                                            useScrollView={true}
                                            firstItem={1}
                                            inactiveSlideOpacity={1}
                                            inactiveSlideScale={1}
                                        />
                                    ):(
                                        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', height: 100}}>
                                            <View style={{width: '80%', height: '40%', alignItems:'center', justifyContent: 'center'}}>
                                                <Text style={material.title}>No books yet</Text>
                                            </View>
                                        </View>
                                    )
                                }
                            </Row>
                        </Grid>
                    </ScrollView>
                </StyleProvider>
            // </MagicMove.Scene>
        );
    }
    _renderItem({item, index}){
        return (
            <BookCard2 item={item} index={index} navigation={this.props.navigation}/>
        );
    }

    navigate(route){
        this.props.navigation.navigate(route)
    }
}

ScrollSection.propTypes={
    title: PropTypes.string,
    data: PropTypes.array
}

export default ScrollSection;
