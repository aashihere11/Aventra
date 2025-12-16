import React from 'react';
import { Link } from "react-router-dom";
function Login() {
    return (
        <>


            <div className="container text-center mt-5">
                <h2>Trade with confidence. Login for clarity</h2>
                <div className="mt-2 border  d-inline-block " style={{ width: "30%", borderRadius: "10px", backgroundColor: "#e2d1ddff" }}>
                    <h2>Login</h2>
                    <form className="mt-3  needs-validation" novalidate>
                        <div className="mt-3">
                            <label for="username" class="form-label  px-2">username:</label>
                            <input
                                name="username"
                                type="text"
                                placeholder="enter username"
                                id="username"
                                className="inputs  form-control-sm"
                                required
                            />
                            
                        </div>

                        <div className="mt-2">
                            <label for="password" class="form-label px-2">password:</label>
                            <input
                                name="password"
                                type="password"
                                placeholder="enter password"
                                id="password"
                                className="inputs form-control-sm"
                                required
                            />
                        </div>
                        <button type="submit" className="login-button mt-3 ">login</button>

                        <div className="login-link m-3 px-5">
                            don't have an account? <Link to="/signup">signup</Link>
                        </div>
                    </form>
                   
                </div>
            </div>
        </>
    );
}

export default Login;
