import { ADD, REMOVE, COMPLETE, UNDOCOMPLETE } from "./actions";
import { combineReducers } from "redux";
import _ from 'lodash/array';

const initialState = [];

const todo = (state = initialState, action) => {
    switch (action.type) {
        case ADD: return [...state, action.payload];
        case REMOVE: return _.compact(state.map(val => val.key == action.payload ? undefined : val));
        case COMPLETE: return state.map(val => val.key == action.payload ? { ...val, completed: true } : val);
        case UNDOCOMPLETE: return state.map(val => val.key == action.payload ? { todo: val.todo, completed: false } : val);
        default: return state;
    }
}

export default combineReducers({
    todo
});