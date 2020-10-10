import React, { useState, useEffect, ChangeEvent } from 'react';
import { withRouter, useHistory } from 'react-router-dom';
import { useAuth0 } from '../../contexts/auth0-context';
import {
    Text,
    SmallText,
} from './styles';
import  {
    Button
} from 'antd';

const Create = (): JSX.Element => {
    let history = useHistory();
    const { user, getIdTokenClaims } = useAuth0();

    interface IValues {
        [key: string]: any;        
    }

    const [author, setAuthor] = useState<string>('');
    const [values, setValues] = useState<IValues>([]);
    const [submitSuccess, setSubmitSuccess] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const [imageRef, setImage] = useState<File | null>(null);
    const [fileInputLabel, setFileInputLabel] = useState<string>("Выберите файл...");

    useEffect(() => {
        if(user) {
            setAuthor(user.name)
        }
    }, [user])

    useEffect(() => {
        console.log('imageRef', imageRef);
    }, [imageRef]);
    
    const handleFormSubmission = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();
        setLoading(true);

        const formData = {
            title: values.title,
            description: values.description,
            body: values.body,
            author: author,
            image: values.image
        }

        const submitSuccess: boolean = await submitForm(formData);
        setSubmitSuccess(submitSuccess);
        setValues({...values, formData});
        setLoading(false);
        setTimeout(() => {
            history.push('/');
        }, 1500)
    }

    const submitForm = async (formData: {}) => {
        try {
            const accessToken = await getIdTokenClaims();
            const response = await fetch(`${process.env.REACT_APP_SERVER_BASE_URL}/blog/post`, {
                method: "post",
                headers: new Headers({
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                    "authorization": `Bearer ${accessToken.__raw}`
                }),
                body: JSON.stringify(formData)
            });
            
            return response.ok;
        } catch (ex) {
            return false;
        }
    }

    const setFormValues = (formValues: IValues) => {
        setValues({...values, ...formValues})
    }

    const handleInputChanges = (e: React.FormEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>) => {
        e.preventDefault();
        setFormValues({ [e.currentTarget.name]: e.currentTarget.value })
    }

    const handleFileInputChanges = (e: FileList | null) =>  {
        if(e === null || e.item(0) === null){
            return;
        }

        const validFileExtensions = [".jpg", ".jpeg", ".bmp", ".gif", ".png"];
        const image: File | null = e.item(0);
        let extValid = false;
        
        for(var i = 0; i < validFileExtensions.length; i++){
            if(image !== null){
                if (image.name.substr(image.name.length - validFileExtensions[i].length, validFileExtensions[i].length).toLowerCase() == validFileExtensions[i].toLowerCase()) {
                    extValid = true;
                    break;
                }
            }
            else { break; }
        }
        if(extValid){
            setImage(e.item(0));
            setFormValues({ ['image']: image });
            
            setFileInputLabel(`${e.item.name}`);
            
            // console.log(e.item(0))
            // console.log(values.image)
            // console.log(imageRef)
        }
    }

    return (
        <div>
            <Text>Hello</Text>
            <SmallText>Hello Small</SmallText>
            <Button size="large" type="primary">Click me!</Button>
            <div className={"col-md-12 form-wrapper"}>
                <h2>Создать пост</h2>
                {!submitSuccess && (
                    <div className="alert alert-info" role="alert">
                        Заполните форму чтобы создать новый пост.
                    </div>
                )}
                {submitSuccess && (
                    <div className="alert alert-info" role="alert">
                        Форма успешно размещена.
                    </div>
                )}
                <form id={"create-post-form"} onSubmit={handleFormSubmission} noValidate={true}>
                    <div className="input-group mb-3 col-md-12">
                    <input type="file" id="image" onChange={ (e) => handleFileInputChanges(e.target.files) } name="image" className="custom-file-input" aria-describedby={fileInputLabel} />
                        <div className="input-group-prepend">
                            <label id="fileInput" className="custom-file-label">{fileInputLabel}</label>
                        </div>
                    </div>
                    <div className="input-group mb-3 col-md-12">
                    <input type="text" id="title" aria-describedby="scr1" onChange={(e) => handleInputChanges(e)} name="title" className="form-control" />
                        <div className="input-group-prepend">
                            <span id="scr1" className="input-group-text">Тема</span>
                        </div>
                    </div>
                    <div className="input-group mb-3 col-md-12">
                    <input type="text" id="description" onChange={(e) => handleInputChanges(e)} name="description" className="form-control" aria-describedby="" />
                        <div className="input-group-prepend">
                            <span className="input-group-text">Описание</span>
                        </div>
                    </div>
                    <div className="input-group mb-3 col-md-12 col-auto">
                    <textarea id="body" placeholder="Содержимое" onChange={(e) => handleInputChanges(e)} name="body" className="form-control" />
                                               
                    </div>                    
                    <div className="input-group mb-3 col-md-4 pull-right">
                        <button className="btn btn-success" type="submit">
                            Опубликовать
                        </button>
                        {loading &&
                            <span className="fa fa-circle-o-notch fa-spin" />
                        }
                    </div>
                </form>
            </div>
        </div>
    );
}

export default withRouter(Create)