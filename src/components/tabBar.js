import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

export default class TabBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        const { state, navigation } = this.props;
        return (
            <View style={{ flexDirection: 'row' }}>
                {state.routes.map((route, index) => {
                    const label = route.name;
                    const isFocused = state.index === index;

                    const onPress = () => {
                        if (!isFocused) {
                            navigation.navigate(label);
                        }
                    };

                    const textStyle = {
                        color: isFocused ? '#1a73e8' : '#222',
                        padding: 20,
                        textAlign: 'center',
                        borderLeftWidth: .5,
                        borderRightWidth: .5,
                        borderColor: isFocused ? '#1a73e8' : 'transparent',
                        backgroundColor: 'white',
                        borderTopWidth: isFocused ? 2 : undefined,
                        elevation: 4
                    };

                    return (
                        <TouchableOpacity
                            key={index}
                            onPress={onPress}
                            style={{ flex: 1 }}
                        >
                            <Text style={textStyle}>
                                {label}
                            </Text>
                        </TouchableOpacity>
                    );
                })}
            </View>
        );
    }
}
