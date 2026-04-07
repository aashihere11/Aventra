import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';

const Funds = () => {
    const [amount, setAmount] = useState();
    const handlePayment = async () => {
        const { data: order } = await axios.post("http://localhost:3000/payment/create-order", { amount })

        const options = {
            key: order.keyId,
            amount: order.amount,
            currency: order.currency,
            name: "Trading App",
            description: "Add Funds",
            order_id: order.orderId,

            handler: (response) => {
                axios.post("http://localhost:3000/payment/verify-payment", {
                    razorpay_order_id: response.razorpay_order_id,
                    razorpay_payment_id: response.razorpay_payment_id,
                    razorpay_signature: response.razorpay_signature,
                })
            }
        }
        const rzp = new window.Razorpay(options);
        rzp.open();
    }
    return (
        <>



            <div className="row ">
                <div className="col d-flex justify-content-evenly">
                    <div className=" ">
                        <h5>Available Balance</h5>
                        <p>jdnjfw</p></div>
                    <div>
                        <h5>Available Balance</h5>
                        <p>jdnjfw</p></div>
                    <div>
                        <h5>Available Balance</h5>
                        <p>jdnjfw</p></div>
                </div>

                <div className="border ">
                    <p>ADD FUNDS</p>
                    <div className="d-flex mt-2 mb-2">
                        <input type="text"
                            min={100}
                            placeholder="Enter Amount"
                            className="form-control"
                            onChange={(e) => setAmount(e.target.value)}
                            value={amount}
                            style={{ height: "50%" }} />
                        <button className="pay-btn mx-2 fs-6" onClick={handlePayment}>Pay via Razorpay</button>
                    </div>

                </div>
                <div className="txn-history border text-center mt-5">
                    <p>TRANSACTION HISTORY</p>

                    <div className=" txn-row d-flex border rounded mb-2">
                        <div className="rounded-circle mt-2 mx-3 border text-center" style={{ width: "30px", height: "30px" }}>+</div>
                        <div> </div>
                        <p className=" mt-2 flex-grow-1">description</p>
                        <p className=" mt-2 flex-grow-1">date</p>
                        <div className="flex-grow-1"></div>
                        <div><p className="mx-5 mt-2">amount</p></div>
                        <div>

                        </div>


                    </div>
                </div>


            </div>
        </>
    );
};

export default Funds;