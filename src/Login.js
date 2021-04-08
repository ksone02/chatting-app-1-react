import { Button } from "@material-ui/core";
import React from "react";
import { auth, provider } from "./firebase";
import "./Login.css";
import { actionTypes } from "./reducer";
import { useStateValue } from "./StateProvider";

function Login() {
    const [{}, dispatch] = useStateValue();

    const signIn = () => {
        auth
            .signInWithPopup(provider)
            .then((result) => {
                dispatch({
                    type: actionTypes.SET_USER,
                    user: result.user,
                });
            })
            .catch((error) => alert(error.message));
    };

    return (
        /* jshint ignore:start */
        <div className="login">
            <div className="login_container">
                <img
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/WhatsApp.svg/330px-WhatsApp.svg.png"
                    alt=""
                />
                <div className="login_text">
                    <h1>Sign in to WatsApp</h1>
                </div>

                <Button type="submit" onClick={signIn}>
                    Sign In With Google
                </Button>
            </div>
        </div>
        /* jshint ignore:end */
    );
}

export default Login;
