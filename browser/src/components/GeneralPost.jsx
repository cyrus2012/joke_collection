import { useContext, useState, useEffect } from "react";
import JokeArticle from "./JokeArticle";
import axiosInstance from "../axiosInstance.js";
import statusCode from "../statusCode";
import UserContext from "../context/UserContext.jsx";

function GeneralPost(props){

    const currentUser = useContext(UserContext);

    //let isBookmared = currentUser? props.isBookmarked : false;
    const [isBookmared, setIsBookmarked] = useState(currentUser? props.isBookmarked : false);


    useEffect(() => {
        setIsBookmarked(currentUser? props.isBookmarked : false);
    }, [currentUser]);


    async function toggleBookmark(event){
        event.preventDefault();
        
        const icon = event.target;
        icon.setAttribute("disabled", "disabled");             

        try{
            let result;
            if(isBookmared){
                //unbookmark it
                console.log("axios send delete /savedjokes");
                result = await axiosInstance.delete("/savedjokes", {data: { jokeId:props.id }} );

                if(result.data.statusCode == statusCode.success){
                    //icon.classList.add("bi-bookmark");
                    //icon.classList.remove("bi-bookmark-fill");
                    //isBookmared = false;
                    setIsBookmarked(false);
                    if(props.removeBookmarkPost)
                        props.removeBookmarkPost(props.id);
                }else{
                    window.alert(result.data.message);
                }

            }else{
                //bookmark it
                console.log("axios send post /savedjokes");
                result = await axiosInstance.post("/savedjokes", { jokeId:props.id });
                
                if(result.data.statusCode == statusCode.success){
                    //icon.classList.add("bi-bookmark-fill");
                    //icon.classList.remove("bi-bookmark");
                    //isBookmared = true;
                    setIsBookmarked(true);
                 }else{
                    window.alert(result.data.message);
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
            
                <i className={"align-self-start bookmarkIcon bi " + (isBookmared?"bi-bookmark-fill" :"bi-bookmark")}
                    onClick={toggleBookmark} ></i>
        </div>
    )
}


export default GeneralPost;