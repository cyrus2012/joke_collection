import { useState } from "react";
import axiosInstance from "../axiosInstance.js";
import statusCode from "../statusCode.js";
import GeneralPost from "../components/GeneralPost.jsx";
import PageNavigation from "../components/PageNavigation.jsx";

function Home(){

    const [jokes, setJokes] = useState(null);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPage, setTotalPage] = useState(0);

    const DEFAULT_PAGE_SIZE = 5;
 

    /**
     * access server to get jokes according to pageNum and pageSize
     * @param {Number} pageNum positive integer, jokes returned is offset from the most recent jokes by ((page Num - 1) * pageSize))
     * @param {Number} pageSize positive integer, to define max number of jokes return from server.
     */
    async function getJokes(pageNum, pageSize){
        //console.log("before axios");

        try{
            const result = await axiosInstance.get('/jokes', {
                params:{pageNumber: (pageNum <= 0 ? 1: pageNum), pageSize: (pageSize <= 0? DEFAULT_PAGE_SIZE: pageSize)}
            });
            const recipt = result.data; 

            if(recipt.statusCode == statusCode.success){
                if(recipt.data.length == 0){
                    setJokes(<h2>No Jokes in database.</h2>);
                }else{
                    //console.log(recipt.data);
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

    async function getTotalJokesCount(){
        try{
            const result = await axiosInstance.get('/jokescount');
            
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
        const jokesCount = await getTotalJokesCount();
        
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
        getJokes(pageNumber, DEFAULT_PAGE_SIZE);
    }


    if(currentPage === 0){
        setCurrentPage(1);
        setUpTotalPage(DEFAULT_PAGE_SIZE);
        getJokes(currentPage, DEFAULT_PAGE_SIZE);       
    }
  
    

    return (
        <div className="container">
            <div className="mt-2 d-flex justify-content-end">
                <PageNavigation totalPage={totalPage} currentPage={currentPage} onSwitchPage={onSwitchPage}/>
            </div>
            <div>
                {jokes}
            </div>
        </div>
    )

}

export default Home;