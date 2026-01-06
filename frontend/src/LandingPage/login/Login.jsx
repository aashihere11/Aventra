import React from 'react';
import { Link } from "react-router-dom";
import TextField from '@mui/material/TextField';
function Login() {
    return (
        <>


            <div className="container text-center mt-5">
                <h2>Trade with confidence. Login for clarity</h2>
                <div className="mt-2 border  d-inline-block " style={{ width: "30%", borderRadius: "10px", backgroundColor: "#e2d1ddff" }}>
                    <h2>Login</h2>
                    <form className="mt-3  needs-validation" novalidate>


                        <TextField
                            id="outlined-basic"
                            label="username"
                            variant="outlined"
                            sx={{
                                '& .MuiOutlinedInput-root.Mui-focused fieldset': {
                                    borderColor: 'rgb(172, 144, 163)',

                                },
                                '& label.Mui-focused': {
                                    color: 'rgb(172, 144, 163)',
                                },
                            }}
                            className='inputs'
                        />
                        <TextField
                            id="outlined-basic"
                            label="password"
                            variant="outlined"
                            sx={{
                                '& .MuiOutlinedInput-root.Mui-focused fieldset': {
                                    borderColor: 'rgb(172, 144, 163)',

                                },
                                '& label.Mui-focused': {
                                    color: 'rgb(172, 144, 163)',
                                },
                            }}
                            className='inputs mt-2' />
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
