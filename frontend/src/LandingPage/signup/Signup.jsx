import { handleBreakpoints } from '@mui/system';
import React, { useState } from 'react';
import { use } from 'react';
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
function Signup() {
    const [formData, setFormData] = useState({
        username: "",
        email: "",
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
        console.log("submit");
        if (!formData.username || !formData.password || !formData.email) {
            setError("All fields are required");
            return;
        }

        try {
            const response = await axios.post('http://localhost:3000/create', formData, { withCredentials: true });
            if (response.data.success) {
                  navigate('/');
            }
        }
        catch (err) {
            setError(err.response?.data?.message || "Something went wrong. Please try again.");
        }
    }

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
                    <div className='col-4 rounded' style={{ backgroundColor: "#e2d1ddff" }} >
                        <h2 className="pt-3">Signup now</h2>
                        <p className="text-muted  mx-2 ">Or track your existing application</p>
                        {error && <p style={{ color: "red" }}>{error}</p>}
                        <form onSubmit={handleSubmit} className="needs-validation" noValidate >
                            <div className="mt-2">
                                <label for="username" class="form-label  px-2">username:</label>
                                <input
                                    name="username"
                                    type="text"
                                    placeholder="enter username"
                                    id="username"
                                    className="inputs  form-control-sm"
                                    required
                                    onChange={handleChange}
                                    value={formData.username}
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
                                    onChange={handleChange}
                                    value={formData.email}
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
                                    onChange={handleChange}
                                    value={formData.password}
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