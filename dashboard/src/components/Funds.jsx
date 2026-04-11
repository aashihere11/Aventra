import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import { useEffect } from "react";

const Funds = () => {
    const [amount, setAmount] = useState();
    const [transaction, setTransaction] = useState([]);
      const [walletBalance, setWalletBalance] = useState();

    useEffect(() => {
        axios.get("https://aventra-9a7b.onrender.com/transaction/transactions", { withCredentials: true })
            .then(response => { setTransaction(response.data) })
            .catch(error => console.log(error));

        axios.get("https://aventra-9a7b.onrender.com/balance", { withCredentials: true })
            .then(res => setWalletBalance(res.data.balance));
    }, []);

    const handlePayment = async () => {
        const { data: order } = await axios.post("https://aventra-9a7b.onrender.com/payment/create-order", { amount })

        const options = {
            key: order.keyId,
            amount: order.amount,
            currency: order.currency,
            name: "Trading App",
            description: "Add Funds",
            order_id: order.orderId,

            handler: (response) => {
                axios.post("https://aventra-9a7b.onrender.com/payment/verify-payment", {
                    razorpay_order_id: response.razorpay_order_id,
                    razorpay_payment_id: response.razorpay_payment_id,
                    razorpay_signature: response.razorpay_signature,
                    amount: amount
                }, { withCredentials: true })
            }
        }
        const rzp = new window.Razorpay(options);
        rzp.open();
    }
    return (
        <>
            <div className="row ">
                <div className="col d-flex text-center">
                    <div className=" ">
                        <h5>Available Balance</h5>
                        <p className="fw-bold fs-5">{walletBalance?.toFixed(2)}</p></div>
                    
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
                    {transaction.map((history) => {
                        return (

                            <div className=" txn-row d-flex  border rounded mb-2" >
                                <div className="rounded-circle fw-bold mt-2 mx-3 border text-center" style={{ width: "30px", height: "30px", color: history.type === "CREDIT" ? "green" : "red" }}>+</div>
                                <p className=" mt-2 flex-grow-1 ">{history.description}</p>
                                <p className=" mt-2 mx-5">{new Date(history.createdAt).toLocaleString()}</p>
                                <p className=" mt-2 fw-bold  flex-grow-1" style={{ color: history.type === "CREDIT" ? "green" : "red" }}>{history.type === "CREDIT" ? "+" : "-"}₹{history.amount.toFixed(2)}</p>




                            </div>
                        )
                    })}

                </div>
            </div>
        </>
    );
};

export default Funds;