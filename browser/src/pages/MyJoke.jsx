import { useState } from "react";
import axiosInstance from "../axiosInstance.js";
import JokePost from "../components/JokeArticle.jsx";
import statusCode from "../statusCode.js";

function MyJokes(){

    const [jokes, setJokes] = useState(null);
    let pageNumber = 1, pageSize = 10;

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
                    const jokesList = recipt.data.map((element) => {
                        return <JokePost className="mt-3" key={element.id} title={element.title} content={element.content}/> ;
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