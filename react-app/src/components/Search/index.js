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
        <div>
            <div>
                <input
                    style={{ height: 20, borderColor: "gray", borderWidth: 1 }}
                    icon="search"
                    placeholder="Search by City..."
                    onChange={(e) => searchItems(e.target.value)}
                />
            </div>
            <div>
                {searchInput.length > 1 ? (
                    filteredResults.map((item) => {
                        return (
                            <div className="results" key={item.id}>
                                <NavLink to={`/business/${item.id}`}>
                                    <div>{item.city}</div>
                                    <div>{item.name}</div>
                                    <img className="search-img" src={item.imageUrl}></img>
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
