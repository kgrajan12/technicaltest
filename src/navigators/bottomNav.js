import React, { Component } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Todo from '../screens/todo';
import CompletedTodo from '../screens/completedTodo';
import TabBar from '../components/tabBar';

export default class BottomNavigator extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        const Tab = createBottomTabNavigator();
        return (
            <Tab.Navigator tabBar={props => <TabBar {...props} />}>
                <Tab.Screen name="ToDo" component={Todo} />
                <Tab.Screen name="Completed ToDo" component={CompletedTodo} />
            </Tab.Navigator>
        );
    }
}
