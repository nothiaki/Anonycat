import './login.css'

const Login = () => {
    return (
        <div className="container">
            <form action="" method="post">
                <button>Upload a file</button>
                <input type="text" name="nickname" id="nickname" />
                <input type="color" name="input-color" id="input-color" />
                <button type="submit">Join Chat</button>
            </form>
        </div>
    );
}

export default Login;