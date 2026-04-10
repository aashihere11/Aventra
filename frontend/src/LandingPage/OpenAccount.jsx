import React from "react";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";
function OpenAccount() {

    const { user } = useAuth();

    return (
        <div>
            {!user ? (
                <div className="container p-5 mb-5">
                    <div className="row text-center">
                        <h1 className="mt-5">Open a Aventra account</h1>
                        <p>
                            Modern platforms and apps, ₹0 investments, and flat ₹20 intraday and
                            F&O trades.
                        </p>
                        <button
                            className="p-2 button fs-5 mb-5"
                            style={{ width: "20%", margin: "0 auto" }}
                            >
                           <Link to="/signup" class="nav-link active" >
                                    signup 
                                </Link >
                        </button>
                    </div>
                </div>) : null}
        </div>
    );
}

export default OpenAccount;