import React from 'react';
import { SimpleLineIcons } from '@expo/vector-icons';
import { View, TouchableNativeFeedback, StyleSheet } from 'react-native';

import Colors from '../constants/Colors';

export default function IconButton(props) {
    return (
        <TouchableNativeFeedback 
            background={TouchableNativeFeedback.Ripple(props.rippleColor ? props.rippleColor : '#cacaca', props.buttonType == 'circle')} 
            onPress={() => alert('Settings')} 
        >
            <View style={[
                styles.container, { 
                    height: props.size ? props.size : 36, 
                    width: props.size ? props.size : 36,
                    borderRadius: props.buttonType == 'circle' ? props.size ? props.size/2 : 18 : 5,
                },
                props.buttonColor ? { 
                    backgroundColor: props.buttonColor 
                } : null,
                { ...props.style }
            ]}>
                <SimpleLineIcons
                    name={ props.iconName ? props.iconName : 'settings'}
                    size={ props.size ? props.size - 10 : 26 }
                    //   style={{ marginBottom: -6 }}
                    color={ props.iconColor ? props.iconColor : '#a5a5a5' }
                />
            </View>
        </TouchableNativeFeedback>
    );
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
    }
});