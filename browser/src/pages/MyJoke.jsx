import { useState } from "react";
import axiosInstance from "../axiosInstance.js";
import statusCode from "../statusCode.js";
import MyCreatedPost from "../components/MyCreatedPost.jsx";

function MyJokes(){

    const [jokes, setJokes] = useState(null);
    let pageNumber = 1, pageSize = 10;
    
    let jokesList = [];


    async function getMyJokes(){
        //console.log("before axios");
        try{
            const result = await axiosInstance.get('/myjokes', {
                params:{pageNumber: pageNumber, pageSize: pageSize}
            });
            const recipt = result.data; 

            if(recipt.status.code == statusCode.success){
                if(recipt.data.length == 0){
                    setJokes(<h2>Empty</h2>);
                }else{
                    jokesList = recipt.data.map((element) => {
                        return (<MyCreatedPost className="mt-3" 
                            key={element.id} id={element.id} 
                            title={element.title} content={element.content}
                            deleteJoke={deleteJoke} />);
                    });
                    
                    setJokes(jokesList);
                }
            }else{
                setJokes(<h2>{recipt.status.message}</h2>);
            }


        }catch(err){
            console.error(err);
        }
                
    }

    function deleteJoke(jokeId){
        
        if(jokesList.length > 0){
            jokesList = jokesList.filter( (joke) => joke.props.id != jokeId);
            setJokes(jokesList);
        }

    }


    if(!jokes){
        getMyJokes();
    }
 
    return (
        <div className="container">
            {jokes}
        </div>
    )

}


export default MyJokes;