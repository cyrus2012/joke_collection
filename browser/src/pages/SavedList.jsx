//import axios from "axios";
import axiosInstance from "../axiosInstance.js";
import { useState } from "react";
import statusCode from "../statusCode.js";
import GeneralPost from "../components/GeneralPost.jsx";


function SavedList(){
   const [jokes, setJokes] = useState(null);
    let pageNumber = 1, pageSize = 10;
    
    let jokesList = [];

    function removeBookmarkPost(jokeId){
        console.log("removeBookmarkPost " + jokeId);
        if(jokesList.length > 0){
            jokesList = jokesList.filter( (joke) => joke.props.id != jokeId);
            setJokes(jokesList);
        }
    }


    async function getMyBookMarkedJokes(){
        
        try{
            const result = await axiosInstance.get('/savedjokes', {
                params:{pageNumber: pageNumber, pageSize: pageSize}
            });
            const recipt = result.data; 

            if(recipt.statusCode == statusCode.success){
                if(recipt.data.length == 0){
                    setJokes(<h2>No saved Jokes.</h2>);
                }else{
                    //console.log(recipt);
                    jokesList = recipt.data.map((element) => {
                        const isBookmarked = true;
                        return (
                            <GeneralPost className="mt-3" key={element.id} id={element.id}
                                title={element.title} content={element.content} isBookmarked={isBookmarked}
                                removeBookmarkPost={removeBookmarkPost} />
                        );
                    });

                    setJokes(jokesList);
                }
            }else{
                setJokes(<h2>{recipt.message}</h2>);
            }


        }catch(err){
            console.error(err);
        }

    }

    if(!jokes){
        getMyBookMarkedJokes();
    }

    return (
        <div className="container">
            {jokes}
        </div>
    );
    
}

export default SavedList;