import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import GeneralContext from "./GeneralContext";
import axios from "axios";
import "../BuyActionWindow.css";

const BuyActionWindow = ({ uid, price, pc }) => {

    const generalContext = useContext(GeneralContext);
    const [stockQuantity, setStockQuantity] = useState(1);
    const totalprice = stockQuantity * price.toFixed(2);


    const handleBuyClick = async () => {
        try {
            await axios.post("http://localhost:3000/newOrder", {
                name: uid,
                qty: stockQuantity,
                price: totalprice,
                pc: pc,
                mode: "BUY",
            });
            generalContext.closeBuyWindow();
        }
        catch (err) {
            console.log(err);
        }
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
                            onChange={(e) => setStockQuantity(Number(e.target.value))}
                            value={stockQuantity}
                        />
                    </fieldset>
                    <fieldset>
                        <legend>Price</legend>
                        <input
                            type="number"
                            name="price"
                            id="price"
                            value={parseFloat(price)}
                        />
                    </fieldset>
                </div>
            </div>

            <div className="buttons">
                <span>Margin required ₹140.65</span>
                <div>
                    <Link className="buy-btn btns" onClick={handleBuyClick} >
                        Buy
                    </Link>
                    <Link to="" className="cancel-btn btns" onClick={handleCancelClick}>
                        Cancel
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default BuyActionWindow;