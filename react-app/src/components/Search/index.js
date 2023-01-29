import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useParams, useHistory } from "react-router-dom";
import BusinessesList from "../Businesses/businessList";
import searchReducer from "../../store/search";
import "./search.css"

const SearchBusiness = () => {
    const { id } = useParams();
    const history = useHistory();
    const businesses = useSelector(state => Object.values(state?.business))



    return (
        <div className="search-results-container">
            <div className="no-search-title-container">
                <h1 className="no-business-search-title">
                    0 Search Results For:{" "}
                    <span className="no-search-parameter">{`"${id}"`}</span>
                </h1>
            </div>
        </div>
    );

}

export default SearchBusiness
