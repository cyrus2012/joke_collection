function SignUp(){
    return(
        <>
            <h1>Sign Up</h1>
            <form>
                <label htmlFor='username'>username</label><br/>
                <input type='text' id='username'></input><br/>
                <label htmlFor='password'>password</label><br/>
                <input type='password' id='password'></input><br/>
                <button type='submit'>submit</button>
            </form>
        </>
    );
}

export default SignUp;