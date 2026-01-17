import { useState } from "react";
import axiosInstance from "../axiosInstance.js";
import statusCode from "../statusCode.js";
import GeneralPost from "../components/GeneralPost.jsx";


function Home(){

    const [jokes, setJokes] = useState(null);
    

    let pageNumber = 1, pageSize = 10;

    async function getAllJokes(){
        //console.log("before axios");
        try{
            const result = await axiosInstance.get('/jokes', {
                params:{pageNumber: pageNumber, pageSize: pageSize}
            });
            const recipt = result.data; 

            if(recipt.statusCode == statusCode.success){
                if(recipt.data.length == 0){
                    setJokes(<h2>No Jokes in database.</h2>);
                }else{
                    //console.log(recipt);
                    const jokesList = recipt.data.map((element) => {
                        const isBookmarked = element.user_id? true : false;
                        return (
                            <GeneralPost className="mt-3" key={element.id} id={element.id}
                                title={element.title} content={element.content} isBookmarked={isBookmarked}/>
                        );
                    });

                    setJokes(jokesList);
                }
            }else{
                setJokes(<h2>{recipt.message}</h2>);
            }


        }catch(err){
            setJokes(<h2>"Network Error. Cannot access server."</h2>);
            console.error(err);
        }
                
    }

/*
    const jokeList = [];
    for(let i = 0; i < 5; i++){
        jokeList.push(<JokePost className="mt-3" title="dsfds" content="gfsdgdsfsdfsd"/>);
    }
*/    



    if(!jokes){
        getAllJokes();
    }
    //apiCall();


    return (
        <div className="container">
            {jokes}
        </div>
    )

}

export default Home;