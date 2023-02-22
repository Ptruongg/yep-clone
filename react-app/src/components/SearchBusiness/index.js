// import React, { useState, useEffect } from "react";
// import axios from "axios";
// // import { Card, Input } from "semantic-ui-react";
// // import "./search.css";
// import { NavLink } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { getAllBusinesses } from "../../store/businesses";
// export default function Search() {
//     const dispatch = useDispatch();
//     const businesses = useSelector((state) => Object.values(state?.businessReducer));
//     const [APIData, setAPIData] = useState([]);
//     const [filteredResults, setFilteredResults] = useState([]);
//     const [searchInput, setSearchInput] = useState("");
//     useEffect(() => {
//         dispatch(getAllBusinesses())
//         axios.get(`/api/businesses`).then((response) => {
//             setAPIData(response.data);
//         });
//     }, [dispatch, JSON.stringify(APIData), JSON.stringify(businesses)]);

//     const searchItems = (searchValue) => {
//         setSearchInput(searchValue);
//         console.log('yeeeeeeeeee', businesses)
//         if (searchInput !== "") {
//             const filteredData = businesses.filter((item) => {
//                 return Object.values(item)
//                     .join("")
//                     .toLowerCase()
//                     .includes(searchInput.toLowerCase());
//             });
//             setFilteredResults(filteredData);
//         } else {
//             setFilteredResults(APIData);
//         }
//     };

//     return (
//         <div className="searchDiv">
//             <div className="searchBar">
//                 <input
//                     className="inputBox"
//                     style={{ justifyContent: "center", alignContent: "center", borderColor: "gray", borderWidth: 1, width: "300px", height: "30px", marginTop: "15px" }}
//                     icon="search"
//                     placeholder="Search a Business..."
//                     onChange={(e) => searchItems(e.target.value)}
//                 />
//             </div>
//             <div className="resultsSearch">
//                 {searchInput.length > 1 ? (
//                     filteredResults.map((item) => {
//                         return (
//                             <div className="results" key={item.id}>
//                                 <NavLink to={`/business/${item.id}`}>
//                                     <div className="listRes">
//                                         <img className="search-img" src={item.imageUrl} onError={({ currentTarget }) => {
//                                             currentTarget.onerror = null; // prevents looping
//                                             currentTarget.src =
//                                                 "https://wellesleysocietyofartists.org/wp-content/uploads/2015/11/image-not-found.jpg";
//                                         }}></img>
//                                         <div className="resultInfo" style={{ alignItems: "center", justifyContent: "center" }}>{item.name}<div style={{ fontSize: "12px" }}>{item.address}</div></div>
//                                         {/* <div className="resultInfo">{item.city}</div>
//                                         <div className="resultInfo">{item.state}</div> */}
//                                     </div>
//                                 </NavLink>
//                             </div>
//                         );
//                     })
//                 ) : (
//                     <div></div>
//                 )}
//             </div>
//         </div>
//     );
// }
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams, NavLink } from "react-router-dom";
import BusinessesList from "../Businesses/businessList";
import MapContainer from "../GoogleMaps";
import "./searchBusinesses.css"
// const SearchBusiness = () => {
//   const [query, setQuery] = useState('');
//   const [results, setResults] = useState([]);
//   const businesses = useSelector((state) => Object.values(state?.businessReducer));

//   const handleChange = (e) => {
//     setQuery(e.target.value);
//   }


//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     await fetch(`/api/search?q=${query}`)
//       .then((response) => response.json())
//       .then((data) => setResults(data))
//   }

//   return (
//     <div>
//       <form onSubmit={handleSubmit}>
//         <input type="text" value={query} onChange={handleChange} />
//         <button type="submit">Search</button>
//       </form>
//       <ul>
//         {results.map((result) => (
//           <li key={result.id}>{result.city}</li>
//         ))}
//       </ul>
//     </div>
//   );
// }


const SearchBusiness = () => {
  const { id } = useParams();
  const businesses = useSelector((state) => Object.values(state?.businessReducer));

  function returnArrayOfBusinesses(businessesObj) {
    const finalArray = [];
    for (let i = 0; i < businessesObj.length; i++) {
      const newString = `${businessesObj[
        i
      ].name.toLowerCase()}${businessesObj[
        i
      ].address.toLowerCase()}${businessesObj[
        i
      ].city.toLowerCase()}${businessesObj[
        i
      ].name.toLowerCase()}${businessesObj[i].zipcode.toLowerCase()}`;
      finalArray.push(newString);
    }
    return finalArray;
  }

  const arrayOfBusinessesSearch = returnArrayOfBusinesses(businesses);

  function findBusinesses(businessesArray) {
    const businessIndexes = [];
    for (let i = 0; i < businessesArray.length; i++) {
      const oneString = businessesArray[i];
      if (oneString.includes(id.toLowerCase())) {
        businessIndexes.push(i);
      }
    }
    return businessIndexes;
  }

  const businessIndexes = findBusinesses(arrayOfBusinessesSearch);

  function finalBusinessesArray(busIndex, businesses) {
    const finalArr = [];
    for (let i = 0; i < busIndex.length; i++) {
      const index = busIndex[i];
      finalArr.push(businesses[index]);
    }
    return finalArr;
  }

  const searchResults = finalBusinessesArray(businessIndexes, businesses);

  //   sort by highest rated businesses
  searchResults.sort(
    (a, b) => b.ratingSum / b.ratingLen - a.ratingSum / a.ratingLen
  );

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (searchResults.length) {
    return (
      <div className="search-results-container">
        <div className="search-title-container">
          <h1 className="business-search-title">
            {searchResults.length} Search Results Found For:{" "}
            <span className="search-parameter">{`"${id}"`}</span>
          </h1>
        </div>
        <div className="business-roll">
          {searchResults.map((bus) => (
            <NavLink to={`/business/${bus.id}`} key={bus.id}>
              <div className="busCard">
                <div className="businessDiv">
                  <div className="businessImage" style={{ fontFamily: "Times-new-roman" }}>
                    <img src={bus.imageUrl} className="bizphoto" onError={({ currentTarget }) => {
                      currentTarget.onerror = null; // prevents looping
                      currentTarget.src =
                        "https://wellesleysocietyofartists.org/wp-content/uploads/2015/11/image-not-found.jpg";
                    }}></img>
                  </div>
                  <div className="business-text">
                    <div className="name">
                      {bus.name}
                    </div>
                    <div className="address">
                      {bus.address}, {bus.city}, {bus.state}, {bus.zipcode}, {bus.country}
                      <img src={'https://icons.veryicon.com/png/o/miscellaneous/basic-linear-icon/address-101.png'} style={{ width: "1.3em", marginLeft: "1.1em" }} />
                    </div>
                    <div className="phone-number">
                      {bus.phoneNumber}
                      <img src={'https://static.vecteezy.com/system/resources/previews/003/720/498/original/phone-icon-telephone-icon-symbol-for-app-and-messenger-vector.jpg'} style={{ width: "1.3em", marginLeft: "1.1em" }} />
                    </div>
                  </div>
                </div>
              </div>
            </NavLink>
          ))}
        </div>
        {/* <div>
        <MapContainer />
        </div> */}
      </div>
    );
  }

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
};

export default SearchBusiness;
