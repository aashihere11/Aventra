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

    const handleOpenBuyWindow = (uid , price) => {
        setIsBuyWindowOpen(true);
        setSelectedStockUID(uid);
        setSelectedStockPrice(price);
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
            {isBuyWindowOpen && <BuyActionWindow uid={selectedStockUID} price={selectedStockPrice} />}
        </GeneralContext.Provider>
    );
};

export default GeneralContext;