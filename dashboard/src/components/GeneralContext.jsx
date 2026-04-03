import React, { useState } from "react";

import BuyActionWindow from "./BuyActionWindow";

const GeneralContext = React.createContext({
    openBuyWindow: (uid) => { },
    closeBuyWindow: () => { },
});

export const GeneralContextProvider = (props) => {
    const [isBuyWindowOpen, setIsBuyWindowOpen] = useState(false);
    const [selectedStockUID, setSelectedStockUID] = useState("");
    const [selectedStockPrice, setSelectedStockPrice] = useState("");
    const [prevClose, setPrevClose] = useState("")
    const [orderType, setOrderType] = useState("");

    const handleOpenBuyWindow = (uid, price, pc, type) => {
        setIsBuyWindowOpen(true);
        setSelectedStockUID(uid);
        setSelectedStockPrice(price);
        setPrevClose(pc);
        setOrderType(type)
    };

    const handleCloseBuyWindow = () => {
        setIsBuyWindowOpen(false);
        setSelectedStockUID("");
    };

    return (
        <GeneralContext.Provider
            value={{
                openBuyWindow: handleOpenBuyWindow,
                closeBuyWindow: handleCloseBuyWindow,
            }}
        >
            {props.children}
            {isBuyWindowOpen && <BuyActionWindow uid={selectedStockUID} price={selectedStockPrice} pc={prevClose} type={orderType} />}
        </GeneralContext.Provider>
    );
};

export default GeneralContext;