import axiosInstance from "../axiosInstance.js";


function Home(){

    async function apiCall(){
        //console.log("before axios");
        const result = await axiosInstance.get('/');
        console.log(result);
    }

    return (
        <>
            <h1>Vite + React</h1>
            <div>
                <button onClick={apiCall}>
                make api call
                </button>
                <p>
                Edit <code>src/App.jsx</code> and save to test HMR
                </p>
            </div>
            <p>
                Click on the Vite and React logos to learn more
            </p>
        </>
    )

}

export default Home;