import React, { useState, useEffect } from "react";
import axios from "axios";
// import { Card, Input } from "semantic-ui-react";
// import "./search.css";
import { NavLink } from "react-router-dom";
export default function Search() {
    const [APIData, setAPIData] = useState([]);
    const [filteredResults, setFilteredResults] = useState([]);
    const [searchInput, setSearchInput] = useState("");
    useEffect(() => {
        axios.get(`/api/business`).then((response) => {
            setAPIData(response.data);
        });
    }, []);
    //   console.log("aaaaaaaaaa", APIData)
    const searchItems = (searchValue) => {
        setSearchInput(searchValue);
        if (searchInput !== "") {
            const filteredData = APIData.businesses.filter((item) => {
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
                                        <div className="resultInfo">{item.name}</div>
                                        {/* <div className="resultInfo">{item.city}</div>
                                        <div className="resultInfo">{item.state}</div> */}
                                        <img className="search-img" src={item.imageUrl}></img>
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
