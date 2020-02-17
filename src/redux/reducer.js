import { ADD, REMOVE, COMPLETE, UNDOCOMPLETE } from "./actions";
import { combineReducers } from "redux";
import _ from 'lodash/array';

const initialState = [];

const todo = (state = initialState, action) => {
    switch (action.type) {
        case ADD: return [...state, action.payload];
        case REMOVE: return _.compact(state.map((val, key) => key == action.payload ? undefined : val));
        case COMPLETE: return _.compact(state.map((val, key) => key == action.payload ? { ...val, completed: true } : val));
        case UNDOCOMPLETE: return _.compact(state.map((val, key) => key == action.payload ? { ...val, completed: false } : val));
        default: return state;
    }
}

export default combineReducers({
    todo
});