import React, { useEffect, useState } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import { useAuth0 } from "../contexts/auth0-context";
import { ApplicationState } from "../store";
import { fetchRequest } from "../store/posts/actions";
import { IPost } from "../type";
import * as postsActions from '../store/posts/actions'

interface PropsFromState {
    loading: boolean
    data: IPost[]
    errors?: string
}
  
interface PropsFromDispatch {
    fetchRequest: typeof fetchRequest
}

type AllProps = PropsFromState & PropsFromDispatch

const mapStateToProps = ({ posts }: ApplicationState) => ({
    loading: posts.loading,
    errors: posts.errors,
    data: posts.posts
  })

const Home: React.FC<AllProps> = () => {
    const { posts } = useSelector((state: ApplicationState) => state.posts)
    const dispatch = useDispatch()
    const setPosts = () => dispatch(postsActions.fetchRequest)

    let history = useHistory();
    const { isAuthenticated, getIdTokenClaims, user} = useAuth0();
    const [postsState, setPostsState] = useState<any>();

    const deletePost = async(e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
        e.preventDefault();
        const accessToken = await getIdTokenClaims();
        await fetch(`${process.env.REACT_APP_SERVER_BASE_URL}/blog/delete?postID=${id}`, {
            method: "delete",
            headers: new Headers({
                "Content-Type": "application/json",
                Accept: "application/json",
                "authorization": `Bearer ${accessToken.__raw}`
            })
        });
        _removePostFromView(id);
        history.push('/');
    }

    const _removePostFromView = (id: string) => {
        const index = posts.findIndex((post: {_id: string}) => post._id === id);
        posts.splice(index, 1);
    }

    useEffect(() => {
        const fetchPosts = async(): Promise<any> => {
            const response = await fetch(`${process.env.REACT_APP_SERVER_BASE_URL}/blog/posts`);
            const json = await response.json();
            
            setPostsState(json.reverse());
        }
        fetchPosts();
    }, []);

    return (
        <section className="blog-area section">            
            <div className="container">
                <div className="card">                    
                    <div className="card-body">
                        {posts && posts.map((post: {title: string; _id: any; author: string; description: string, date_posted: string;}) => (
                            <div className="card width: 18rem;" key={post._id}>
                                <img className="card-img-top" src={`https://images.unsplash.com/photo-1488190211105-8b0e65b80b4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1100&q=80`} alt="Card image cap" />
                                <div className="single-post post-style-1">
                                    <Link to={`/post/${post._id}`}>
                                        <div className="card-img-top">
                                            <p className="top">{post.date_posted}</p>                                        
                                        </div>                                       
                                        <div className="blog-info">
                                            <h3>
                                                <span>
                                                    <b>{post.title}</b>
                                                </span>
                                            </h3>
                                            <h4>
                                                <span>
                                                    <p className="card-text">{post.description}</p>
                                                </span>
                                            </h4>
                                        </div>
                                    </Link>
                                    <div className="card-body border-Top"> 
                                        { isAuthenticated && (user.name === post.author) &&
                                            <Link to={`/edit/${post._id}`} className="card-link">Изменить</Link> }
                                        { isAuthenticated && (user.name === post.author) &&
                                            <a href="" className="card-link" onClick={(e) => deletePost(e, post._id)}>Удалить</a> }   
                                    </div>
                                </div>  
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
export default connect(mapStateToProps)(Home)