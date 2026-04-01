import React, { useContext } from "react";
import GeneralContext from "./GeneralContext";
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import BarChartIcon from '@mui/icons-material/BarChart';
import Checkbox from '@mui/material/Checkbox';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Favorite from '@mui/icons-material/Favorite';
import Tooltip from '@mui/material/Tooltip';
import Fade from '@mui/material/Fade';
import axios from "axios";

const WatchListActions = ({ isFav, onFavChange, favSymbols, uid, price, pc }) => {

    const addtoFavorites = async (e) => {
        try {
            const response = await axios.post("http://localhost:3000/favorites",
                { symbol: uid }, { withCredentials: true });
            isFav = response.data.isFav;
            response.data.isFav ? onFavChange([...favSymbols, uid]) : onFavChange(favSymbols.filter(f => f !== uid));

        }
        catch (error) {
            console.log(error);
        }
    };

    const generalContext = useContext(GeneralContext);

    const handleBuyClick = () => {
        generalContext.openBuyWindow(uid, price, pc);
    }
    return (
        <span className="actions">
            <span>
                <Tooltip
                    title="Buy (B)"
                    placement="top"
                    arrow
                    TransitionComponent={Fade}
                    onClick={handleBuyClick}
                >
                    <button className="buy">Buy</button>
                </Tooltip>
                <Tooltip
                    title="Sell (S)"
                    placement="top"
                    arrow
                    TransitionComponent={Fade}
                    onClick={handleBuyClick}
                >
                    <button className="sell">Sell</button>
                </Tooltip>
                <Tooltip
                    title="Analytics (A)"
                    placement="top"
                    arrow
                    TransitionComponent={Fade}
                >
                    <button className="action">
                        <BarChartIcon className="icon" />
                    </button>
                </Tooltip>
                <Tooltip title="More" placement="top" arrow TransitionComponent={Fade}>
                    <button className="action">
                        <MoreHorizIcon className="icon" />
                    </button>
                </Tooltip>

                <Tooltip title="favorites" placement="top" arrow TransitionComponent={Fade}>
                    <Checkbox
                        icon={<FavoriteBorder />}
                        checkedIcon={<Favorite />}
                        checked={isFav}          // ✅ controlled
                        onChange={(e) => addtoFavorites(e)}  // ✅ add/remove
                    />

                </Tooltip>
            </span>
        </span>
    )
};

export default WatchListActions;