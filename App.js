/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import {
    SafeAreaView,
    StatusBar,
} from 'react-native';
import Example from './Example';

const App = () => (
    <>
        <StatusBar barStyle="dark-content"/>
        <SafeAreaView>
            <Example />
        </SafeAreaView>
    </>
);
export default App;
