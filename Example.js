import React from 'react';
import {Button, SafeAreaView, StatusBar} from 'react-native';
import ReCaptcha from './ReCaptcha';
/*
// Create siteKey and add baseUrl form Google Recaptcha
// https://www.google.com/recaptcha
*/
const siteKey = '6LdLlN4UAAAAAGYpJ_1kPrfKA-1N6tjoDGYXWgkg';
const baseUrl = 'http://myUrl.net';

class Example extends React.Component {
    onMessage = (event) => {
        if (event && event.nativeEvent.data) {
            if (['cancel', 'error', 'expired'].includes(event.nativeEvent.data)) {
                this.captchaForm.hide();
            } else {
                const token = event.nativeEvent.data;
                setTimeout(() => {
                    this.captchaForm.hide();
                }, 1500);
            }
        }
    };

    render() {
        return (
            <>
                <StatusBar barStyle="dark-content"/>
                <SafeAreaView>
                    <Button title={'Click me'} onPress={() => {this.captchaForm.show()}} />
                    <ReCaptcha
                        ref={_ref => this.captchaForm = _ref}
                        siteKey={siteKey}
                        baseUrl={baseUrl}
                        languageCode='en'
                        onMessage={this.onMessage}
                    />
                </SafeAreaView>
            </>
        )
    }
}
export default Example;
