import React, { useState, useEffect } from "react";
import axios from "axios";
// import { Card, Input } from "semantic-ui-react";
// import "./search.css";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllBusinesses } from "../../store/businesses";
export default function Search() {
    const dispatch = useDispatch();
    const businesses = useSelector((state) => Object.values(state?.businessReducer));
    const [APIData, setAPIData] = useState([]);
    const [filteredResults, setFilteredResults] = useState([]);
    const [searchInput, setSearchInput] = useState("");
    useEffect(() => {
        dispatch(getAllBusinesses())
        axios.get(`/api/businesses`).then((response) => {
            setAPIData(response.data);
        });
    }, [dispatch, JSON.stringify(APIData), JSON.stringify(businesses)]);

    const searchItems = (searchValue) => {
        setSearchInput(searchValue);
        console.log('yeeeeeeeeee', businesses)
        if (searchInput !== "") {
            const filteredData = businesses.filter((item) => {
                return Object.values(item)
                    .join("")
                    .toLowerCase()
                    .includes(searchInput.toLowerCase());
            });
            setFilteredResults(filteredData);
        } else {
            setFilteredResults(APIData);
        }
    };

    return (
        <div className="searchDiv">
            <div className="searchBar">
                <input
                    className="inputBox"
                    style={{ justifyContent: "center", alignContent: "center", borderColor: "gray", borderWidth: 1, width: "300px", height: "30px", marginTop: "15px" }}
                    icon="search"
                    placeholder="Search a Business..."
                    onChange={(e) => searchItems(e.target.value)}
                />
            </div>
            <div className="resultsSearch">
                {searchInput.length > 1 ? (
                    filteredResults.map((item) => {
                        return (
                            <div className="results" key={item.id}>
                                <NavLink to={`/business/${item.id}`}>
                                    <div className="listRes">
                                        <img className="search-img" src={item.imageUrl} onError={({ currentTarget }) => {
                                            currentTarget.onerror = null; // prevents looping
                                            currentTarget.src =
                                                "https://wellesleysocietyofartists.org/wp-content/uploads/2015/11/image-not-found.jpg";
                                        }}></img>
                                        <div className="resultInfo" style={{ alignItems: "center", justifyContent: "center" }}>{item.name}<div style={{ fontSize: "12px" }}>{item.address}</div></div>
                                        {/* <div className="resultInfo">{item.city}</div>
                                        <div className="resultInfo">{item.state}</div> */}
                                    </div>
                                </NavLink>
                            </div>
                        );
                    })
                ) : (
                    <div></div>
                )}
            </div>
        </div>
    );
}
