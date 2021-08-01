import '../css/Auth.css';
import '../css/global.css';
import { useState } from 'react/cjs/react.development';
import { useHistory } from "react-router-dom";

function Auth(props) {
    const adminName = 'admin';
    const adminPassword = 'admin';
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(false);
    let history = useHistory();

    function enableSubmit() {
        return userName.length > 0 && password.length > 0;
    }

    function signIn() {
        if (userName.toString().toLowerCase() === adminName.toString().toLowerCase() && password.toString().toLowerCase() === adminPassword.toString().toLowerCase()) {
            console.log('Login successfully')
            setError(false);
            props.setUser(true);
            history.push('/itemList');
        } else {
            console.log('Login failed')
            setError(true);
            props.setUser(false);
            history.push('/');
        }
    }

    return (
        <div className="loginPage">
            <div className="loginPage-form">
                <h1>Welcome!</h1>
                <div className="loginPage-form-container">
                    <div className="loginPage-form-input">
                        <div>
                            <h6 className="loginPage-form-label">Username</h6>
                            <input className="loginPage-input" type="text" onChange={(e) => {
                                setUserName(e.target.value)
                            }}></input>
                        </div>
                    </div>
                    <div className="loginPage-form-input">
                        <h6 className="loginPage-form-label">Password</h6>
                        <input className="loginPage-input" type="password" onChange={(e) => {
                            setPassword(e.target.value)
                        }}></input>
                    </div>
                    {error ? <div className="loginPage-errMsg-Container"><h1 className="loginPage-errMsg">Incorrect username or password</h1> </div> : <div></div>}
                    <div className="loginPage-form-btn">
                        <button type="button" className="btn btn-primary" disabled={!enableSubmit()} onClick={signIn}>Sign in</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Auth;
