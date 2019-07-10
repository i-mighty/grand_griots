import React, { Component } from 'react';
import { Text } from 'react-native';
import { Row, Col, Icon, Item, Input } from 'native-base';
import styles from '../styles/style';
import { materialColors } from 'react-native-typography';

class SubRowInput extends Component {
    render() {
        return (
            <Row style={styles.infoSubRow}>
                <Col style={styles.infoRowIcon}>
                    {this.props.iconType? (
                        <Icon type={this.props.iconType} name={this.props.iconName} style={styles.infoIcon}/>
                    ):(
                        <Icon name={this.props.iconName} style={styles.infoIcon}/>
                    )}
                </Col>
                <Col style={styles.infoRowText}>
                    <Item > 
                        <Input placeholder={this.props.placeholder} placeholderTextColor={materialColors.whiteTertiary} style={{color: materialColors.whitePrimary}} autoCapitalize='words' />
                    </Item>
                </Col>
            </Row>
        )
    }
}

export default SubRowInput