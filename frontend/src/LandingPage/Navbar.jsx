import React from "react";
import { Link } from "react-router-dom";
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import PersonAddAltRoundedIcon from '@mui/icons-material/PersonAddAltRounded';
import DashboardIcon from '@mui/icons-material/Dashboard';
import HelpOutlineRoundedIcon from '@mui/icons-material/HelpOutlineRounded';
import AttachMoneySharpIcon from '@mui/icons-material/AttachMoneySharp';
import CrueltyFreeSharpIcon from '@mui/icons-material/CrueltyFreeSharp';
import { useAuth } from "../context/AuthContext";
import axios from 'axios';


function Navbar() {
    const { user, loading } = useAuth();

    const handleLogout = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('https://aventra-9a7b.onrender.com/auth/logout', {}, { withCredentials: true })

            if (response?.data?.success) {
                window.location.href = "https://aventra-9a7b.onrender.com/";
            }
        }
        catch (error) {
            console.log(error);
        }

    }

    return (
        <nav
            class="navbar navbar-expand-lg border-bottom"
            style={{ backgroundColor: "rgb(172, 144, 163)" }}
        >
            <div class="container p-2">
                <Link to="/"
                    class="navbar-brand" href="#">
                    <img
                        src="media/logo1.png"
                        style={{ width: "20%" }}
                        alt="Logo"
                    />
                </Link >
                <button
                    class="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <form class="d-flex" role="search">
                        <ul class="navbar-nav mb-lg-0">
                            {!loading && (
                                <>
                                    {user ? (<>
                                        <li class="nav-item">
                                            <a href="#t" className="nav-link" onClick={handleLogout}>
                                                Logout<LogoutIcon /></a>
                                        </li>
                                        <li class="nav-item">
                                            <a href="https://aventra-1-780v.onrender.com/dashboard" className="nav-link">
                                                Dashboard<DashboardIcon /></a>

                                        </li>

                                    </>) :
                                        (<>
                                            <li class="nav-item">
                                                <Link to="/login" class="nav-link active" >
                                                    login <LoginIcon />
                                                </Link >
                                            </li>
                                            <li class="nav-item">
                                                <Link to="/signup" class="nav-link active" aria-current="page" >
                                                    Signup <PersonAddAltRoundedIcon />
                                                </Link >
                                            </li>
                                        </>)}
                                </>)}


                            <li class="nav-item">
                                <Link to="/about" class="nav-link active" >
                                    About <CrueltyFreeSharpIcon />
                                </Link >
                            </li>
                           
                            <li class="nav-item">
                                <Link to="/pricing" class="nav-link active" >
                                    Pricing <AttachMoneySharpIcon />
                                </Link >
                            </li>
                            <li class="nav-item">
                                <Link to="/support" class="nav-link active" >
                                    Support <HelpOutlineRoundedIcon />
                                </Link >
                            </li>
                        </ul>
                    </form>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;