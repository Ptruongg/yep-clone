
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams, NavLink } from "react-router-dom";
import BusinessesList from "../Businesses/businessList";
import MapContainer from "../GoogleMaps";
import "./searchBusinesses.css"


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
