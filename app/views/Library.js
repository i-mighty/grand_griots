import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Content, StyleProvider, Row, Grid, Col } from 'native-base';
import platform from '../native-base-theme/variables/platform';
import getTheme from '../native-base-theme/components';
import styles from '../styles/style';
import BookCard from './BookCard';
import Header from './Header'
import { material, systemWeights } from 'react-native-typography';
import * as Progress from 'react-native-progress';
import ScrollSection from './ScrollSection';

class Library extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentBook: {
                name: 'Half of a yellow sun',
                author: 'Chimamanda Ngozi Adichie',
                image: 'https://images-eu.ssl-images-amazon.com/images/I/61CkmZkUXhL.jpg'
            },
        };
    }

    render() {
        return (
            <StyleProvider style={getTheme(platform)}>
                <Content>
                    <Grid>
                        <Header text='My Library' navigation={this.props.navigation} />
                        <Row style={styles.libContainer}>
                            <Grid>
                                <Row>
                                    <Col style={{width: null}}>
                                        <BookCard item={this.state.currentBook} index={0} big={true} imageOnly={true} navigation={this.props.navigation}/>
                                    </Col>
                                    <Col style={{justifyContent: 'center'}}>
                                        <Text style={[material.title, subStyles.infoText]}>
                                            Half of a yellow sun
                                        </Text>
                                        <Text style={[{...material.subheading, ...systemWeights.light}, subStyles.infoText]}>
                                            Chimamanda Ngozi Adichie
                                        </Text>
                                        <Col style={[subStyles.infoText]}>
                                            <Text style={[material.body2, subStyles.progItem]}>0:34:50/1:50:00</Text>
                                            <Progress.Bar progress={0.4} color={platform.brandPrimary} style={subStyles.progItem}/>
                                            <Text style={[material.body1, subStyles.progItem]}>40% completed</Text>
                                        </Col>
                                    </Col>
                                </Row>
                            </Grid>
                        </Row>
                        <ScrollSection title='Saved books' navigation={this.props.navigation}/>
                        <ScrollSection title='Suggestions' navigation={this.props.navigation}/>
                    </Grid>
                </Content>
            </StyleProvider>
        );
    }
}

const subStyles = {
    infoText: {
        marginVertical: 5,
    },
    progItem:{
        marginVertical: 2
    }
}

export default Library;
