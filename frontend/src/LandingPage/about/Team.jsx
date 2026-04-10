import React from "react";

function Team() {
  return (
    <div className="container">
      <div className="row p-3 mt-5 border-top">
        <h1 className="text-center ">People</h1>
      </div>

      <div
        className="row p-3 text-muted"
        style={{ lineHeight: "1.8", fontSize: "1.2em" }}
      >
        <div className="col-6 p-3 text-center">
          <img
            src="media/profile.jpeg"
            style={{ borderRadius: "100%", width: "60%" ,}}
          />
          <h4 className="mt-5">Aashi Meena</h4>
          <h6>Founder, CEO</h6>
        </div>
        <div className="col-6 p-3">
          <p>
            Aashi founded Aventra with a vision to make stock market investing
            simple and accessible for every beginner in India. Frustrated by
            the complexity of existing platforms, she built Aventra to bridge
            the gap between wanting to invest and actually knowing how.
          </p>
          <p>
            Aventra's simulated trading platform empowers first-time investors
            to practice, learn, and grow their confidence before putting real
            money at stake.
          </p>

          <p>
            Connect on <a href="">Homepage</a> / <a href="">TradingQnA</a> /{" "}
            <a href="">Twitter</a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Team;