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
            data:[
                {
                    name: 'Half of a yellow sun',
                    author: 'Chimamanda Ngozi Adichie', 
                    image: 'https://images-eu.ssl-images-amazon.com/images/I/61CkmZkUXhL.jpg'
                },
                {
                    name: 'Half of a yellow sun',
                    author: 'Chimamanda Ngozi Adichie',
                    image: 'https://images-eu.ssl-images-amazon.com/images/I/61CkmZkUXhL.jpg'
                },
                {
                    name: 'Half of a yellow sun',
                    author: 'Chimamanda Ngozi Adichie',
                    image: 'https://images-eu.ssl-images-amazon.com/images/I/61CkmZkUXhL.jpg'
                },
                {
                    name: 'Half of a yellow sun',
                    author: 'Chimamanda Ngozi Adichie',
                    image: 'https://images-eu.ssl-images-amazon.com/images/I/61CkmZkUXhL.jpg'
                },
                {
                    name: 'Half of a yellow sun',
                    author: 'Chimamanda Ngozi Adichie',
                    image: 'https://images-eu.ssl-images-amazon.com/images/I/61CkmZkUXhL.jpg'
                }
            ]
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
                                <Carousel
                                    ref={(c) => { this._carousel = c; }}
                                    data={this.state.data}
                                    renderItem={({item, index}) => this._renderItem({item, index}) }
                                    sliderWidth={wp('98')}
                                    itemWidth={125}
                                    useScrollView={true}
                                    firstItem={1}
                                />
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
