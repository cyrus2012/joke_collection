
function JokeArticle(props){

    return (
        <article className={props.className}>
            <h5>{props.title}</h5>
            <p className="mb-1">{props.content}</p>
        </article>
    )
}



export default JokeArticle;