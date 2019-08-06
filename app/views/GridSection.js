import React, { Component } from 'react';
import { Text, Image, StyleSheet, TouchableOpacity, ScrollView, View } from 'react-native';
import { StyleProvider, CardItem, Col, Card, Thumbnail } from 'native-base';
import PropTypes from 'prop-types'
import { FlatGrid } from 'react-native-super-grid';
import platform from '../native-base-theme/variables/platform';
import getTheme from '../native-base-theme/components';
import { material } from 'react-native-typography';

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
    homeCardContentBrief: {
        backgroundColor: '#555',
        padding: 5
    },
});

class GridSection extends Component {
    constructor(props) {
        super(props);
        this.state = {
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
            //         author: 'John Allen',
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
            data: this.props.data
        };
    }

    render() {
        return (
            // <MagicMove.Scene>
                <StyleProvider style={getTheme(platform)}>
                    <ScrollView contentContainerStyle={{justifyContent: 'center', alignItems: 'center'}}>
                        <FlatGrid
                            itemDimension={130}
                            items={this.state.data}
                            style={styles.gridView}
                            // staticDimension={300}
                            // fixed
                            // spacing={20}
                            renderItem={({item, index}) => (
                                <Card>
                                    <CardItem cardBody button onPress={() => this.props.navigation.navigate('Book', {book: item})}>
                                        <Image source={{uri: item.image}} style={{height: 150, width: 120, flex: 1}} resizeMode='stretch'/>
                                    </CardItem>
                                    <CardItem button style={styles.homeCardContentBrief}>
                                        <View >
                                            <Text style={material.body2White} ellipsizeMode='tail' numberOfLines={1}>{item.name}</Text>
                                            <Text style={material.body1White} ellipsizeMode='tail' numberOfLines={1}>{item.author}</Text>
                                        </View>
                                    </CardItem>
                                </Card>
                            )}
                        />
                    </ScrollView>
                </StyleProvider>
            // </MagicMove.Scene>
        );
    }
    _renderItem({item, index}){
        return (
            <Card>
                <CardItem cardBody button onPress={() => this.props.navigation.navigate('Book')}>
                    <Image source={{uri: item.image}} style={{height: 100, width: null, flex: 1}} resizeMode='stretch'/>
                </CardItem>
                <CardItem button>
                    <Col>
                        <Text numberOfLines={1} style={[material.subheading, {marginVertical: 5}]}>{item.name}</Text>
                        <Text numberOfLines={1} style={[material.body1, {marginVertical: 5}]}>{item.author}</Text>
                    </Col>
                </CardItem>
            </Card>
        );
    }

    _renderCat({item}){
        return (
            <TouchableOpacity style={[styles.itemContainer, {backgroundColor: item.code}]} >
                <Thumbnail source={item.icon} large square/>
                <Text style={styles.itemName}>{item.name}</Text>
            </TouchableOpacity>
        )
    }

    navigate(route){
        this.props.navigation.navigate(route)
    }
}

GridSection.propTypes={
    title: PropTypes.string,
    data: PropTypes.array
}



export default GridSection;
