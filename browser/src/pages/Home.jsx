import axiosInstance from "../axiosInstance.js";
import JokePost from "../components/JokePost.jsx";

function Home(){

    async function apiCall(){
        //console.log("before axios");
        const result = await axiosInstance.get('/');
        console.log(result);
    }


    const jokeList = [];
    for(let i = 0; i < 5; i++){
        jokeList.push(<JokePost className="mt-3" title="dsfds" content="gfsdgdsfsdfsd"/>);
    }
    


    return (
        <div className="container">
            {jokeList}
        </div>
    )

}

export default Home;