import React from 'react';
import {Link} from "react-router-dom";
function Signup() {
    return (
        <>
            <h2 className='mt-5 text-center'>Open a free demat and trading account online</h2>
            <p className="text-muted text-center">Start investing brokerage free and join a community of 1.6+ crore investors and traders</p>


            <div className='container'>
                <div className='row'>
                    <div className='col-6'>
                        <img src="media/signup.png" alt="signup" />
                    </div>
                    <div className='col-2'></div>
                    <div className='col-4 rounded' style={{backgroundColor:"#e2d1ddff"}} >
                        <h2 className="pt-3">Signup now</h2>
                        <p className="text-muted  mx-2 ">Or track your existing application</p>

                        <form >
                            <div className="mt-2">
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
                                <label for="email" className="form-label px-3">email:</label>
                                <input
                                    name="email"
                                    type="email "
                                    placeholder="enter email"
                                    id="email"
                                    className="inputs mx-3 form-control-sm"
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
                          
                            <button type="submit" className="signin-button mt-3">sign up</button>
                             
                            <div className="login-link mt-2  text-center">
                                Already have an account? <Link to="/login">Login</Link>
                            </div>
                        </form>

                    </div>
                </div>
            </div>

        </>
    );
}

export default Signup;