import React, { Component } from 'react';
import { View, Text, Image, ImageBackground, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import * as MagicMove from 'react-native-magic-move';
import { Container, StyleProvider, Left, Button, Icon, Body, Content, Grid, Row, Card as NBCard, CardItem, Text as NBText, Col, Card, Thumbnail } from 'native-base';
import {heightPercentageToDP as hp, widthPercentageToDP as wp} from 'react-native-responsive-screen';
import PropTypes from 'prop-types'
import Carousel from 'react-native-snap-carousel';
import { FlatGrid } from 'react-native-super-grid';
import platform from '../native-base-theme/variables/platform';
import getTheme from '../native-base-theme/components';
import BookCard2 from './BookCard2'
import Header from './Header'

const styles = StyleSheet.create({
    gridView: {
        marginTop: 20,
        flex: 1,
    },
    itemContainer: {
        justifyContent: 'flex-end',
        alignItems: 'center',
        borderRadius: 5,
        padding: 10,
        height: 150,
    },
    itemName: {
        fontSize: 16,
        color: '#fff',
        fontWeight: '600',
    },
    itemCode: {
        fontWeight: '600',
        fontSize: 12,
        color: '#fff',
    },
});

class Categories extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cats: [
                { name: 'Non Fiction', link:'non_fiction', code: '#1abc9c', icon: require('../assets/Categories/nonFiction.png') }, { name: 'Fiction', link:'fiction', code: '#2ecc71', icon: require('../assets/Categories/fiction.png') },
                { name: 'Children and teenagers', link:'children', code: '#3498db', icon: require('../assets/Categories/children.png') }, { name: 'Love and marriage', link:'love', code: '#9b59b6', icon: require('../assets/Categories/love.png') },
                { name: 'Self Help', link:'self_help', code: '#34495e', icon: require('../assets/Categories/selfHelp.png') }, { name: 'Free', link:'free', code: '#16a085', icon: require('../assets/Categories/free.png') },
                { name: 'Erotica', link:'erotica', code: '#27ae60', icon: require('../assets/Categories/erotica.png') }, { name: 'Yoruba', link:'yoruba', code: '#2980b9', icon: require('../assets/Categories/yoruba.png') },
                { name: 'Faith Based', link:'faith', code: '#8e44ad', icon: require('../assets/Categories/faith.png') }, { name: 'Business', link:'business', code: '#2c3e50', icon: require('../assets/Categories/business.png') },
                { name: 'Poetry', link:'poetry', code: '#34b', icon: require('../assets/Categories/poetry.png') }
            ]
        };
    }

    render() {
        return (
            // <MagicMove.Scene>
                <StyleProvider style={getTheme(platform)}>
                    <ScrollView style={{backgroundColor: '#444', height: '100%'}}>
                        <Header navigation={this.props.navigation} text='Categories'/>
                        <FlatGrid
                            itemDimension={130}
                            items={this.state.cats}
                            style={styles.gridView}
                            // staticDimension={300}
                            // fixed
                            // spacing={20}
                            renderItem={({item, index}) => (
                                <TouchableOpacity style={[styles.itemContainer, {backgroundColor: item.code}]} onPress={() => this.props.navigation.navigate('Category', {title: item.name, link: item.link})}>
                                    <Thumbnail source={item.icon} large square/>
                                    <Text style={styles.itemName}>{item.name}</Text>
                                </TouchableOpacity>
                            )}
                        />
                    </ScrollView>
                </StyleProvider>
            // </MagicMove.Scene>
        );
    }

    _renderItem({item, index}){
        return (
            <BookCard2 item={item} index={index} navigation={this.props.navigation} />
        );
    }

    _renderCat({item, index}){
        return (
            <TouchableOpacity style={[styles.itemContainer, {backgroundColor: item.code}]} onPress={() => this.props.navigation.navigate('Category')}>
                <Thumbnail source={item.icon} large square/>
                <Text style={styles.itemName}>{item.name}</Text>
            </TouchableOpacity>
        )
    }

    navigate(route){
        this.props.navigation.navigate(route)
    }
}

Categories.propTypes={
    title: PropTypes.string,
    data: PropTypes.array
}

export default Categories;
