import React from "react";
import { useAuth } from "../../context/AuthContext";
import { Link } from "react-router-dom";
function Hero() {
    const { user } = useAuth();
    return (
        <div>
            {!user ? (
                <div className="container p-5 mb-5">
                    <div className="row text-center">
                        <img
                            src="media/homeHero.png"
                            alt="Hero Image"
                            className="mb-5"
                        />
                        <h1 className="mt-5">Invest in everything</h1>
                        <p>
                            Online platform to invest in stocks, derivatives, mutual funds, and
                            more
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

export default Hero;