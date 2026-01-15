import JokeArticle from "./JokeArticle";
import axiosInstance from "../axiosInstance.js";
import statusCode from "../statusCode";

function GeneralPost(props){


    async function toggleBookmark(event){
        event.preventDefault();
        
        const icon = event.target;
        icon.setAttribute("disabled", "disabled");        

        const isBookmarked = icon.classList.contains("bi-bookmark")? false : true;
        

        try{
            let result;
            if(isBookmarked){
                //unbookmark it
                console.log("axios send delete /savedjokes");
                result = await axiosInstance.delete("/savedjokes", {data: { jokeId:props.id }} );

                if(result.data.status.code == statusCode.success){
                    icon.classList.add("bi-bookmark");
                    icon.classList.remove("bi-bookmark-fill");
                }else{
                    window.alert(result.data.status.message);
                }

            }else{
                //bookmark it
                console.log("axios send post /savedjokes");
                result = await axiosInstance.post("/savedjokes", { jokeId:props.id });
                
                if(result.data.status.code == statusCode.success){
                    icon.classList.add("bi-bookmark-fill");
                    icon.classList.remove("bi-bookmark");
                 }else{
                    window.alert(result.data.status.message);
                }
            }

        }catch(err){
            window.alert(err);
        }

        icon.removeAttribute("disabled");
    }


    return (
        <div className="d-flex border border-2 border-info border-rounded-2 mt-2 p-2">
            <JokeArticle className="flex-grow-1" id={props.id} title={props.title} content={props.content}/>   
            <i className="bi bi-bookmark bookmarkIcon" onClick={toggleBookmark} ></i>
        </div>
    )
}


export default GeneralPost;