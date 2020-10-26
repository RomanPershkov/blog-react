import { connectRouter, RouterState } from "connected-react-router";
import { combineReducers } from "redux";
import { all, fork } from "redux-saga/effects";
import { PostState } from "../type";
import { postsReducer } from "./posts/reducers";
import postsSaga from "./posts/sagas";
import { History } from 'history'

export interface ApplicationState {
    posts: PostState
    router: RouterState
}

export const createRootReducer = (history: History) => 
    combineReducers({
        posts: postsReducer,
        router: connectRouter(history)
    })

export function* rootSaga() {
    yield all([fork(postsSaga)])
}