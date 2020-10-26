import { Reducer } from 'redux';
import { PostState } from '../../type';
import ActionType from './types';

const initialState: PostState = {
    posts: [],
    errors: undefined,
    loading: false
}

const reducer: Reducer<PostState> = (state = initialState, action) =>  {
    switch(action.type) {
        case ActionType.FETCH_REQUEST: {
            return { ...state, loading: true }
        }
        case ActionType.FETCH_SUCCESS: {
            return { ...state, loading: false, data: action.payload }
        }
        case ActionType.FETCH_ERROR: {
            return { ...state, loading: false, errors: action.payload }
        }
        case ActionType.ADD_POST_REQUEST: {
            return { ...state, loading: true, data: action.payload }
        }
        case ActionType.ADD_POST_SUCCESS: {
            return { ...state, loading: false, data: action.payload }
        }
        case ActionType.ADD_POST_ERROR: {
            return { ...state, loading: true, errors: action.payload }
        }
        case ActionType.EDIT_POST_REQUEST: {
            return { ...state, loading: true, data: action.payload }
        }
        case ActionType.EDIT_POST_SUCCESS: {
            return { ...state, loading: false, data: action.payload }
        }
        case ActionType.EDIT_POST_ERROR: {
            return { ...state, loading: false, errors: action.payload }
        }
        default: {
            return state
        }
    }        
}

export { reducer as postsReducer }