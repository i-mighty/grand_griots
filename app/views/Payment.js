import React, { Component } from 'react';
import { View, Text } from 'react-native';
import Rave from 'react-native-rave';
import firebase, { auth } from 'react-native-firebase';
import { Toast } from 'native-base';
import moment from 'moment';

// const storage = firebase.storage();
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
    //Check for current subscriptions and and new subscription to it

    onSuccess(data) {
        this.setState({done: true})
        var s = this.state;
        console.log("success", data);
        var val = {
            plan: s.plan,
            price: s.price,
            description: s.description, 
            date_started: moment().format(),
            due_date: moment().add(1, 'M').format()
        };
        fs.collection('subscriptions').doc(user.uid).get().then(doc => {
            //Check if there is an existing sub
            if( doc.exists ){
                last_due = doc.data().due_date;
                if (moment().isBefore(last_due)) {
                    //Add a new month to the last due.
                    var new_due = moment(last_due).add(1, this.state.plan);
                }else{
                    var new_due = moment().add(1, this.state.plan);
                }
            }else{
                var new_due = moment().add(1, this.state.plan);
            }

            val.due_date = new_due.format()

            fs.collection('subscriptions').doc(user.uid).set(val).then(res => {
                Toast.show({
                    text: 'Your subscription was successful',
                    type: 'success',
                    duration: 3000,
                    onClose: (reason) => {
                        this.props.navigation.navigate('Home')
                    }
                })
            }).catch(err => {
                Toast.show({
                    text: 'Could not process the payment',
                    type: 'danger',
                    duration: 3000,
                    onClose: (reason) => {
                        this.props.navigation.navigate('Profile')
                    }
                })
            })

        })
        // You can get the transaction reference from successful transaction charge response returned and handle your transaction verification here
    }

    onFailure(data) {
        Toast.show({
            text: 'Could not process the payment',
            type: 'danger',
            duration: 3000,
            onClose: (reason) => {
                this.props.navigation.navigate('Profile');
            }
        })
    }

    onClose() {
        //navigate to the desired screen on rave close
        if(this.state.done){
            this.props.navigation.navigate('Profile');
        }else{
            this.props.navigation.navigate('Profile');
        }
    }

    render() {
        return (
            <Rave 
                amount={10}
                country="NG" 
                currency="NGN" 
                email={user.email}
                firstname={user.displayName} 
                lastname={user.displayName} 
                publickey="FLWPUBK-8a76893d079eaff92889b15347c8563d-X"
                encryptionkey="6d3fb9c86968371f06d1ffbc"
                meta={[{ metaname: "description", metavalue: this.state.description }]}
                production={true} 
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