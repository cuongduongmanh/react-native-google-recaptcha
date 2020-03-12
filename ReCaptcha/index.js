import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    View, StyleSheet, Dimensions
} from 'react-native';
import Modal from 'react-native-modal';
import GoogleReCaptcha from './GoogleReCaptcha';

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
    modal: { margin: 0, marginTop: 100 },
    wrapper: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
        justifyContent: 'center',
        overflow: 'hidden'
    }
});

class ConfirmGoogleCaptcha extends Component {
    state = {
        show: false
    };

    show = () => {
    this.setState({ show: true });
};

hide = () => {
    this.setState({ show: false });
};

render() {
    const { show } = this.state;
    const {
        siteKey,
        baseUrl,
        languageCode,
        onMessage,
        cancelButtonText
    } = this.props;

    return (
            <Modal
                useNativeDriver
                hideModalContentWhileAnimating
                deviceHeight={height}
                deviceWidth={width}
                style={styles.modal}
                animationIn='fadeIn'
                animationOut='fadeOut'
                isVisible={show}
            >
                <View style={styles.wrapper}>
                <GoogleReCaptcha
                    url={baseUrl}
                    siteKey={siteKey}
                    onMessage={onMessage}
                    languageCode={languageCode}
                    cancelButtonText={cancelButtonText}
                    />
                </View>
            </Modal>
        );
    }
}

ConfirmGoogleCaptcha.propTypes = {
    siteKey: PropTypes.string.isRequired,
    baseUrl: PropTypes.string.isRequired,
    onMessage: PropTypes.func,
    languageCode: PropTypes.string,
    cancelButtonText: PropTypes.string
};

export default ConfirmGoogleCaptcha;
