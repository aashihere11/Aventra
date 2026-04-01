import React, { useState, useContext, useEffect } from "react";
import { DoughnutChart } from "./DoughnutChart";
import axios from "axios";
import WatchListItem from "./WatchListItem";


const WatchList = () => {
    const [watchlist, setWatchlist] = useState([]);
    const [search, setSearch] = useState("");
    const [favSymbols, setFavSymbols] = useState([]);

    useEffect(() => {
        const fetchFav = async() =>{
        try{
        const response = await axios.post("http://localhost:3000/stocks", {},{ withCredentials: true })
        console.log(response.data);
        setFavSymbols(response.data.map(f => f.Symbol));
            // Set watchlist to show favorite stocks
            setWatchlist(response.data); 
        }catch(error){
            console.log(error);
        } }
         fetchFav();
    }, []);
   

    const handleSearch = async () => {
        console.log(search);
        try {
            const response = await axios.get("http://localhost:3000/search",
                { params: { q: search }, withCredentials: true })
            setWatchlist(response.data);
            console.log(response.data);
        }
        catch (error) {
            console.log("Error fetching stock data", error);
        }
    };


    const data = {
        labels: watchlist.map((stock) => stock.symbol),
        datasets: [
            {
                label: "stock price",
                data: watchlist.map((stock) => stock.price),
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                ],

                borderWidth: 1,
            },
        ],
    };
    return (
        <div className="watchlist-container">
            <div className="search-container">
                <input
                    type="text"
                    name="search"
                    id="search"
                    placeholder="Search eg:infy, bse, nifty fut weekly, gold mcx"
                    className="search"
                    onChange={(e) => setSearch(e.target.value)}
                    value={search}
                    onKeyDown={(e) => { if (e.key === 'Enter') handleSearch(); }}
                />
                <button onClick={handleSearch}>search</button>
                {/* <span className="counts">{watchlist.length} /50</span> */}
            </div>

            <ul className="list"> {watchlist.map((stock, index) => {
                return <WatchListItem
                    stock={stock} key={index}
                    isFav={favSymbols.includes(stock.symbol)}
                    onFavChange={setFavSymbols}
                    favSymbols={favSymbols} />;
            })}</ul>
            <DoughnutChart data={data} />
        </div>
    );
};

export default WatchList;

