import React from "react";

function Hero() {
    return (
        <div className="container">
            <div className="row p-5 mt-5 mb-5">
                <h1 className="fs-2 text-center">
                    We pioneered the discount broking model in India
                    <br />
                    Now, we are breaking ground with our technology.
                </h1>
            </div>

            <div
                className="row p-5 mt-5 border-top text-muted"
                style={{ lineHeight: "1.8", fontSize: "1.2em" }}
            >
                <div className="col-6 p-5">
                    <p>
                        Aventra was built with a simple mission — to make stock market
                        investing accessible to every Indian, regardless of their
                        background or experience.
                    </p>
                    <p>
                        We provide a clean, beginner-friendly platform where anyone can
                        learn to trade, track their portfolio, and grow their wealth
                        without the complexity of traditional brokers.
                    </p>
                    <p>
                        Whether you are a first-time investor or an active trader,
                        Aventra gives you the tools to make smarter financial decisions
                        every day.
                    </p>
                </div>
                <div className="col-6 p-5">
                    <p>
                        Our simulated trading environment lets beginners practice with
                        virtual funds — so you can learn how real markets work before
                        investing a single rupee.
                    </p>
                    <p>
                        <a href="" style={{ textDecoration: "none" }}>
                            Rainmatter
                        </a>
                        We believe financial literacy is a right, not a privilege.
                        That's why Aventra is designed to educate and empower —
                        not just execute trades.
                    </p>
                    <p>
                        We are constantly improving. Follow our journey and be part of
                        a growing community of smart, informed investors across India.
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Hero;