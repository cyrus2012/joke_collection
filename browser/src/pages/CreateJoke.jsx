import { useState, } from "react";
import { useNavigate } from 'react-router-dom';
import axiosInstance from "../axiosInstance.js";

function CreateJoke(){

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    function onTitleChange(event){
        setTitle(event.target.value);
    }

    function onContentChange(event){
        setContent(event.target.value);
    }


    async function submitNewJoke(event){
        event.preventDefault();
        event.target.disabled = true;

        if(title == ""){
            event.target.disabled = false;
            setError("title cannot be empty.");
            return;
        }

        if(content == ""){
            event.target.disabled = false;
            setError("content cannot be empty.");
            return;
        }

        try{
            const result = await axiosInstance.post("/create", {title: title, content: content});
            setTitle("");
            setContent("");
            setError(null);

            if(result.data.status.code == 200){ 
                navigate("/myjokes");

            }else{
                event.target.disabled = false;
                setError(result.data.status.message);
            }

        }catch(err){
            event.target.disabled = false;
            setError(result.data.status.message);
        }
    }

    return(
        <div>
            <form className="p-3 mx-auto">
                <h1 className="text-center">Create a Joke</h1>
                <label htmlFor="title">Title:</label><br />
                <input type='text' size="80" className="mw-100" id='title' autoFocus value={title} onChange={onTitleChange}></input><br/>
                <label htmlFor="content" className="mt-3">Content:</label><br />
                <textarea rows="10" cols="80" className="mw-100" id='content' value={content} onChange={onContentChange}></textarea><br/>
                <button type='submit' className="mt-4 btn btn-primary" onClick={submitNewJoke}>submit</button>
                {error && <p className="mt-3 loginError">{error}</p>}
            </form>

        </div>
    )
}

export default CreateJoke;