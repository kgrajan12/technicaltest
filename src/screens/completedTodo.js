import React, { Component } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { SwipeListView } from 'react-native-swipe-list-view';
import _ from 'lodash/array';
import { UNDOCOMPLETE } from '../redux/actions';

class CompletedTodo extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    undo = (todo) => {
        this.props.undo(todo);
    }

    render() {
        const todoData = this.props.todo.map(val => val && val.completed ? val : undefined);
        return (
            <View style={style.container}>
                <SwipeListView
                    data={_.compact(todoData)}
                    renderItem={({ index, item }) => (
                        <View style={style.todoContainer}>
                            <Text>{item.todo}</Text>
                        </View>
                    )}
                    keyExtractor={(val, key) => key.toString()}
                    renderHiddenItem={ ({ item }) => (
                        <View style={style.rowBack}>
                            <Text style={style.complete} onPress={() => this.undo(item.key)}>UNDO</Text>
                            {/* <Text>Right</Text> */}
                        </View>
                    )}
                    leftOpenValue={75}
                    // rightOpenValue={-75}
                />
            </View>
        );
    }
}

const style = StyleSheet.create({
    container: {
        flex: 1
    },
    todoContainer: {
        padding: 20,
        backgroundColor: 'white',
        borderWidth: .5
    },
    rowBack: {
        backgroundColor: 'red',
        height: '100%',
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    complete: {
        flex: 1,
        backgroundColor: '#34a853',
        color: 'white',
        textAlignVertical: 'center',
        paddingLeft: 15
    },
});

const matchStateToProps = ({ todo }) => ({ todo });

const matchDispatchToProps = dispatch => ({
    undo: payload => dispatch({ type: UNDOCOMPLETE, payload })
});

export default connect(matchStateToProps, matchDispatchToProps)(CompletedTodo);