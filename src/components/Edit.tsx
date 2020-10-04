import React, { useState, useEffect } from 'react';
import { useHistory, useParams} from 'react-router-dom';
import { useAuth0 } from '../contexts/auth0-context';

function Edit(): JSX.Element {
    const { getIdTokenClaims } = useAuth0();
    let history = useHistory();
    let { postId } = useParams();

    interface IValues {
        [key: string]: any;
    }

    const [post, setPost] = useState();
    const [values, setValues] = useState<IValues>([]);
    const [submitSuccess, setSubmitSuccess] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        const fetchData = async (): Promise<void> => {
            const response = await fetch(`${process.env.REACT_APP_SERVER_BASE_URL}/blog/post/${postId}`);
            const json = await response.json();
            setPost(json)
        }
        fetchData();
    }, [postId]);

    const handleFormSubmission = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();
        setLoading(true);
        const submitSuccess: boolean = await submitForm();
        setSubmitSuccess(submitSuccess);
        setLoading(false);
        setTimeout(() => {
            history.push('/');
        }, 1500);
    }

    const submitForm = async(): Promise<boolean> => {
        try {
            const accessToken = await getIdTokenClaims();
            const response = await fetch(`${process.env.REACT_APP_SERVER_BASE_URL}/blog/edit?postID=${postID}`, {
                method: "put",
                headers: new Headers({
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    "authorization": `Bearer ${accessToken.__raw}`
                }),
                body: JSON.stringify(values)
            });

            return response.ok;
        } catch(ex) {
            return false;
        }
    }

    const setFormValues = (formValues: IValues) => {
        setValues({...values, ...formValues})
    }

    const handleInputChanges = (e: React.FormEvent<HTMLFormElement>) => {
        setFormValues({[e.currentTarget.id]: e.currentTarget.value})
    }

    return (

    );
}

export default Edit;