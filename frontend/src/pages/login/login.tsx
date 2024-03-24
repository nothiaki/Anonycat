import './login.css'

const Login = () => {
    return (
        <div className="container">
            <div className="box-login">
                <form action="" method="post">
                    <input type="text" name="nickname" id="nickname" />
                    <input type="color" name="input-color" id="input-color" />
                    <button type="submit"></button>
                </form>
            </div>
        </div>
    );
}

export default Login;