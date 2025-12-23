import React, { useState } from "react";
import { Link } from "react-router-dom";
import GeneralContext from "./GeneralContext";
import "../BuyActionWindow.css";

const BuyActionWindow = ({ uid }) => {



    const handleCancelClick = () => {
        GeneralContext.closeBuyWindow();
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

                        />
                    </fieldset>
                    <fieldset>
                        <legend>Price</legend>
                        <input
                            type="number"
                            name="price"
                            id="price"
                            step="0.05"

                        />
                    </fieldset>
                </div>
            </div>

            <div className="buttons">
                <span>Margin required ₹140.65</span>
                <div>
                    <Link className="buy-btn btns" >
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