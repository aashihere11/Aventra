import React, { useState } from "react";
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import WatchListActions from "./WatchListActions";
const WatchListItem = ({ stock, isFav, onFavChange, favSymbols }) => {
    const [showWatchlistActions, setShowWatchlistActions] = useState(false);

    const handleMouseEnter = (e) => {
        setShowWatchlistActions(true);
    };

    const handleMouseLeave = (e) => {
        setShowWatchlistActions(false);
    };

    return (
        <li onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
            <div className="item">
                <p className={stock.price < stock.previousClose ? "down" : "up"}>{stock.symbol}</p>
                <div className="itemInfo">
                    <span className="percent">{stock.percentChange}</span>
                    {stock.price < stock.previousClose ? (
                        <KeyboardArrowDownIcon className="down" />
                    ) : (
                        <KeyboardArrowUpIcon className="up" />
                    )}
                    <span className="price">{stock.price}</span>
                    <span> {stock.lastUpdated}</span>
                </div>
            </div>
            {showWatchlistActions && <WatchListActions isFav={isFav}
                onFavChange={onFavChange}
                favSymbols={favSymbols}
                uid={stock.symbol}
                price={stock.currentprice}
                pc={stock.previousClose} />}
        </li>
    );
};

export default WatchListItem;
