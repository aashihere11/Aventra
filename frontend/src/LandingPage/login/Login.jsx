import React, { useState } from 'react';
import { Link } from "react-router-dom";
import axios from "axios";
import TextField from '@mui/material/TextField';
import { useNavigate } from 'react-router-dom';
import { useAuth } from "../../context/AuthContext.jsx";

function Login() {
    const { setUser } = useAuth();
    const [formData, setFormData] = useState({
        username: "",
        password: ""
    });

    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setError(null);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!formData.username || !formData.password) {
            setError("Please fill in both username and password");
            return;
        }


        try {
            const response = await axios.post('http://localhost:3000/auth/login', formData, { withCredentials: true });
            if (response.data.success) {
                setUser(response.data.user)
                navigate('/');

            }
        }
        catch (err) {
            setError(err.response?.data?.message || "Something went wrong. Please try again.");
        }
    }
    return (


        <>

            <div className="container text-center mt-5">
                <h2>Trade with confidence. Login for clarity</h2>
                <div className="mt-2 border  d-inline-block " style={{ width: "30%", borderRadius: "10px", backgroundColor: "#e2d1ddff" }}>
                    <h2>Login</h2>
                    {error && <p style={{ color: "red" }}>{error}</p>}
                    <form className="mt-3  needs-validation" noValidate onSubmit={handleSubmit}>


                        <TextField
                            name="username"
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
                            required
                            onChange={handleChange}
                            value={formData.username}
                        />
                        <TextField
                            name="password"
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
                            className='inputs mt-2'
                            required
                            onChange={handleChange} value={formData.password} />
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
