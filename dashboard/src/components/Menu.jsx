import React, { useState, useEffect } from "react";
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import LogoutIcon from '@mui/icons-material/Logout';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import { Link } from "react-router-dom";
import axios from 'axios';

const Menu = () => {
    const [selectedMenu, setSelectedMenu] = useState(0);
    const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
    const [user, setUser] = useState("");

    useEffect(() => {

        axios.get('http://localhost:3000/me', { withCredentials: true })
            .then(res => setUser(res.data.user))
            .catch(() => setUser(null))

    }, []);

    const handleLogout = async (e) => {
        e.preventDefault();
        
        try {
            const response = await axios.post('http://localhost:3000/logout', {}, { withCredentials: true })
            
            if (response?.data?.success) {
                window.location.href = "http://localhost:5173/";
            }
        }

        catch (error) {
            console.log(error);
        }

    }
    const handleMenuClick = (index) => {
        setSelectedMenu(index);
    };


    const menuClass = "menu";
    const activeMenuClass = "menu selected";

    return (
        <div className="menu-container ">
            <img src="logo.png.png" style={{ width: "10%" }} />
            <div className="menus ">
                <ul>
                    <li>
                        <Link
                            style={{ textDecoration: "none" }}
                            to="/"
                            onClick={() => handleMenuClick(0)}
                        >
                            <p className={selectedMenu === 0 ? activeMenuClass : menuClass}>
                                Dashboard
                            </p>
                        </Link>
                    </li>
                    <li>
                        <Link
                            style={{ textDecoration: "none" }}
                            to="/orders"
                            onClick={() => handleMenuClick(1)}
                        >
                            <p className={selectedMenu === 1 ? activeMenuClass : menuClass}>
                                Orders
                            </p>
                        </Link>
                    </li>
                    <li>
                        <Link
                            style={{ textDecoration: "none" }}
                            to="/holdings"
                            onClick={() => handleMenuClick(2)}
                        >
                            <p className={selectedMenu === 2 ? activeMenuClass : menuClass}>
                                Holdings
                            </p>
                        </Link>
                    </li>
                    <li>
                        <Link
                            style={{ textDecoration: "none" }}
                            to="/positions"
                            onClick={() => handleMenuClick(3)}
                        >
                            <p className={selectedMenu === 3 ? activeMenuClass : menuClass}>
                                Positions
                            </p>
                        </Link>
                    </li>
                    <li>
                        <Link
                            style={{ textDecoration: "none" }}
                            to="/funds"
                            onClick={() => handleMenuClick(4)}
                        >
                            <p className={selectedMenu === 4 ? activeMenuClass : menuClass}>
                                Funds
                            </p>
                        </Link>
                    </li>
                    <li>
                        <Link
                            style={{ textDecoration: "none" }}
                            to="/apps"
                            onClick={() => handleMenuClick(6)}
                        >
                            <p className={selectedMenu === 6 ? activeMenuClass : menuClass}>
                                Apps
                            </p>
                        </Link>
                    </li>
                </ul>
                <hr />
                <div className="profile" >


                    <div className="dropdown" style={{ width: "50%" }}>
                        <button className="profile-button d-flex mt-2 align-items-center" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                            <div className="avatar">ZU</div>
                            <p className="username mt-3 ">{user.email}</p>
                        </button>
                        <ul className="dropdown-menu mt-1 text-center"  >
                            <li><a class="dropdown-item" href="#">Profile  <AccountCircleRoundedIcon /></a></li>
                            <li><a class="dropdown-item" href="#">Settings <ManageAccountsIcon /></a></li>
                            <li><a className="dropdown-item" href="#" onClick={handleLogout}>Logout <LogoutIcon /></a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Menu;