import React, { Component } from 'react';
import { View, Text, ImageBackground, Image } from 'react-native';
import { Button, Icon, Row, Card as NBCard, CardItem, Col } from 'native-base';
import styles from '../styles/style'

export default class BookCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        const item = this.props.item;
        const index = this.props.index
        return (
            <NBCard style={this.props.big?styles.homeCardBig:styles.homeCard}>
                <CardItem cardBody button style={styles.homeCardItem} onPress={() => this.props.navigation.navigate('Book')}>
                    {
                        this.props.imageOnly?(
                            <Image
                                source={{uri: item.image}}
                                style={styles.homeCardImage}
                            />
                        ):(
                            <ImageBackground
                                source={{uri: item.image}}
                                style={styles.homeCardBG}
                            >
                                <View style={this.props.big?styles.homeCardContentBig:styles.homeCardContent}>
                                    <Row>
                                        <Col style={styles.homeCardButton}>
                                            <Button transparent small info>
                                                <Icon type='AntDesign' name='playcircleo'/>
                                            </Button>
                                        </Col>
                                        <Col style={styles.homeCardButton}>
                                            <Button transparent small>
                                                <Icon type='AntDesign' name='pluscircleo'/>
                                            </Button>
                                        </Col>
                                    </Row>
                                </View>
                            </ImageBackground>
                        )
                    }
                </CardItem>
                <CardItem cardBody>
                    <View style={[{paddingHorizontal: 5, paddingVertical: 10}, styles.homeCardContentBrief]}>
                        <Text style={styles.homeCardTitle} ellipsizeMode='tail' numberOfLines={1}>{item.name}</Text>
                        <Text style={styles.homeCardSubtitle} ellipsizeMode='tail' numberOfLines={1}>{item.author}</Text>
                    </View>
                </CardItem>
            </NBCard>
        );
    }
}
