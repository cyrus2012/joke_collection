import { useState } from "react";
import axiosInstance from "../axiosInstance.js";
import statusCode from "../statusCode.js";
import MyCreatedPost from "../components/MyCreatedPost.jsx";

function MyJokes(){

    const [jokes, setJokes] = useState(null);
    
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPage, setTotalPage] = useState(0);

    const DEFAULT_PAGE_SIZE = 5;
    let jokesList = [];


    async function getMyJokes(pageNumber, pageSize){
        //console.log("before axios");
        try{
            const result = await axiosInstance.get('/myjokes', {
                params:{pageNumber: (pageNumber <= 0? 1 : pageNumber), pageSize: (pageSize <= 0? DEFAULT_PAGE_SIZE: pageSize)}
            });
            const recipt = result.data; 

            if(recipt.statusCode == statusCode.success){
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
                setJokes(<h2>{recipt.message}</h2>);
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


    async function getTotalCreatedJokesCount(){
        try{
            const result = await axiosInstance.get('/jokescount', {params:{type: "created"}});
            
            if(result.data.statusCode == statusCode.success){
                const totalCount = result.data.data.count;
                return totalCount;

            }else{
                console.log("cannot get total jokes count.");
                return -1;
            }
            
        }catch(err){
            console.error(err);
            return -1;
        }
    }


    async function setUpTotalPage(pageSize){
        const jokesCount = await getTotalCreatedJokesCount();
        
        if(jokesCount < 0)
            return;
        
        const page = Math.ceil(jokesCount / pageSize);
                
        console.log(`total jokes: ${jokesCount}`);
        console.log(`total page: ${page}`);
        setTotalPage(page);
    }


    function onSwitchPage(pageNumber){
        console.log(`switch to page ${pageNumber}`);
        setCurrentPage(pageNumber);
        getMyJokes(pageNumber, DEFAULT_PAGE_SIZE);
    }


    if(currentPage == 0){
        setCurrentPage(1);
        setUpTotalPage(DEFAULT_PAGE_SIZE);
        getMyJokes(currentPage, DEFAULT_PAGE_SIZE);
    }
 
    return (
        <div className="container">
            {jokes}
        </div>
    )

}


export default MyJokes;