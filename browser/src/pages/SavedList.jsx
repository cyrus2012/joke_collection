//import axios from "axios";
import axiosInstance from "../axiosInstance.js";
import { useState, useRef } from "react";
import statusCode from "../statusCode.js";
import GeneralPost from "../components/GeneralPost.jsx";
import PageNavigation from "../components/PageNavigation.jsx";

function SavedList(){
    const [jokes, setJokes] = useState(null);
    const currentPage = useRef(0);
    const [totalPage, setTotalPage] = useState(0);

    const DEFAULT_PAGE_SIZE = 5;
    
    let jokesList = [];

    async function refreshPage(){
        console.log("refresh page " + currentPage.current);
        const pageTotal = await setUpTotalPage(DEFAULT_PAGE_SIZE);

        if(currentPage.current > pageTotal){ 
            currentPage.current = pageTotal;
            await getMyBookMarkedJokes(pageTotal, DEFAULT_PAGE_SIZE);
        }else
            await getMyBookMarkedJokes(currentPage.current, DEFAULT_PAGE_SIZE);
    }

    async function removedBookmarkPost(){
        await refreshPage();
    }

    async function getMyBookMarkedJokes(pageNumber, pageSize){
        
        try{
            const result = await axiosInstance.get('/savedjokes', {
                params:{pageNumber: (pageNumber <= 0? 1: pageNumber), pageSize: (pageSize <= 0? DEFAULT_PAGE_SIZE: pageSize)}
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
                                removeBookmarkPost={removedBookmarkPost} />
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


    async function getMyBookmarkJokesCount(){
        try{
            const result = await axiosInstance.get('/jokescount', {params:{type: "bookmark"}});
            
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
        const jokesCount = await getMyBookmarkJokesCount();
        
        if(jokesCount < 0)
            return;
        
        const pageCount = Math.ceil(jokesCount / pageSize);
        
        setTotalPage(pageCount);
        return pageCount;
    }


    async function onSwitchPage(pageNumber){
        console.log(`switch to page ${pageNumber}`);
        currentPage.current = pageNumber;
        await getMyBookMarkedJokes(pageNumber, DEFAULT_PAGE_SIZE);
    }

    if(currentPage.current === 0){
        currentPage.current = 1;
        setUpTotalPage(DEFAULT_PAGE_SIZE);
        getMyBookMarkedJokes(currentPage.current, DEFAULT_PAGE_SIZE);
    }

    return (
        <div className="container">
            <div className="mt-2 d-flex justify-content-end">
                <PageNavigation totalPage={totalPage} currentPage={currentPage.current} onSwitchPage={onSwitchPage}/>
            </div>
            {jokes}
        </div>
    );
    
}

export default SavedList;