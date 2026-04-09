import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import GeneralContext from "./GeneralContext";
import axios from "axios";
import "../BuyActionWindow.css";


const BuyActionWindow = ({ uid, price, pc, type }) => {
    const generalContext = useContext(GeneralContext);
    const [inputQuantity, setInputQuantity] = useState(1);
    const [product, setProduct] = useState("CNC");
    const [availableQty, setAvailableQty] = useState(0);
    const [walletBalance, setWalletBalance] = useState();
    const totalprice = inputQuantity * Number(price);

    useEffect(() => {
        if (type !== "BUY") return;
        axios.get("http://localhost:3000/balance", { withCredentials: true })
            .then(res => setWalletBalance(res.data.balance));
    }, []);
  
    useEffect(() => {
        if (type !== "SELL") return;
        async function fetchData(params) {
            try {
                if (product == "CNC") {
                    const res = await axios.get(`http://localhost:3000/holding/${uid}/${product}`, { withCredentials: true });
                    setAvailableQty(res.data.qty || 0);

                } else {
                    const res = await axios.get(`http://localhost:3000/position/${uid}/${product}`, { withCredentials: true });
                    setAvailableQty(res.data.qty || 0);
                }

            } catch (err) { console.log(err) }
        }
        fetchData();

    }, [product, type, uid])


    const handleClickAction = async () => {
        generalContext.closeBuyWindow();
        try {
            await axios.post("http://localhost:3000/order/Order", {
                product: product,
                name: uid,
                qty: inputQuantity,
                price: totalprice,
                pc: pc,
                mode: type,

            }, { withCredentials: true });
        }
        catch (error) { console.log(error) }
    };

    const handleCancelClick = () => {
        generalContext.closeBuyWindow();
    };

    return (
        <div className="container" id="buy-window" draggable="true">
            <div className="regular-order">
                <div className="inputs">
                    <fieldset>
                        <legend>Qty.</legend>
                        <input
                            type="number"
                            name="qty"
                            id="qty"
                            min={1}
                            max={type === "SELL" ? availableQty : undefined}
                            onChange={(e) => setInputQuantity(Number(e.target.value))}
                            value={inputQuantity}
                        />
                    </fieldset>
                    <select name="product"
                        onChange={(e) => setProduct(e.target.value)}
                        value={product}>
                        <option value="CNC">CNC</option>
                        <option value="MIS">MIS</option>
                    </select>
                    <fieldset>
                        <legend>Price</legend>
                        <input
                            type="number"
                            name="price"
                            id="price"
                            value={parseFloat(totalprice)}
                            readOnly
                        />
                    </fieldset>
                </div>
            </div>

            <div className="buttons">
                <span>Margin required ₹140.65</span>
                <div>

                    <button className="buy-btn btns"
                        onClick={handleClickAction}
                        disabled={type === "SELL" && (inputQuantity <= 0 || inputQuantity > availableQty) ||
                            type === "BUY" && (totalprice > walletBalance)}>
                        {type == "BUY" ? "Buy" : "Sell"}
                    </button>

                    {type === "SELL" && (inputQuantity <= 0 || inputQuantity > availableQty) && <p style={{ color: "red", fontSize: "12px" }}>
                        not enough holdings
                    </p>}

                    {type === "BUY" && totalprice > walletBalance && (
                        <p style={{ color: "red", fontSize: "12px" }}>Insufficient balance!</p>
                    )}

                    <Link to="" className="cancel-btn btns" onClick={handleCancelClick}>
                        Cancel
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default BuyActionWindow;