import React, { Component } from 'react';
import { Text } from 'react-native';
import { Row, Col, Icon } from 'native-base';
import styles from '../styles/style';

class SubRow extends Component {
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
                {
                    this.props.text?(
                        <Text style={styles.infoText}>
                            {this.props.text}
                        </Text>
                    ):(<Text style={styles.infoSubText}>
                        {this.props.subText}
                    </Text>)
                }
                </Col>
            </Row>
        )
    }
}

export default SubRow