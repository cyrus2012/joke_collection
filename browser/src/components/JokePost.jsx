
function JokePost(props){


    return (
        <article className={"border border-2 border-info rounded-4 p-2 " + props.className}>
            <h5>{props.title}</h5>
            <p className="mb-1">{props.content}</p>
        </article>
    )
}



export default JokePost;