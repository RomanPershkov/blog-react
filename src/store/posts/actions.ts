import { action } from 'typesafe-actions'
import { IPost } from '../../type'
import ActionType from './types'

export const fetchRequest = () => action(ActionType.FETCH_REQUEST)
export const fetchSuccess = (data: IPost[]) => action(ActionType.FETCH_SUCCESS, data)
export const fetchError = (message: string) => action(ActionType.FETCH_ERROR, message)

export const editRequest = (data: IPost[]) => action(ActionType.FETCH_REQUEST, data)
export const editSuccess = (data: IPost[]) => action(ActionType.FETCH_SUCCESS, data)
export const editError = (message: string) => action(ActionType.FETCH_ERROR, message)

export const deleteRequest = (postId: string) => action(ActionType.FETCH_REQUEST, postId)
export const deleteSuccess = () => action(ActionType.FETCH_SUCCESS)
export const deleteError = (message: string) => action(ActionType.FETCH_ERROR, message)