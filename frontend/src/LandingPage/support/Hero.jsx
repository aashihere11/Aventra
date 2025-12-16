import React from 'react';
import { Link } from "react-router-dom"
import Collapse from './Collapse';
function Hero() {
  return (<>

    <div clasName="container border" style={{ width: "100%", backgroundColor: "lightgray", padding: "25px" }}>
      <h3 clasName="mx-2">Support Portal</h3>

      <input className="form-control" type="text" placeholder="search" style={{ width: "50%" }} />
    </div>

    <div className="container">
      <div className="row">
        <div className="col-8 mt-5 pt-3 ">
          <Collapse id="collapse1" title="Account Opening">
            <ul>
              <li ><Link to="" >Resident individual</Link></li>
              <li><Link to="">Minor</Link></li>
              <li><Link to="">Non Resident Indian (NRI)</Link></li>
              <li><Link to="">Company, Partnership, HUF and LLP</Link></li>
              <li><Link to="">Glossary</Link></li>
            </ul></Collapse>

          <Collapse id="collapse2" title="Your Aventra Account">
            <ul>
              <li><Link to="">Your Profile</Link></li>
              <li><Link to="">Account modification</Link></li>
              <li><Link to="">Client Master Report (CMR) and Depository Participant (DP) </Link></li>
              <li><Link to="">Nomination</Link></li>
              <li><Link to="">Transfer and conversion of securities</Link></li>
            </ul></Collapse>

          <Collapse id="collapse3" title="Kite">
            <ul>
              <li><Link to="">IPO</Link></li>
              <li><Link to="">Trading FAQs</Link></li>
              <li><Link to="">Margin Trading Facility (MTF) and Margins</Link></li>
              <li>< Link to="">Charts and orders</Link></li>
              <li><Link to="">Charts and orders</Link></li>
              <li><Link to="">Alerts and Nudges</Link></li>
              <li><Link to="">General</Link></li>
            </ul></Collapse>


          <Collapse id="collapse4" title="Funds">
            <ul>
              <li><Link to="">Add money</Link></li>
              <li><Link to="">Withdraw money</Link></li>
              <li><Link to="">Add bank accounts</Link></li>
              <li><Link to="">Company, Partnership, HUF and LLP</Link></li>
              <li><Link to="">eMandates</Link></li>
            </ul></Collapse>


          <Collapse id="collapse5" title="Console">
            <ul>
              <li><Link to="">Portfolio</Link></li>
              <li><Link to="">Corporate actions</Link></li>
              <li><Link to="">Funds statement</Link></li>
              <li><Link to="">Reports</Link></li>
              <li><Link to="">Profile</Link></li>
            </ul></Collapse>

          <Collapse id="collapse6" title="Coin">
            <ul>
              <li><Link to="">Mutual funds</Link></li>
              <li><Link to="">National Pension Scheme (NPS)</Link></li>
              <li><Link to="">Features on Coin</Link></li>
              <li><Link to="">Payments and Orders</Link></li>
              <li><Link to="">General</Link></li>
            </ul></Collapse>



        </div>

        <div className="col-3 mt-5 mx-4">
          <div className="information mt-5 pt-3">

            <ol class="list-group">
              <li class="list-group-item">Quick links</li>
              <li class="list-group-item"><a href="">1. Track account opening</a></li>
              <li class="list-group-item"><a href="">2. Track segment activation</a></li>
              <li class="list-group-item"><a href="">3. Intraday margins</a></li>
              <li class="list-group-item"><a href="">4. Kite user manual</a></li>
              <li class="list-group-item"><a href="">5. Learn how to create a ticket</a></li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  </>);
}

export default Hero;