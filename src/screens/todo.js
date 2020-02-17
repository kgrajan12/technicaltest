import React, { Component } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { SwipeListView } from 'react-native-swipe-list-view';
import _ from 'lodash/array';
import { ADD, REMOVE, COMPLETE } from '../redux/actions';

class Todo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            todo: '',
            direction: ''
        };
    }

    addToDo = () => {
        const { todo } = this.state;
        if(todo != '') {
            this.props.add({todo, completed: false, key: Date.now() });
            this.setState({ todo: '' });
            alert('To-Do added!');
        } else {
            alert('You should enter To Do');
        }
    }

    complete = (todo) => {
        this.props.complete(todo);
        alert('Your todo completed!');
    }
    remove = (todo) => {
        this.props.remove(todo);
        alert('Your todo is removed!');
    }

    render() {
        const { todo } = this.state;
        const todoData = this.props.todo.map(val => val && val.completed ? undefined : val);
        return (
            <View style={style.container}>
                <View style={style.inputContainer}>
                    <TextInput
                        value={todo}
                        onChangeText={todo => this.setState({ todo })}
                        style={style.input}
                        placeholder='Add your daily To-Do'
                    />
                    <Text style={style.button} onPress={this.addToDo}>ADD</Text>
                </View>
                <SwipeListView
                    data={_.compact(todoData)}
                    renderItem={({ index, item }) => (
                        <View style={style.todoContainer}>
                            <Text>{item.todo}</Text>
                        </View>
                    )}
                    keyExtractor={(val, key) => key.toString()}
                    renderHiddenItem={({ index, item }) => (
                        <View style={style.rowBack}>
                            <Text style={style.complete} onPress={() => this.complete(item.key)}>COMPLETE</Text>
                            <Text style={style.remove} onPress={() => this.remove(item.key)}>REMOVE</Text>
                        </View>
                    )}
                    leftOpenValue={75}
                    rightOpenValue={-75}
                />
            </View>
        );
    }
}

const style = StyleSheet.create({
    container: {
        flex: 1
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    input: {
        flex: 1,
        borderColor: '#1a73e8',
        borderWidth: 1
    },
    button: {
        padding: 16,
        paddingHorizontal: 20,
        elevation: 4,
        backgroundColor: '#1a73e8',
        color: 'white'
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
        textAlignVertical: 'center'
    },
    remove: {
        flex: 1,
        color: 'white',
        textAlign: 'right',
        textAlignVertical: 'center',
        paddingRight: 10
    }
});

const matchStateToProps = ({ todo }) => ({ todo });

const matchDispatchToProps = dispatch => {
    const add = payload => dispatch({ type: ADD, payload });
    const remove = payload => dispatch({ type: REMOVE, payload });
    const complete = payload => dispatch({ type: COMPLETE, payload });
    return { add, remove, complete };
};

export default connect(matchStateToProps, matchDispatchToProps)(Todo);