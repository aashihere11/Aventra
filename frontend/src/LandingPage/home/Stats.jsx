import React from "react";

function Stats() {
    return (
        <div className="container p-3">
            <div className="row p-5">
                <div className="col-6 p-5">
                    <h1 className="fs-2 mb-5">Trust with confidence</h1>
                    <h2 className="fs-4">Customer-first always</h2>
                    <p className="text-muted">
                         Aventra is built for first-time investors who want to 
                        understand markets before risking real money.
                    </p>
                    <h2 className="fs-4">No spam or gimmicks</h2>
                    <p className="text-muted">
                      Clean, simple interface with no overwhelming charts or 
                        jargon. Just what you need to start your trading journey.
                    </p>
                    <h2 className="fs-4">The Aventra universe</h2>
                    <p className="text-muted">
                    Get started with virtual money, buy and sell real stocks, 
                        and track your portfolio — all without any financial risk.
                    </p>
                    <h2 className="fs-4">Do better with money</h2>
                    <p className="text-muted">
                       The best way to understand the stock market is to 
                        experience it. Aventra gives you that experience safely.
                    </p>
                </div>
                <div className="col-6 p-5">
                    <img src="media/ecosystem.png" style={{ width: "90%" }} />
                    <div className="text-center">
                        <a href="" className="mx-5" style={{ textDecoration: "none" }}>
                              Explore Aventra{" "}
                            <i class="fa fa-long-arrow-right" aria-hidden="true"></i>
                        </a>
                        <a href="" style={{ textDecoration: "none" }}>
                            Try Kite demo{" "}
                            <i class="fa fa-long-arrow-right" aria-hidden="true"></i>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Stats;