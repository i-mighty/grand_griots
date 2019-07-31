import React, { Component } from 'react';
import { View, Text } from 'react-native';
import Rave from 'react-native-rave';
import firebase, { auth } from 'react-native-firebase';
import { Toast } from 'native-base';
import moment = require('moment');

const db = firebase.database();
const storage = firebase.storage();
const fs = firebase.firestore();
const user = firebase.auth().currentUser;

class Payment extends Component {
    constructor(props) {
        super(props);
        this.state = {
            price: this.props.navigation.getParam('price', 1000),
            description: this.props.navigation.getParam('description', 'Subscription for a new monthly.'),
            plan: this.props.navigation.getParam('plan', 'M'),
            done: false,
        };
    }

    onSuccess(data) {
        this.setState({done: true})
        var s = this.state;
        console.log("success", data);
        var val = {
            plan: s.plan,
            price: s.price,
            description: s.description, 
            date_started: moment().format(),
            due_date: moment().add(1, this.state.plan)
        };
        fs.collection('subscriptions').doc(user.uid).set(val).then(res =>{
            Toast.show({
                text: 'Order successful',
                type: 'success',
                duration: 3000,
                onClose: (reason) =>{
                    this.props.navigation.navigate('Home')
                }
            })
        }).catch(err => {
            Toast.show({
                text: 'Could not process the payment',
                type: 'danger',
                duration: 3000,
                onClose: (reason) =>{
                    this.props.navigation.goBack();
                }
            })
        })
        // You can get the transaction reference from successful transaction charge response returned and handle your transaction verification here
    }

    onFailure(data) {
        console.log("error", data);
    }

    onClose() {
        //navigate to the desired screen on rave close
        if(this.state.done){
            this.props.navigation.navigate('Home');
        }else{
            this.props.navigation.goBack();
        }
    }

    render() {
        return (
            <Rave 
                amount={this.state.price}
                country="NG" 
                currency="NGN" 
                email="test@mail.com" 
                firstname="Oluwole" 
                lastname="Adebiyi" 
                publickey="FLWPUBK-**************************-X" 
                encryptionkey="****************"
                meta={[{ metaname: "description", metavalue: this.state.description }]}
                production={false} 
                onSuccess={res => this.onSuccess(res)}
                onFailure={e => this.onFailure(e)}
                onClose={e => this.onClose(e)}
            />
        );
    }
    navigate(route) {
        this.props.navigation.navigate(route);
    }

    navigateNested(navigator, route) {
        this.props.navigation.navigate(navigator, {}, NavigationActions.navigate({
            routeName: route
        }));
    }
}

export default Payment;