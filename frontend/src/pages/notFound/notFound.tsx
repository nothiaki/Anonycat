import { useCallback } from "react";
import { useNavigate } from "react-router-dom";

const NotFound = () => {

    const navigate = useNavigate();

    const goHome = useCallback(() => {
        navigate('/');
    }, [navigate])

    return (
        <div>
            <h1>Ooops...</h1>
            <h3>Return to home page clicking on the button below</h3>
            <button onClick={goHome}>Voltar</button>
        </div>
    );
}

export default NotFound;