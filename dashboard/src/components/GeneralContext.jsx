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
    const [prevClose , setPrevClose] = useState("")

    const handleOpenBuyWindow = (uid , price, pc) => {
        setIsBuyWindowOpen(true);
        setSelectedStockUID(uid);
        setSelectedStockPrice(price);
        setPrevclose(pc);
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
            {isBuyWindowOpen && <BuyActionWindow uid={selectedStockUID} price={selectedStockPrice} pc={prevClose} />}
        </GeneralContext.Provider>
    );
};

export default GeneralContext;