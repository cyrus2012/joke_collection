//import axios from "axios";
import axiosInstance from "../axiosInstance.js";
import { useState } from "react";

function SavedList(){
    const [posts, setPosts] = useState(null);

    async function getSavedLists(event){
        event.preventDefault();

        const result = await axiosInstance.get("/savedjokes");
        console.log(result);
    }

    return (
        <>
            <h1>This is to show all post saved.</h1>
            <button onClick={getSavedLists}>
                    make api call
            </button>
        </>
    )
}

export default SavedList;