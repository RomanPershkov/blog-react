import { ArrayDestructuringAssignment } from "typescript"

interface IPost {
    _id: string,
    author: string,
    title: string,
    description: string,
    date_posted: string
}

type PostState = {
    posts: IPost[],
    loading: boolean,
    errors?: string
}

type PostAction = {
    type: string,
    post: IPost
}

type DispatchType = (args: PostAction) => PostAction;