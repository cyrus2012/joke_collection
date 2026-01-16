import JokeArticle from "./JokeArticle.jsx";
import axiosInstance from "../axiosInstance.js"
import statusCode from "../statusCode.js";

function MyCreatedPost(props){

    async function deletePost(event){
        event.preventDefault();
        
        const icon = event.target;
        icon.setAttribute("disabled", "disabled");

        try{
            let result;
            
            result = await axiosInstance.delete("/joke", {data: { jokeId:props.id }} );

            if(result.data.status.code == statusCode.success){
                props.deleteJoke(props.id);
            }else{
                window.alert(result.data.status.message);
                icon.removeAttribute("disabled");
            }

        }catch(err){
            icon.removeAttribute("disabled");
            window.alert(err);
        }
        
    }

    return (
        <div className="d-flex border border-2 border-info border-rounded-2 mt-2 p-2">
            <JokeArticle className="flex-grow-1" id={props.id} title={props.title} content={props.content}/>   
            
            <button className="align-self-start btn btn-basic trashButton">
                <i className="bi bi-trash3 trashIcon" onClick={deletePost} ></i>
            </button>
            
        </div>
    )
}

export default MyCreatedPost;